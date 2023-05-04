const API_URL = "https://645130aee1f6f1bb22aaa3e5.mockapi.io/api/v1/petugas";

// Define variables for selected petugas
let selectedPetugasId = '';
let selectedPetugasNama = '';
let selectedPetugasEmail = '';

// Function to get all petugas from API
async function getAllPetugas() {
    const response = await fetch(API_URL);
    const petugas = await response.json();
    return petugas;
}

// Function to add new petugas to API
async function addNewPetugas(petugas) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petugas),
    });
    const newPetugas = await response.json();
    return newPetugas;
}

// Function to update existing petugas in API
async function updatePetugas(petugas) {
    const response = await fetch(`${API_URL}/${petugas.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petugas),
    });
    const updatedPetugas = await response.json();
    return updatedPetugas;
}

// Function to delete existing petugas from API
async function deletePetugas(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    const deletedPetugas = await response.json();
    return deletedPetugas;
}

// Function to display all petugas in list
async function displayPetugas() {
    const petugasList = document.getElementById('petugas-list');
    petugasList.innerHTML = '';
    const petugas = await getAllPetugas();
    petugas.forEach((petugas) => {
        const li = document.createElement('li');
        li.innerHTML = <button class="btn-petugas" onclick="selectPetugas('${petugas.id}', '${petugas.nama}', '${petugas.email}')"> <span>${petugas.nama}</span> <span>${petugas.email}</span> </button>;
        petugasList.appendChild(li);
    });
}

// Function to handle petugas selection
function selectPetugas(id, nama, email) {
    selectedPetugasId = id;
    selectedPetugasNama = nama;
    selectedPetugasEmail = email;
    updatePetugasCard();
}

// Function to update selected petugas card
function updatePetugasCard() {
    const petugasCard = document.getElementById('petugas-card');
    const petugasNama = document.getElementById('petugas-nama');
    const petugasEmail = document.getElementById('petugas-email');
    const pilihPetugasBtn = document.getElementById('pilih-petugas');
    if (selectedPetugasId) {
        petugasCard.classList.add('selected');
        petugasNama.innerText = selectedPetugasNama;
        petugasEmail.innerText = selectedPetugasEmail;
        pilihPetugasBtn.disabled = false;
    } else {
        petugasCard.classList.remove('selected');
        petugasNama.innerText = '';
        petugasEmail.innerText = '';
        pilihPetugasBtn.disabled = true;
    }
}

// Function to handle petugas selection
function handlePilihPetugas() {
    const formMessage = document.getElementById('form-message');
    const selectedPetugas = {
        id: selectedPetugasId,
        nama: selectedPetugasNama,
        email: selectedPetugasEmail,
    };
    addNewPetugas(selectedPetugas)
        .then(() => {
            resetForm();
            formMessage.innerText = 'Petugas berhasil dipilih dan ditambahkan.';
        })
        .catch((error) => console.error(error));
}

// Function get all petugas and display in list
async function getAndDisplayAllPetugas() {
    try {
        const petugasList = document.getElementById("petugas-list");
        petugasList.innerHTML = "";
        const petugasArray = await getAllPetugas();
        petugasArray.forEach((petugas) => {
            const petugasCard = <div class="card" onclick="selectPetugas('${petugas.id}')"> <h3>${petugas.nama}</h3> <p>${petugas.email}</p> </div>;
            petugasList.insertAdjacentHTML("beforeend", petugasCard);
        });
    } catch (error) {
        console.error(error);
    }
}

// Select petugas and display details
function selectPetugas(id) {
    const petugasCard = document.getElementById("petugas-card");
    const petugasNama = document.getElementById("petugas-nama");
    const petugasEmail = document.getElementById("petugas-email");
    const pilihPetugasBtn = document.getElementById("pilih-petugas");
    getPetugasById(id)
        .then((petugas) => {
            petugasNama.innerText = petugas.nama;
            petugasEmail.innerText = petugas.email;
            pilihPetugasBtn.disabled = false;
            pilihPetugasBtn.onclick = () => {
                selectPetugasHandler(petugas);
            };
        })
        .catch((error) => console.error(error));
}

// Handle petugas selection
function selectPetugasHandler(petugas) {
    const formMessage = document.getElementById("form-message");
    const idInput = document.getElementById("id");
    const namaInput = document.getElementById("nama");
    const emailInput = document.getElementById("email");
    idInput.value = petugas.id;
    namaInput.value = petugas.nama;
    emailInput.value = petugas.email;
    formMessage.innerText = Petugas`${petugas.nama} telah dipilih.`;
    resetPetugasCard();
}

// Reset petugas card
function resetPetugasCard() {
    const petugasCard = document.getElementById("petugas-card");
    const petugasNama = document.getElementById("petugas-nama");
    const petugasEmail = document.getElementById("petugas-email");
    const pilihPetugasBtn = document.getElementById("pilih-petugas");
    petugasNama.innerText = "";
    petugasEmail.innerText = "";
    pilihPetugasBtn.disabled = true;
}

// Reset form
function resetForm() {
    const form = document.getElementById("petugas-form");
    form.reset();
    resetPetugasCard();
    const formMessage = document.getElementById("form-message");
    formMessage.innerText = "";
}

// On page load
$(document).ready(() => {
    getAndDisplayAllPetugas();
});
