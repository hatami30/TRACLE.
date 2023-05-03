// REGISTER FUNCTIONS
function register() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    if (username == "" || email == "" || password == "" || confirm_password == "") {
        alert("Please fill out all fields.");
    } else if (password != confirm_password) {
        alert("Passwords do not match. Please try again.");
    } else {
        // Save the user's information to a database or local storage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        alert("Registration successful! You may now log in.");
        // Redirect the user to the login page
        window.location.href = "./login.html";
    }
}

// LOGIN FUNCTIONS
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var stored_email = localStorage.getItem("email");
    var stored_password = localStorage.getItem("password");
    if (email == stored_email && password == stored_password) {
        alert("Login successful!");
        // Redirect the user to the main page
        window.location.href = "./index.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

