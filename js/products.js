//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

//filtros
const ORDER_ASC_BY_PRICE = "Prec.(crec)";
const ORDER_DESC_BY_PRICE = "Prec.(desc)";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
//Desafiate 2
var buscar = undefined;


function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function verProducto() {
    //localStorage.setItem('product', JSON.stringify({ productName: name }));
    window.location = 'product-info.html';
}


function showProductsList(array) {


    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        //controlo filtro precio
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {
            //controlo filtro precio

            //Desafiate 2
            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1) {
                //Desafiate 2    
                htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" class="img-thumbnail">
                        </div>
                    <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>`+ product.name + ' - ' + product.currency + '  ' + product.cost + `</h4>
                             <p>`+ product.description + `</p>
                         </div>    
                             <small class="text-muted">` + product.soldCount + ' vendidos' + `</small>
                          </div>

                      </div>
                   </div>
               </div>
              `
                //Entrega 3
                htmlContentToAppend += '<button class="btn btn-light btn-lg btn-block" onclick="verProducto()">Ver Producto</button><br></br>';
                //quité un style float right que puso Daniel en la biblioteca
                //quité el parametro name de la funcion verProducto porque saco localStorage
            }

        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, auxProductsArray) {
    currentSortCriteria = sortCriteria;

    if (auxProductsArray != undefined) {
        productsArray = auxProductsArray;
    }

    productsArray = sortProducts(currentSortCriteria, productsArray);

    //Muestro los productos ordenados
    showProductsList(productsArray);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro los productos ordenados
            showProductsList(productsArray);
        }

        document.getElementById("sortByPriceAsc").addEventListener("click", function () {
            sortAndShowProducts(ORDER_ASC_BY_PRICE);
        });

        document.getElementById("sortByPriceDesc").addEventListener("click", function () {
            sortAndShowProducts(ORDER_DESC_BY_PRICE);
        });

        document.getElementById("sortByCount").addEventListener("click", function () {
            sortAndShowProducts(ORDER_BY_PROD_COUNT);
        });

        document.getElementById("clearRangeFilter").addEventListener("click", function () {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";

            minCost = undefined;
            maxCost = undefined;

            showProductsList(productsArray);
        });

        document.getElementById("rangeFilterCount").addEventListener("click", function () {
            //Obtengo el mínimo y máximo de los intervalos para filtrar por costo
            //de producto por unidad.
            minCost = document.getElementById("rangeFilterCountMin").value;
            maxCost = document.getElementById("rangeFilterCountMax").value;

            if ((minCost != undefined) && (minCost != "") && parseInt(minCost) >= 0) {
                minCost = parseInt(minCost);
            }
            else {
                minCost = undefined;
            }

            if ((maxCost != undefined) && (maxCost != "") && parseInt(maxCost) >= 0) {
                maxCost = parseInt(maxCost);
            }
            else {
                maxCost = undefined;
            }

            showProductsList(productsArray);
        });

        // Desafiate 2
        document.getElementById("buscador").addEventListener('input', function () {

            buscar = document.getElementById("buscador").value.toLowerCase();

            showProductsList(productsArray);
        });


        document.getElementById("limpBusc").addEventListener('click', function () {

            document.getElementById("buscador").value = "";
            buscar = undefined;
            showProductsList(productsArray);
        });

    });
});

