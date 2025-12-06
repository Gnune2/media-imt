// --- PARTE 1: CRIAÇÃO VISUAL (DOM) ---
// (O teu código original de criação da interface)

//adiciona nome para a página dependendo da escolha do usuário (login/cadastro)
const main = document.getElementById("main");
const h1 = document.createElement("h1");
main.appendChild(h1);
h1.textContent = "Login";
h1.id = "tituloLoginCadastro";

//adiciona div container
const divContainer = document.createElement("div")
main.appendChild(divContainer);
divContainer.className = "container col-12 mt-5 d-flex justify-content-center";
divContainer.id = "container";

//adiciona form
const container = document.getElementById("container");
const divForm = document.createElement("form");
container.appendChild(divForm);
divForm.className = "login form-floating col-8 col-sm-7 col-md-4 col-xl-3 p-4";

//puxa o form do documento html
const form = document.querySelector("form");

//array para diferenciar se é senha o email
emailsenha = ["email", "senha"]
for (const i of emailsenha){
    //adiciona divs para inputs de login
    const divInput = document.createElement("div");
    form.appendChild(divInput);
    //nomeia classe e id para as divs dos inputs email e senha
    divInput.id = `div${i}`;
    //adiciona Label para email e senha
    const email = document.getElementById(`div${i}`);
    const label = document.createElement("label");
    email.appendChild(label);
    label.setAttribute("for",`${i}`);
    label.className = "form-label text-capitalize";
    label.textContent = `${i}:`;
    //adiciona input para email e senha
    const input = document.createElement("input");
    email.appendChild(input);
    if (i === "senha"){
        input.type = "password";
    }else{
        input.type = `${i}`;
    }
    input.className = "form-control m-auto";
    input.id = `${i}`;
    input.placeholder = `Seu ${i}`;
    if (i === "email") {
        input.setAttribute("autocomplete","email");
        divInput.className = "mb-3";
    }else{
        input.setAttribute("autocomplete","current-password");
        divInput.className = "mb-4";
    }
}

//adiciona botão de login
const buttonLogin = document.createElement("button");
form.appendChild(buttonLogin);
buttonLogin.type = "button";
buttonLogin.className = "btn btn-primary";
buttonLogin.id = "botaoLogin";
buttonLogin.textContent = "Login";

//adiciona link para cadastro
const linkCadastro = document.createElement("a");
form.appendChild(linkCadastro);
linkCadastro.href = "cadastro.html";
linkCadastro.id = "linkCadastro";
linkCadastro.className = "col-12 d-block text-center mt-3 link-secondary";
linkCadastro.textContent = "Cadastrar-se";

// --- PARTE 2: LÓGICA DE CONEXÃO (BACKEND) ---

const botaoLogin = document.getElementById("botaoLogin");

async function login(event) {
    if(event) event.preventDefault(); // Evita recarregar a página

    // Pega os valores digitados
    const emailInput = document.getElementById("email").value;
    const senhaInput = document.getElementById("senha").value;

    if (!emailInput || !senhaInput) {
        alert("Por favor, preencha email e senha.");
        return;
    }

    try {
        // Envia para o servidor (igual fizemos no Thunder Client)
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput,
                senha: senhaInput
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            // SUCESSO!
            // Guardamos o token no navegador para usar depois
            localStorage.setItem('userToken', dados.token);
            
            alert("Login realizado com sucesso!");
            // Redireciona para a página de cálculo
            // (Verifique se o caminho do seu arquivo HTML está correto aqui)
            window.location.href = "calculoMedia.html"; 
        } else {
            // ERRO (Ex: Senha errada)
            alert("Erro: " + (dados.erro || "Falha ao fazer login"));
        }

    } catch (erro) {
        console.error(erro);
        alert("O servidor parece estar desligado. Verifique o terminal.");
    }
};

botaoLogin.addEventListener("click", login);