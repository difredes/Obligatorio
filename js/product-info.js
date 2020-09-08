//Entrega 3
var product = {};
var commentsArray = [];
const now = new Date();



function showProduct(product, arrayComments) {
    let imagesArray = product.images;
    let comentarios = "";
    let imgs = "";
    let productNameHTML = document.getElementById("productName");
    let productDescriptionHTML = document.getElementById("productDescription");
    let productCostHTML = document.getElementById("productCost");
    let productCountHTML = document.getElementById("soldCount");

    productNameHTML.innerHTML = product.name;
    productDescriptionHTML.innerHTML = product.description;
    productCostHTML.innerHTML = product.cost + " " + product.currency;
    productCountHTML.innerHTML = product.soldCount + " " + "unidades";

    for (let i = 0; i < imagesArray.length; i++) {
        let imageSrc = imagesArray[i];

        imgs += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = imgs;


    }

    for (let comment in arrayComments){
        auxComment = arrayComments[comment];
        let score = "";

        for(let i=1; i<=auxComment.score; i++){
            score += `<span class="fa fa-star checked"></span>`;
        }

        for(let i=auxComment.score + 1; i<=5; i++){
            score += `<span class="fa fa-star"></span>`;
        }

        comentarios += `
                <div class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>`+ auxComment.user + '  ' + score + `</h4>
                             <p>`+ auxComment.description + `</p>
                         </div>    
                             <small class="text-muted">` + auxComment.dateTime.split(' ')[0] + `</small>
                          </div>

                      </div>
                   </div>
               </div>
              `
        document.getElementById("cat-list-container").innerHTML = comentarios;
        
    
    }

    
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            product = resultObj.data;

        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            commentsArray = resultObj.data;

            showProduct(product, commentsArray);
        }
    }); 
    //Desafiate 
    document.getElementById("enviarComm").addEventListener("click", function() {

        let newComment = {

            score : parseInt(document.getElementById('newCal').value),
            description : document.getElementById('newComm').value,
            user : JSON.parse(localStorage.getItem('User-Logged')).email,
            dateTime : "2020-02-25 18:03:52"
        };

        commentsArray.push(newComment);
        showProduct(product, commentsArray);
    })

});

