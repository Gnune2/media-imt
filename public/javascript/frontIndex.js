//url da página login
const LOGIN_PAGE_URL = '/front-end/html/login.html';
// bloqueia acesso ao index se o usuário não tiver logado
// Esta função é executada assim que a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        window.location.href = LOGIN_PAGE_URL;
        return;
    }
})