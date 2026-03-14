//varre o forms pegando os dados e envia para o servidor para logar
const BACKEND_URL = `${API_BASE_URL}/login`;
//espera o html carregar para excutar o código seguinte
document.addEventListener("DOMContentLoaded", () => {
    //pega o formulário e atribui a uma variavel
    const loginForm = document.getElementById("login-form");
    //função assincrona (envia dados para o servidor) que executa quando o botão submit é clicado
    loginForm.addEventListener("submit", async(event) => {
        //desabilita a função padrão dos botões submit que faz a página recarregar
        event.preventDefault();
        // função FormData que varre os dados do formulário
        const formData = new FormData(loginForm);
        //array que guarda os dados necassários da variavel que armazenou os dados puxados pelo FormData
        const studentData = {
            email: formData.get("email"),
            password: formData.get("senha")
        }
        //variavel amarzena o botão submit
        const submitButton = loginForm.querySelector("button[type='submit']");
        //feedback para o usúario
        submitButton.textContent = "A processar...";
        //desabilita botao enquanto servidor processa as informações para para evitar bugs 
        submitButton.disabled = true;
        //envia dados para servidor
    try {
        //requisição dos dados na porta localhost:3000/login
        const response = await fetch(BACKEND_URL,{
            //especifica o metodo usando na porta pq o padrão é get
            method:"POST",
            //explica que o tipo vai ser o json
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(studentData),// tranforma o array e json e envia no body
        });
        // recebe a reposta do servidor e armazena numa variavel
        const result = await response.json()
        if (response.ok){
            //guarda token no local storage do navegador
            if(result.token) {
                localStorage.setItem("authToken", result.token);
                console.log("Token de Autenticação Salvo");
            }
            //mostra a reposta para o cliente pelo front
            //sim eu coloquei o emoji pra ficar mais legal
            alert('✅' + result.message)
            // Redireciona para a página index
            window.location.href = '/index.html';
        }else{
            alert('❌ Erro no Login: ' + (result.error || 'Ocorreu um erro desconhecido.'));
        }
        } catch (error) {
            // erro na conexao
            console.error('Erro de conexão ou requisição:', error);
            alert(`🚨 Falha ao conectar ao servidor. Verifique se o backend está a correr (${API_BASE_URL}/login).` );
        } finally {
            //Restaura o Botão, independentemente do sucesso ou falha
            submitButton.textContent = 'Login';
            submitButton.disabled = false;
        }
    })
})