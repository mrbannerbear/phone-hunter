const loadData = async (phoneName, isShowAll) => {
        const response = await fetch (`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
        const data = await response.json()
        const phones = data.data
        displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    // Emptying div so it doesn't contain previous elements when a product is searched again
    document.getElementById('phone-container').textContent = '';

    //  First 10 phones
    if(!isShowAll){
    phones = phones.slice(0, 10)} 
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl pt-4`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="${phone.slug}" /></figure>
        <div class="card-body">
          <h2 class="card-title flex justify-center">${phone.phone_name}</h2>
          <div class="card-actions justify-center">
            <button class="btn btn-primary bg-sky-400 border-0 text-white mt-8" onclick="modalHandle('${phone.slug}');my_modal_2.showModal()">Show Details</button>
                                                                
          </div>
        </div>
      </div>
        `
        document.getElementById('phone-container').appendChild(phoneCard);

    });
    loadingHandle(false)
    if(phones.length <= 10 && phones.length > 0){
        document.getElementById('load-btn').style.display = "block"} else if(phones.length = 0){
            document.getElementById('load-btn').style.display = "none"
        };
} 

// If i called displayPhones() here, that wouldn't work as it's already ready to be called as a callback within loadData(). To
// see it, I have to call loadData().

let inputBtn = document.getElementById('search-input'),
    searchBtn = document.getElementById('search-btn');


let searchHandle = (isShowAll) => {
    document.getElementById('search-btn').addEventListener("click", function(){
        const searchInput = document.getElementById('search-input');
        const searchText = searchInput.value
        loadingHandle(true)
        loadData(searchText, isShowAll)
    })
 }
searchHandle(true)

let loadingHandle = (isLoading) => {
    if(isLoading === true){
    document.getElementById('spinner').style.display = "flex"}
    else if(isLoading === false){
        document.getElementById('spinner').style.display = "none"
    }
}


let showAllHandle = () => {
    document.getElementById("load-btn").addEventListener("click", function(){
        searchHandle(true)
    })
}

let modalHandle = async (id) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phoneID = data.data
    showPhoneDetails(phoneID)
}

let showPhoneDetails = (phone) => {
    console.log(phone)
    document.getElementById('modal-box').innerHTML = `
    <p class="py-5 flex justify-center"><img src="${phone.image}"></img></p>
    <h3 id="phoneName" class="font-bold text-lg text-center">${phone.name}</h3>
    <p class="pt-4 pb-2 font-medium">Storage: <span id="storage" class="font-normal">${phone.mainFeatures.storage}</span></p>
    <p class="py-2 font-medium">Display Size: <span id="displaySize" class="font-normal">${phone.mainFeatures.displaySize}</span></p>
    <p class="py-2 font-medium">Chipset: <span id="chipset" class="font-normal">${phone.mainFeatures.chipSet}</span></p>
    <p class="py-2 font-medium">Memory: <span id="memory" class="font-normal">${phone.mainFeatures.memory}</span></p>
    <p class="py-2 font-medium">Slug: <span id="slug" class="font-normal">${phone.slug}</span></p>
    <p class="py-2 font-medium">Release date: <span id="releaseDate" class="font-normal">${phone.releaseDate}</span></p>
    <p class="py-2 font-medium">Brand: <span id="brand" class="font-normal">${phone.brand}</span></p>
    <p class="py-2 font-medium">GPS: <span id="gps" class="font-normal">${phone.others.GPS}</span></p>
    
    `
}
