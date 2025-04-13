const termekek= document.getElementById('termekek-tarolo');

window.addEventListener('DOMContentLoaded', fetchProduct)
let products=[];
async function fetchProduct(){
    const result=await fetch('https://nodejs114.dszcbaross.edu.hu/api/products')
    products=await result.json();
    displayProduct(products);
}


function displayProduct(json){
    termekek.innerHTML='';
    json.forEach(element => {
        if(element.discount){
            termekek.innerHTML+=productCardDiscount(element);
        }else{
            termekek.innerHTML+=productCard(element)
        }
    });
}

function productCard({product_id,name,image, price   }){
    
    return `
    <div class="col ">
            <div>
                <div class="ratio ratio-1x1">
                    <img src="https://nodejs114.dszcbaross.edu.hu/uploads/${image}" alt="" class="card-img-top object-fit-cover rounded-4">
                </div>
                
                <div class="mt-2 mb-3 fw-semibold small">${name}</div>
                
                <div class="d-flex justify-content-between align-items-center">
                    <div class="fw-semibold">${price} Ft</div>


                </div>
                
                <div class="row gx-1 mt-2">
                    <div class="col">
                        <select id="mennyiseg_${product_id}" class="form-select form-select-sm">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                   <div class="col ">
                    <button onclick="addCard('${product_id}')" class="btn w-100 bg-body-secondary text-body-emphasis btn-sm">Kosárba</button>
                   </div>
                </div>
            </div>
        </div>
    `
}

function productCardDiscount({product_id,name,image, price,discount   }){
    
    return `
    <div class="col ">
            <div>
                <div class="ratio ratio-1x1">
                    <img src="https://nodejs114.dszcbaross.edu.hu/uploads/${image}" alt="" class="card-img-top object-fit-cover rounded-4">
                </div>
                
                <div class="mt-2 mb-3 fw-semibold small">${name}</div>
                
                <div class="d-flex justify-content-between align-items-center">
                    <div class="fw-semibold">${parseInt(price*((100-discount)/100))}</div>
                    <div class="text-decoration-line-through text-secondary">${price} Ft</div>
                    <span class="badge bg-danger-subtle text-danger">-${discount}%</span>


                </div>
                
                <div class="row gx-1 mt-2">
                    <div class="col">
                        <select id="mennyiseg_${product_id}" class="form-select form-select-sm">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                   <div class="col ">
                    <button onclick="addCard('${product_id}')" class="btn w-100 bg-body-secondary text-body-emphasis btn-sm">Kosárba</button>
                   </div>
                </div>
            </div>
        </div>
    `
}

function addCard(id) {
    console.log("Termék ID:", id);
    const quantity = parseInt(document.getElementById(`mennyiseg_${id}`).value);
    const product = products.find(x => x.product_id == id);
  
    if (!product) {
      console.error("Termék nem található!");
      return;
    }
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const existing = cart.find(item => item.product_id == product.product_id);
  
    if (existing) {
        if(existing.quantity+quantity>5){
            existing.quantity =5;
        }else{
            existing.quantity += quantity;
        }
      
    } else {
      cart.push({
        ...product,
        quantity: quantity
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Kosár frissítve!");
  }
  