function submitEventHandler(evento) {
    evento.preventDefault();
    sessionStorage.setItem('logged', true);
    var inputEmail = document.getElementById("email");
    localStorage.setItem("email", inputEmail.value);
    window.location.href = 'index.html';

}






document.getElementById('form-login').addEventListener('submit', submitEventHandler);

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});