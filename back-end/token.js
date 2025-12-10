//manda token para header da rota
window.fetchProtected = async function (url, options = {}) {
    const token = localStorage.getItem("authToken");
    if(!token){
        console.error('Usuário não autenticado. Redirecionando...');
        window.location.href = '/front-end/html/login.html';
        throw new error('Usuário não autenticado.')
    }
    options.headers = options.headers || {};
    options.headers["Authorization"] = `Bearer ${token}`;
    if (options.body && !options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json';
    }
    return fetch(url, options);
}