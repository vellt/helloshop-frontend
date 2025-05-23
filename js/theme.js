const html=document.getElementById("html")

window.addEventListener('DOMContentLoaded', ()=>{
   loadTheme();
})

window.addEventListener('visibilitychange', ()=>{
    loadTheme();
})

const themeControlInit = ()=>{
    const changeTheme = document.getElementById("changeTheme");
    const icon = changeTheme.querySelector('i');
    changeTheme?.addEventListener('click', () => {
        loadTheme()
        if(html.getAttribute('data-bs-theme')==="light"){
            icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        }else{
            icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        }
    });
};

function loadTheme(){
    const theme=getCookie("theme")??html.getAttribute('data-bs-theme');
    const newTheme=theme === 'light'?'dark':'light';
    html.setAttribute('data-bs-theme', newTheme);
    setCookie("theme",newTheme,7);
}

function getCookie(key) {
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${key}=`));
    return cookie ? cookie.split("=")[1] : null;
}

function setCookie(name, value, days) {
    const date = new Date(); 
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}