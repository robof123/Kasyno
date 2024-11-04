const logout = document.getElementById('logout');


// Sprawdzenie, czy użytkownik jest zalogowany
if (localStorage.getItem("isAuthenticated") !== "true") {
// Jeśli nie, przekierowanie z powrotem na stronę logowania
    window.location.href = "index.html";
}

logout = localStorage.removeItem("isAuthenticated");

if(logout){
    window.location.href = "index.html";
}
