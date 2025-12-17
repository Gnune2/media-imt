window.fetchProtected = async function (url, options = {}) {
    // ATENÇÃO: Confirme se no login você salvou como "authToken" ou "token"
    const token = localStorage.getItem("authToken"); // Mudei para "token" para bater com o exemplo anterior
    
    if (!token) {
        console.error("Token não encontrado.");
        // Opcional: Redirecionar para login automaticamente
        window.location.href = "/public/pages/login.html"; 
        throw new Error('Usuário não autenticado.'); // "Error" com E maiúsculo
    }

    // Inicializa headers se não existirem
    options.headers = options.headers || {};
    
    // Injeta o Token
    options.headers["Authorization"] = `Bearer ${token}`;
    
    // Se tiver corpo (body) e não tiver Content-Type, define como JSON
    if (options.body && !options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json';
    }

    // Faz a chamada real
    const response = await fetch(url, options);

    // Bônus: Se o token venceu (401 ou 403), desloga o usuário
    if (response.status === 401 || response.status === 403) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("token");
        window.location.href = "/public/pages/login.html";
        throw new Error("Sessão expirada");
    }

    return response;
}

// Função de Logout
function realizarLogout() {
    // 1. Remove o token do armazenamento
    // ATENÇÃO: Use o mesmo nome que você usou no login ("token" ou "authToken")
    localStorage.removeItem("token"); 
    localStorage.removeItem("authToken"); // Por garantia, remove os dois nomes possíveis

    // 2. Redireciona para a página de login
    window.location.href = "/public/pages/login.html"; // Ajuste o caminho se necessário
}

// Adiciona o evento de clique ao botão quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.getElementById('btn-logout');
    
    if (btnLogout) {
        btnLogout.addEventListener('click', realizarLogout);
    }
});