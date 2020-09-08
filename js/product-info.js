var product = {};
var comments = [];

// ESTA FUNCION MUESTRA EN PANTALLA LAS IMAGENES
function showImagesGallery(imagenesArray) {

    let htmlContentToAppend = "";

    for (let i = 0; i < imagenesArray.length; i++) {
        
        let imageSrc = imagenesArray[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="${imageSrc}" alt="Imagen producto ${i}">
            </div>
        </div>
        `;

        document.getElementById("imagenesDelProducto").innerHTML = htmlContentToAppend;
    }
}

// ESTA FUNCION ORDENA LOS COMENTARIOS POR FECHA, DE FORMA DECENDETE
function ordenarDesendenteComentariosPorFecha(comentariosArray) {

    let result = [];
        
    result = comentariosArray.sort(function (a, b) {
        
        let fecha1 = new Date(a.dateTime);
        let fecha2 = new Date(b.dateTime);

        if ( fecha1 > fecha2 ){ return -1; }
        if (fecha1 < fecha2) { return 1; }
        return 0;

    });

    return result;

}

// ESTA FUNCION MUESTRA EN PANTALLA LOS COMENTARIOS
function showComments(comentariosArray) {

    let htmlContentToAppend = "";

    let meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
        "Octubre", "Noviembre", "Diciembre"
    ];

    let diasSemana = [
        "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ];

    for (let i = 0; i < comentariosArray.length; i++) {
        
        let comentario = comentariosArray[i];

        let fecha = new Date(comentario.dateTime);

        let fechaString = `
        ${diasSemana[fecha.getDay()]}, ${fecha.getDate()} de  ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}
        `;

        htmlContentToAppend += `
        <br>
        <p><strong>${comentario.user}</strong> &nbsp` ;
          
        for (let i = 1; i <= comentario.score; i++) {
            htmlContentToAppend += '<span class="fa fa-star checked"></span>';
        }

        for (let i = comentario.score + 1; i <= 5; i++) {
            htmlContentToAppend += '<span class="fa fa-star"></span>';
        }

            
        htmlContentToAppend += `</p><div style="display: flex;">
            
            <p>${comentario.description}. &nbsp <p style="color: gray; font-size: 0.9rem;">${fechaString}</p></p> 
        </div>
        <hr />
        `;

        document.getElementById("comentariosCalificaciones").innerHTML = htmlContentToAppend;
    }

}

// CUANDO SE CARGUE LA PAGINA
document.addEventListener("DOMContentLoaded", function () { // SE VAN A EJECUTAR
    
    // ESTO
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        
        if (resultObj.status === "ok") {

            product = resultObj.data;

            let nombreDelProducto  = document.getElementById("nombreDelProducto");
            let descripcionDelProducto = document.getElementById("descripcionDelProducto");
            let precioDelProducto = document.getElementById("precioDelProducto");
            let cantidadDeVentas = document.getElementById("cantidadDeVentas");
        
            nombreDelProducto.innerHTML = product.name;
            descripcionDelProducto.innerHTML = product.description;
            precioDelProducto.innerHTML = `${product.cost} ${product.currency}`;
            cantidadDeVentas.innerHTML = product.soldCount;

            showImagesGallery(product.images);
        }
    });

    // Y ESTO
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {
            comments = resultObj.data;
            comments = ordenarDesendenteComentariosPorFecha(comments);
            showComments(comments);
        }

    });

    // SI HAY UN USUARIO LOGUEADO, MOSTRAMOS EL DIV DE COMENTARIO
    let userLogged = localStorage.getItem('user-logged');
    if (userLogged) { // SI EXISTE LA INFO EN EL STORAGE

        document.getElementById("calificacion").style = "display: inline-block";
    }

});

document.getElementById("btn-calificacion").addEventListener("click", function () {

    // EXTRAEMOS LA INFORMACION DE LA CALIFICACION
    let comentrario = document.getElementById("ta-comentario").value;
    let calificacion = parseInt(document.getElementById("slct-calificacion").value);

    if (comentrario != "" && calificacion != 0) {

        comentarioParaAgregar = {};

        // EXTRAEMOS EL NOMBRE DE USUARIO
        let userLogged = localStorage.getItem('user-logged');
        userLogged = JSON.parse(userLogged);
        let email = userLogged.email;

        // EXTRAEMOS LA FECHA Y HORA
        let dateTime = new Date();
        let fechaHora = `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDay() - 1} `;
        fechaHora += `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;

        // CREAMOS EL COMENTARIO
        comentarioParaAgregar = {
            "score": calificacion,
            "description": comentrario,
            "user": email,
            "dateTime": fechaHora
        }

        // AGREGAMOS EL COMENTARIO A LAS OTROS COMENTARIOS
        comments.unshift(comentarioParaAgregar);

        // MOSTRAMOS NUEVAMENTE LOS COMENTARIOS
        showComments(comments);

        document.getElementById("ta-comentario").value = "";
        document.getElementById("slct-calificacion").value = "0";

        alert(`Gracias ${email} por su calificación!`);

    } else {
        
        alert("Debe completar el comentario y la calificación");
    }
});

//DIEGO FREDES, GRUPO 169//