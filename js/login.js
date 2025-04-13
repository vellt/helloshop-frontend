const loginButton =document.getElementById("loginButton");
const email =document.getElementById("email");
const password =document.getElementById("password");
loginButton.addEventListener('click', async()=>{


    const formData = new FormData();
    formData.append("email", email.value);
    formData.append("password", password.value);
  
    try {
      const response = await fetch("https://nodejs114.dszcbaross.edu.hu/api/login", {
        method: "POST",
        body: formData
      });
  
      const result = await response.json();
     
      
      if (response.ok) {
        console.log("Sikeres véleményküldés:", result);
        setCookie('admin', JSON.stringify(result.admin), 7);
        window.location.href = "admin.html";
      } else {
        console.error("Hiba a válaszban:", result);
      }
    } catch (error) {
      console.error("Fetch hiba:", error);
    }
})


function setCookie(name, value, days) {
    const date = new Date(); 
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}