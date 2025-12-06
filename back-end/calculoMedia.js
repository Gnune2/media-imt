// --- LÓGICA DE CÁLCULO E ENVIO ---

const resultadoDisplay = document.getElementById("resultadoDisplay");

async function enviarNotas() {
    // 1. Captura os inputs (buscamos aqui dentro para garantir que já existem)
    const p1_nota = document.getElementById("p1");
    const p2_nota = document.getElementById("p2");
    const t1_nota = document.getElementById("t1");
    const t2_nota = document.getElementById("t2");

    // Se os inputs ainda não existirem na tela, paramos.
    if (!p1_nota || !p2_nota) return;

    let p1 = parseFloat(p1_nota.value) || 0;
    let p2 = parseFloat(p2_nota.value) || 0;
    let t1 = parseFloat(t1_nota.value) || 0;
    let t2 = parseFloat(t2_nota.value) || 0;
 
    // 2. Cálculo da Média
    let notaFinal = 0.6 * ((p1 + p2)/2) + 0.4 * ((t1+t2)/2);

    // 3. Mostra na Tela
    let situacao = "";
    // O resultadoDisplay pode não existir ainda se inputs.js não rodou.
    // Vamos tentar pegar o elemento novamente caso a variável global esteja vazia.
    const display = document.getElementById("resultadoDisplay");
    
    if (notaFinal >= 6) {
        situacao = "Aprovado! 🚀";
        if(display) {
            display.classList.add("text-success");
            display.classList.remove("text-danger");
        }
    } else {
        situacao = "Reprovado 😢";
        if(display) {
            display.classList.add("text-danger");
        }
    }

    if(display) {
        display.textContent = `Nota Final: ${notaFinal.toFixed(1)} - Situação: ${situacao}`;
    }

    // --- 4. ENVIAR PARA O BANCO DE DADOS (BACKEND) ---
    
    // Recupera o Token que guardamos no Login
    const token = localStorage.getItem('userToken');
    // Recupera o nome da matéria (ou usa um padrão)
    const materia = localStorage.getItem("materiaEscolhida") || "Materia Geral";

    if (!token) {
        alert("Atenção: Você não está logado. A nota foi calculada, mas não foi salva no banco.");
        return;
    }

    try {
        const resposta = await fetch('http://localhost:3000/notas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Aqui enviamos o Token no cabeçalho Authorization
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
                disciplina: materia,
                mediaFinal: notaFinal
            })
        });

        if (resposta.ok) {
            alert(`Sucesso! A média de ${materia} foi salva no banco de dados.`);
        } else {
            // Se o token expirou (erro 401 ou 403)
            if (resposta.status === 401 || resposta.status === 403) {
                alert("Sua sessão expirou. Faça login novamente.");
                window.location.href = "login.html";
            } else {
                const erro = await resposta.json();
                alert("Erro ao salvar: " + erro.erro);
            }
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão com o servidor.");
    }
}

// --- CONFIGURAÇÃO DO BOTÃO ---
// Como o botão #botaoEnviar é criado pelo inputs.js, ele pode não existir 
// quando este arquivo carrega. Usamos "Event Delegation" no documento para garantir.

document.addEventListener('click', function(e) {
    if(e.target && e.target.id === 'botaoEnviar') {
        enviarNotas();
    }
});