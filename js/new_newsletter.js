const sendMailButton = document.getElementById('send-mail')
sendMailButton.addEventListener('click', ()=>{
    const mail=document.getElementById('mail');

    sendMail(mail.value)
    alert("Email címét fogadtuk")
    mail.value="";
})

async function sendMail(mail) {
    const formData = new FormData();
    formData.append("email", mail);
  
    try {
      const response = await fetch("https://nodejs114.dszcbaross.edu.hu/api/newsletters", {
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

 
  