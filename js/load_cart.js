window.addEventListener('DOMContentLoaded', getCart)
const sendCartButon=document.getElementById("sendCartButon");
sendCartButon.addEventListener('click', ()=>{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach(x=>{
        sendCart(x);
    })
    localStorage.clear();
    getCart();
})

async function sendCart({product_id, quantity} ) {
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("quantity", quantity);
  
    try {
      const response = await fetch("http://localhost:3000/api/orders", {
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


function getCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
    const kosarTarolo= document.getElementById('kosar-tarolo')
    kosarTarolo.innerHTML="";
    cart.forEach(element => {
        kosarTarolo.innerHTML+=cartCard(element)
    });
    displayTotal(cart);
}

function cartCard({product_id,name,image, price,discount, quantity}){
    const newPrice=parseInt(price*((100-discount)/100));
    return  `
    
    <tr class="align-middle">
        <td>
            <div class="ratio ratio-1x1">
            <img src="http://localhost:3000/uploads/${image}" alt="" width="50" class="card-img-top object-fit-cover rounded-3y me-2">
            </div>
        </td>
        <td >${newPrice} Ft</td>
        <td><input oninput="updateQuantity(${product_id},this.value)" type="number" value="${quantity}" min="1" max="5" class="form-control "></td>
        <td >${newPrice*quantity} Ft</td>
        <td> 
            <button onclick="removeCart(${product_id})" class="btn btn-outline-danger">
                <i class="bi bi-trash "></i>
            </button> 
        </td>
    </tr>
    `
}

function removeCart(product_id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.filter(item => item.product_id != product_id);
    if (existing.length) {
        localStorage.setItem("cart", JSON.stringify(existing));
        getCart();
    }
}

function updateQuantity(product_id,quantity){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.product_id == product_id);
    if (existing) {
        existing.quantity=quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        getCart();
    }
}

function displayTotal(cart){
    const subtotalText=document.getElementById('subtotal');
    const totalText=document.getElementById('total');

    let subtotal=0;
    cart.forEach(x=>subtotal+=parseInt(x.price*((100-x.discount)/100))*x.quantity)
    const shippingPrice=1200;
    subtotalText.innerHTML=`${subtotal} Ft`;
    totalText.innerHTML=`${subtotal==0?0: subtotal +shippingPrice} Ft`;
}