const sendReviewButton = document.getElementById('send-review')
sendReviewButton.addEventListener('click', ()=>{
    const name=document.getElementById('name');
    const rating=document.getElementById('rating');
    const message=document.getElementById('message');

    sendReview(name.value, rating.value, message.value)
    fetchReviews();
    alert("Véleményét fogadtuk")
    name.value="";
    rating.selectedIndex=0;
    message.value="";
})

async function sendReview(name, rating, message) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stars",rating);
    formData.append("review", message);
  
    try {
      const response = await fetch("https://nodejs114.dszcbaross.edu.hu/api/reviews", {
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

 
  