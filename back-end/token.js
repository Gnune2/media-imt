//manda token para header da rota

window.fetchProtected = async function (url, options = {}) {
    //recebe token do local storage
    const token = localStorage.getItem("authToken");
    //verifica se token existe no local storage
    if(!token){
        //se nao existe manda direto para o login
        console.error('Usuário não autenticado. Redirecionando...');
        window.location.href = '/front-end/html/login.html';
        throw new error('Usuário não autenticado.')
    }
    //se existe manda para o header
    options.headers = options.headers || {};
    options.headers["Authorization"] = `Bearer ${token}`;
    if (options.body && !options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json';
    }
    return fetch(url, options);
}