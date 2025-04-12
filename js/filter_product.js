const searchbarButton=document.getElementById('searchbar-button');
const szuro=document.getElementById('szuro');
const minimumPriceRange=document.getElementById('minimum-price-range');
const maximumPriceRange=document.getElementById('maximum-price-range');

searchbarButton.addEventListener('click', filterProduct)
szuro.addEventListener('change', filterProduct)
minimumPriceRange.addEventListener('input', filterProduct)
maximumPriceRange.addEventListener('input', filterProduct)

function filterProduct(){
    const minimumText=document.getElementById('minimum-price-text');
    const maximumText=document.getElementById('maximum-price-text');
    const searchbar=document.getElementById('searchbar-input')

    minimumText.innerText=`Minimum price: ${minimumPriceRange.value} Ft`
    maximumText.innerText=`Maximum price: ${maximumPriceRange.value} Ft`

    let filteredList= products
    filteredList=filteredList.filter(x=>x.price>=minimumPriceRange.value && x.price<=maximumPriceRange.value);

    if(szuro.value.includes("discount")){
        filteredList=filteredList.filter(x=>x.discount);
    }

    if(searchbar.value.trim()){
        filteredList=filteredList.filter(x=>x.name.toLowerCase().includes(searchbar.value.toLowerCase().trim()));
    }

    displayProduct(filteredList)
}
