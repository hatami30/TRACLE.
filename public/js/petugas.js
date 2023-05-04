const API_URL = "https://645130aee1f6f1bb22aaa3e5.mockapi.io/api/v1/petugas";
const tableBody = document.getElementById("petugas-table-body");

// Fetch data from API and render table
async function displayPetugas() {
    tableBody.innerHTML = "";

    const response = await fetch(API_URL);
    const data = await response.json();

    data.forEach(({ id, name, email, address }) => {
        const row = document.createElement("tr");

        const idCol = createCol(id);
        const namaCol = createCol(name);
        const emailCol = createCol(email);
        const addressCol = createCol(address);
        const actionsCol = createActionsCol(id);

        row.append(idCol, namaCol, emailCol, addressCol, actionsCol);
        tableBody.appendChild(row);
    });
}

// Create a table column with the given text content
function createCol(text) {
    const col = document.createElement("td");
    col.className = "px-4 py-2";
    col.textContent = text;
    return col;
}

// Create the actions column with edit and delete buttons
function createActionsCol(id) {
    const actionsCol = document.createElement("td");
    actionsCol.className = "px-4 py-2";

    const editButton = createButton("Edit", "bg-blue-500 text-white hover:bg-blue-700 hover:text-white px-4 py-2 rounded mr-2", () => editPetugas(id));
    const deleteButton = createButton("Delete", "bg-red-500 text-white hover:bg-red-700 hover:text-white px-4 py-2 rounded", () => deletePetugas(id));

    actionsCol.append(editButton, deleteButton);
    return actionsCol;
}

// Create a button with the given text, class, and click handler
function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
}

// Edit an existing petugas by sending a PUT request to the API
async function editPetugas(id) {
    const newName = prompt("Enter the new name:");
    const newEmail = prompt("Enter the new email:");
    const newAddress = prompt("Enter the new address:");

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newName, email: newEmail, address: newAddress })
    });

    if (response.ok) {
        await displayPetugas();
    } else {
        throw new Error(`Failed to edit petugas with id ${id}`);
    }
}

// Delete an existing petugas by sending a DELETE request to the API
async function deletePetugas(id) {
    if (confirm("Are you sure you want to delete this petugas?")) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            await displayPetugas();
        } else {
            throw new Error(`Failed to delete petugas with id ${id}`);
        }
    }
}

// Call displayPetugas() to render the table
displayPetugas();
