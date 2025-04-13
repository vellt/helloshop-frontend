const sendMessgeButton = document.getElementById('sendMessgeButton')
sendMessgeButton.addEventListener('click', ()=>{
    const name=document.getElementById('name');
    const email=document.getElementById('email');
    const phone=document.getElementById('phone');
    const message=document.getElementById('message');

    sendMessge(name.value, email.value, phone.value, message.value)
    alert("Üzenetét fogadtuk")
    name.value="";
    email.value="";
    phone.value="";
    message.value="";
})

async function sendMessge(name, email, phone, message) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
  
    try {
      const response = await fetch("https://nodejs114.dszcbaross.edu.hu/api/messages", {
        method: "POST",
        body: formData
      });
  
      const result = await response.json();
      
      if (response.ok) {
        console.log("Sikeres véleményküldés:", result);
      } else {
        console.error("Hiba a válaszban:", result);
      }
    } catch (error) {
      console.error("Fetch hiba:", error);
    }
}

 
  