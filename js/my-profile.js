//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let profileData = localStorage.getItem("profileData");

    if (profileData) {
        loadProfileData(JSON.parse(profileData));
    }

    let profileImageURL = document.getElementById("profileImageURL");
    profileImageURL.addEventListener("input", function(){
        document.getElementById("profileImage").src = document.getElementById("profileImageURL").value;
    });
});

//Guardar Cambios del Perfil
function saveProfile() {
    //Archivos
    let profileImageURL = document.getElementById("profileImageURL").value;
    let profileName = document.getElementById("profileName").value;
    let profileAge = document.getElementById("profileAge").value;
    let profileEmail = document.getElementById("profileEmail").value;
    let profilePhone = document.getElementById("profilePhone").value;
    //Sets the object with the content of the fields
    let profileData = {
        image: profileImageURL,
        name: profileName,
        age: profileAge,
        email: profileEmail,
        phone: profilePhone
    }
    //Save the object in local storage
    localStorage.setItem("profileData", JSON.stringify(profileData));

}

//Load the profile data on the page
function loadProfileData(data) {
    //Get the fields
    let profileImage = document.getElementById("profileImage");
    let profileImageURL = document.getElementById("profileImageURL");
    let profileName = document.getElementById("profileName");
    let profileAge = document.getElementById("profileAge");
    let profileEmail = document.getElementById("profileEmail");
    let profilePhone = document.getElementById("profilePhone");
    //Put the values in the fields
    profileImageURL.value = data.image;
    profileImage.src = data.image;
    profileName.value = data.name;
    profileAge.value = data.age;
    profileEmail.value = data.email;
    profilePhone.value = data.phone;
}

//Se elimina la información del storage//
function deleteProfile(){
    localStorage.removeItem("profileData");
    document.getElementById("profileImage").src = "img/perfl.png";
    document.getElementById("profileImageURL").value = "";
    document.getElementById("profileName").value = "";
    document.getElementById("profileAge").value = "";
    document.getElementById("profileEmail").value = "";
    document.getElementById("profilePhone").value = "";
}