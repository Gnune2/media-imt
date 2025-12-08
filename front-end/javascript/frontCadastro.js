const main = document.getElementById("main");
const h1 = document.createElement("h1");
main.appendChild(h1);
h1.textContent = "Cadastro";
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
emailsenha = ["nome","email", "senha","confirmar senha"]
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
    input.className = "form-control m-auto";
    input.type = `${i}`;
    input.id = `${i}`;
    input.placeholder = `${i}`;
    if(i === "confirmar senha" || i === "senha"){
        input.type = "password";
        label.setAttribute("for","confirmarSenha");
        input.id = "confirmarSenha";
        input.type = "password";
    }
    if (i === "email") {
        input.setAttribute("autocomplete","email");
        divInput.className = "mb-3";
    }else{
        input.setAttribute("autocomplete","current-password");
        divInput.className = "mb-4";
    }
    
}
//adiciona botao para cadastro
    const buttonCadastro = document.createElement("button");
    form.appendChild(buttonCadastro);
    buttonCadastro.id = "botaoCadastro";
    buttonCadastro.className = "btn btn-primary";
    buttonCadastro.textContent = "Cadastrar-se";

//adiciona link para login
    const linkLogin = document.createElement("a");
    form.appendChild(linkLogin);
    linkLogin.href = "login.html";
    linkLogin.className = "col-12 d-block text-center mt-3 link-secondary";
    linkLogin.id = "linkLogin";
    linkLogin.textContent = "Login";

// varre os dados inseridos pelo estudante e manda para o servidor
