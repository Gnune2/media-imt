const p1_nota = document.getElementById("p1");
const p2_nota  = document.getElementById("p2");
const t1_nota  = document.getElementById("t1");
const t2_nota  = document.getElementById("t2");
const resultadoDisplay = document.getElementById("resultadoDisplay");

function enviarNotas() {
    let p1 = parseFloat(p1_nota.value) || 0;
    let p2 = parseFloat(p2_nota.value) || 0;
    let t1 = parseFloat(t1_nota.value) || 0;
    let t2 = parseFloat(t2_nota.value) || 0;
 
    let notaFinal = 0.6 * ((p1 + p2)/2) + 0.4 * ((t1+t2)/2);

    let situacao = "";

    if (notaFinal >= 6) {
        situacao = "Aprovado! 🚀";
        resultadoDisplay.classList.add("text-success");
        resultadoDisplay.classList.remove("text-danger");
    } else {
        situacao = "Reprovado 😢";
        resultadoDisplay.classList.add("text-danger");
    }

    let mensagem = `Nota Final: ${notaFinal.toFixed(1)} - Situação: ${situacao}`

    resultadoDisplay.textContent = mensagem;
}

botaoEnviar.addEventListener("click", enviarNotas);