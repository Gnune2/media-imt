const botoesLinks = document.querySelectorAll(".btno")
//verifica qual matéria foi escolhida
botoesLinks.forEach(botao => {
    botao.addEventListener("click", function(event){
        const botaoClicado = event.currentTarget.title;
        localStorage.setItem("materiaEscolhida", botaoClicado);
    })
})