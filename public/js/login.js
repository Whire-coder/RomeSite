function getNameWithToken() {

    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then(result => result.json())
    .then(response => {
        const { username, discriminator } = response;
        console.log(response)
    
        if(!username || !discriminator) {
            localStorage.removeItem("token");
            return;
        };
    
        const nameAndTag = `${username}#${discriminator}`;
        const loginLi = document.getElementById('login');
    
        loginLi.innerText = nameAndTag;
        loginLi.removeAttribute("href");
    })
    .catch(error => {
        localStorage.removeItem("token");
        return;
    });
};
    
window.onload = () => {
    
    if(localStorage.getItem("token")) {
        const nameAndTag = getNameWithToken();
        const loginLi = document.getElementById('login');
    
        loginLi.innerText = nameAndTag;
        loginLi.removeAttribute("href");
    } else {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const token = fragment.get("access_token");
    
        if(!token) return;
    
        localStorage.setItem("token", token);
        getNameWithToken
    }
};