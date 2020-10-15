function onSignIn(googleUser) {

  var profile = googleUser.getBasicProfile();
  localStorage.setItem('User-Logged', JSON.stringify({ email: profile.getEmail() }))

  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

document.addEventListener("DOMContentLoaded", function (e) {

  document.getElementById("submitBtn").addEventListener("click", function (e) {

    let inputEmail = document.getElementById("inputEmail");
    let inputPassword = document.getElementById("inputPassword");
    let camposCompletos = true;

    if (inputEmail.value === '') {
      inputEmail.classList.add("invalid");
      camposCompletos = false;
    }

    if (inputPassword.value === '') {
      inputPassword.classList.add("invalid");
      camposCompletos = false;
    }
    
    if (camposCompletos) {

      localStorage.setItem('User-Logged', JSON.stringify({ email: inputEmail.value }))
      window.location = 'inicio.html';
    }else{
      alert("Datos incompletos, revisa los campos")
  }

  });

});