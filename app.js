const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    // console.log(phones);
    const container = document.getElementById('phone-container');
    const showBtn = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 6);
        showBtn.classList.remove('d-none');
    }
    else {
        showBtn.classList.add('d-none');
    }

    const warning = document.getElementById('d-none');
    if (phones.length === 0) {
        warning.classList.remove('d-none');
    }
    else {
        warning.classList.add('d-none');
    }
    container.innerText = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
<div class="col">
<div class="card p-3">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p><i>${phone.slug}</i></p>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer.</p>
            <button class="btn btn-primary" onclick="loadDetails('${phone.slug}')" id="show-details" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
           
    </div>
</div>
</div>
`
        container.appendChild(div);
    });
    loaderToggle(false);
}

const process = (dataLimit) => {
    loaderToggle(true);
    const input = document.getElementById('input-field');
    inputData = input.value;
    loadPhones(inputData, dataLimit);
}

// click with search button 
document.getElementById('search-btn').addEventListener('click', function () {
    process(10);
})

// click with enter key 
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // code for enter
        process(10);
    }
});

document.getElementById('show-all').addEventListener('click', function () {
    process();
})

const loaderToggle = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}

// phone details 
const loadDetails = async id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
}

// show phone details 
const displayDetails = details => {
    // console.log(details.mainFeatures.sensors);
    const detailsContain = document.getElementById('modal-details');
    detailsContain.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${details.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <img src="${details.image}" class="card-img-top" alt="...">
    <p>${details.mainFeatures ? details.mainFeatures.displaySize : 'None'}</p>
    <p>${details.mainFeatures ? details.mainFeatures.storage : 'No Storage Information'}</p>
    <p>${details.others ? details.others.releaseDate : 'No release information'}</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    </div>
    `
}