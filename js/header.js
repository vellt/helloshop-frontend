

function headerUpdater () {
    const loginBtn=document.getElementById("loginBtn")
    const logoutBtn=document.getElementById("logoutBtn")
    const adminNav=document.getElementById("adminNav")
    if (getCookie("admin")) {
      loginBtn.classList.add("d-none");
      logoutBtn.classList.remove("d-none");
      adminNav.classList.remove("d-none");
    } else {
      loginBtn.classList.remove("d-none");
      logoutBtn.classList.add("d-none");
      adminNav.classList.add("d-none");
    }
};

function deleteCookie(name) {
    const date = new Date("1970-01-01"); 
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=;${expires};path=/`;
}

function eventListenerInit(){
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault(); // <-- ez fontos!
        deleteCookie("admin");
        headerUpdater();     // frissíti a gombokat
        location.href = "index.html"; // kézi redirect
    });
}

