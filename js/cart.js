var cartProduct = []


// Función para mostrar producto en el carrito
function showCartProducts() {

    let htmlContentToAppend = "";

    console.log(cartProduct);
    console.log(cartProduct.length);
    for (let i = 0; i < cartProduct.length; i++) {
        let product = cartProduct[i];

        var subTotal = product.unitCost * product.count;

        htmlContentToAppend += `                  
        <tr class="justify-content-md-center">
        <th scope="row text-"><img src="` + product.src + `" class="w-25" alt="">  
        </th>
        <td class="text-center">` + product.name + `</td>
        <td id="prodUnitCost" class="text-center">` + product.unitCost + `</td>
        <td class="text-center">
        <input onchange="subTotalByCount()" id="prodCartCount" class="text-center w-50" type="number" placeholder="` + product.count + `">
        </td>
        <td class="text-center">$<span id="subTotalCart">`+ subTotal + `</span></td>
        </tr>
        `
        ;
    }
    document.getElementById("cart-product").innerHTML = htmlContentToAppend;
    
}

// Función para calcular subtotal = costo unitario * cantidad (x)
function subTotalByCount() {

    let i = 0;
    let product = cartProduct[i];

    var x = document.getElementById("prodCartCount").value;
    document.getElementById("subTotalCart").innerHTML = product.unitCost * x;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (restultObj) {
        if (restultObj.status === "ok") {
            cartProduct = restultObj.data.articles;
        }

        console.log(cartProduct);

        showCartProducts();
    })

    // document.getElementById("prod-cart-count").addEventListener("onchange", function () {

    //     function subTotal() {

    //         var x = getElementsByClassName("prod-cart-count").value;
    //         document.getElementById("sub-total-cart").innerHTML = subTotal * x;
    //     }
    // })
});