const velemenyek= document.getElementById('velemenyek-tarolo');

window.addEventListener('DOMContentLoaded', fetchReviews)

async function fetchReviews(){
    const result=await fetch('http://localhost:3000/api/reviews')
    const json=await result.json();
    displayReviews(json);
}



function displayReviews(json){
    velemenyek.innerHTML='';
    json.forEach(element => {
        velemenyek.innerHTML+=reviewsCard(element);
    });
}

function reviewsCard({name,stars,review  }){
    let starsText='';

    for (let i = 0; i < stars; i++) {
        starsText+= `<i class="bi bi-star-fill text-warning"></i>`;
    }

    return `
    <div class="col">
        <div class="border rounded-4 p-4 h-100">

            <div class="d-flex gap-1 align-items-center">
                ${starsText}
            </div>
            <div class="fw-bold my-2">${name}</div>
            <div class="mb-3">
                ${review}   
            </div>
            <div class="text-secondary small">
                <div>2025. 04. 12.</div>
            </div>
        </div>
    </div>
    `
}