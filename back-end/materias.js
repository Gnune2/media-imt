const materias = [
    {
        id: 1,
        nome: "Matemática Discreta",
        Imagem:"Matemática Discreta",
    },
    {
        id: 2,
        nome: "Estatística",
        Imagem:"Matemática Discreta",
    },
    {
        id: 3,
        nome: "Desenvolvimento Front-End",
        Imagem:"Matemática Discreta",
    },
    {
        id: 4,
        nome: "UX",
        Imagem:"Matemática Discreta",
    },
    {
        id: 5,
        nome:  "Legislação e Ética",
        Imagem:"Matemática Discreta",
    }
];

function divMaterias(materias){
    const div = document.getElementById('main-index');
    for(let i = 0; i < materias.length; i++) {
        const materia = materias[i];
        const divMateria = document.createElement("div");
        divMateria.id = `materia-${materia}`;
        divMateria.className = `estilo-${materia}`;
        divMateria.textContent = `${materia}`;
        if (div) {
            div.appendChild(divMateria);
            console.log("A div foi anexada com sucesso!");
        }
    }
}

divMaterias(materias);
