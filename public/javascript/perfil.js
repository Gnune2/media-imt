document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 1. Carrega dados do perfil do usuário
        const resUser = await window.fetchProtected(`${API_BASE_URL}/perfil`);
        const user = await resUser.json();
        
        document.getElementById('perfil-nome').textContent = user.name;
        document.getElementById('perfil-email').textContent = user.email;

        // 2. Carrega matérias para gerar estatísticas
        const resMaterias = await window.fetchProtected(`${API_BASE_URL}/materia`);
        const materias = await resMaterias.json();

        const total = materias.length;
        // Consideramos concluída se a média atual >= meta
        const concluidas = materias.filter(m => {
            const media = m.assessments.reduce((acc, av) => acc + (av.grade * av.weight), 0);
            return media >= m.passGrade;
        }).length;

        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-concluidas').textContent = concluidas;

    } catch (err) {
        console.error("Erro ao carregar perfil:", err);
    }
});

// Botão de Logout
document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/public/pages/login.html';
});