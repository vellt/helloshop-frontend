const API_URL = "http://localhost:3000/api/products";
const tableBody = document.getElementById("product-table-body");
const admin =JSON.parse(getCookie("admin"))||{};

window.addEventListener("DOMContentLoaded", () => {
    if (!admin.admin_id) {
      // Ha nincs admin cookie → irány vissza a főoldalra
      alert("Csak bejelentkezett admin érheti el ezt az oldalt.");
      window.location.href = "index.html";
    }
  });

window.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();

  tableBody.innerHTML = "";

  data.forEach((product) => {
    tableBody.innerHTML += `
      <tr>
        <td>${product.product_id}</td>
        <td>
        <img src="http://localhost:3000/uploads/${product.image}" width="50" class="rounded" id="imgPreview_${product.product_id}">
            <label>
                <i class="bi bi-paperclip fs-4"></i>
                <input type="file" class="d-none" id="imgInput_${product.product_id}" accept="image/*" onchange="previewImage(event, ${product.product_id})">
            </label>
            <input type="hidden" id="currentImage_${product.product_id}" value="${product.image}">
        </td>
        <td><input type="text" class="form-control" value="${product.name}" id="name_${product.product_id}"></td>
        <td><input type="number" class="form-control" value="${product.price}" id="price_${product.product_id}"></td>
        <td><input type="number" class="form-control" value="${product.discount}" id="discount_${product.product_id}"></td>
        <td>
          <button class="btn btn-success btn-sm" onclick="updateProduct(${product.product_id})">Mentés</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.product_id})">Törlés</button>
        </td>
      </tr>
    `;
  });
}

function previewImage(event, id) {
    const file = event.target.files[0];
    if (!file) return;
  
    const preview = document.getElementById(`imgPreview_${id}`);
    preview.src = URL.createObjectURL(file); // frissítjük a kis képet
  }
  

  async function updateProduct(id) {
    console.log(admin);
    const name = document.getElementById(`name_${id}`).value;
    const price = document.getElementById(`price_${id}`).value;
    const discount = document.getElementById(`discount_${id}`).value;
    const imageInput = document.getElementById(`imgInput_${id}`);
    const currentImage = document.getElementById(`currentImage_${id}`).value;
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount);
  
    if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    } else {
        formData.append("image", currentImage); // nincs új kép => küldjük a régit
    }
  
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "x-admin-id":parseInt( admin.admin_id)
      },
      body: formData
    });
  
    const result = await response.json();
    alert(result.success ? "Sikeresen mentve!" : "Hiba a mentés során");
  }
  

async function deleteProduct(id) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
        "x-admin-id": admin.admin_id
      },
  });

  const result = await response.json();
  alert(result.success ? "Törölve!" : "Hiba!");

  loadProducts();
}


document.getElementById("newProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const adminId = getCookie("admin");
    const name = document.getElementById("newName").value;
    const price = document.getElementById("newPrice").value;
    const discount = document.getElementById("newDiscount").value;
    const image = document.getElementById("newImage").files[0];
  
    if (!image) return alert("Kép kiválasztása kötelező!");
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("image", image);
  
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "x-admin-id": admin.admin_id
      },
      body: formData
    });
  
    const result = await response.json();
  
    if (result.success) {
      alert("✅ Termék sikeresen hozzáadva!");
      e.target.reset();
      loadProducts(); // frissítjük a táblázatot
    } else {
      alert("❌ Hiba történt hozzáadáskor");
    }
  });
  