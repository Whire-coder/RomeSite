function getNameWithToken() {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then(result => result.json())
        .then(response => {
            const { username, discriminator } = response;
            const loginLi = document.getElementById('login');

            loginLi.innerText = `${username}#${discriminator}`;
            loginLi.removeAttribute("href");
        })
        .catch(console.error);
}

window.onload = () => {

    if(localStorage.getItem("token")) getNameWithToken()
    else {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const token = new URLSearchParams(window.location.hash.slice(1)).get("access_token");

        if(!token) return;

        localStorage.setItem("token", token);
        getNameWithToken()
    }
};