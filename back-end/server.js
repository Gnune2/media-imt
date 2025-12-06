// back-end/server.js

// 1. Importações Essenciais
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 2. Inicialização
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
// CHAVE SECRETA: MUDE ISTO para uma string longa e segura!
const JWT_SECRET = 'sua_chave_secreta_e_forte'; 

// 3. Middlewares Globais
// Permite que o servidor leia JSON enviado nos pedidos (necessário para POST)
app.use(express.json());

// **MIDDLEWARE CORS**: Permite que o seu frontend (que corre no navegador) comunique com este servidor.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite qualquer origem (para desenvolvimento)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// --- MIDDLEWARE DE AUTENTICAÇÃO ---
// Esta função verifica se o token JWT no cabeçalho 'Authorization' é válido
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ erro: 'Token não fornecido ou formato inválido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Adiciona as informações do aluno (id e email) ao objeto de pedido (req)
        req.aluno = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
};

// --- ROTAS DA API ---

// Rota de Teste
app.get('/', (req, res) => {
    res.status(200).send('Servidor de notas da Faculdade online!');
});

// ROTA DE CADASTRO (POST /cadastro)
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }
    try {
        const alunoExistente = await prisma.aluno.findUnique({ where: { email } });
        if (alunoExistente) {
            return res.status(409).json({ erro: 'Este email já está registado.' });
        }
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        
        const novoAluno = await prisma.aluno.create({
            data: { nome, email, senha: senhaHash },
            select: { id: true, nome: true, email: true }
        });

        res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!', aluno: novoAluno });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ erro: 'Erro interno no servidor ao tentar cadastrar.' });
    }
});


// ROTA DE LOGIN (POST /login)
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }
    try {
        const aluno = await prisma.aluno.findUnique({ where: { email } });
        if (!aluno) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }
        const senhaValida = await bcrypt.compare(senha, aluno.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }
        const token = jwt.sign(
            { alunoId: aluno.id, email: aluno.email },
            JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token: token,
            aluno: { id: aluno.id, nome: aluno.nome, email: aluno.email }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ erro: 'Erro interno no servidor ao tentar fazer login.' });
    }
});


// ROTA PARA SALVAR NOTAS (PROTEGIDA COM TOKEN) (POST /notas)
app.post('/notas', verificarToken, async (req, res) => {
    const alunoId = req.aluno.alunoId; 
    const { disciplina, mediaFinal } = req.body;

    if (!disciplina || mediaFinal === undefined || mediaFinal === null) {
        return res.status(400).json({ erro: 'Os campos "disciplina" e "mediaFinal" são obrigatórios.' });
    }
    const mediaNumerica = parseFloat(mediaFinal);
    if (isNaN(mediaNumerica)) {
        return res.status(400).json({ erro: 'A "mediaFinal" deve ser um número válido.' });
    }

    try {
        const novaNota = await prisma.nota.create({
            data: {
                disciplina,
                mediaFinal: mediaNumerica,
                aluno: { connect: { id: alunoId } }
            },
        });

        res.status(201).json({ mensagem: `Nota de ${disciplina} guardada com sucesso!`, nota: novaNota });
    } catch (error) {
        console.error('Erro ao salvar a nota:', error);
        res.status(500).json({ erro: 'Erro interno no servidor ao tentar salvar a nota.' });
    }
});


// 4. Iniciar Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend a correr em http://localhost:${PORT}`);
});