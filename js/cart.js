let articulos = {};
let articulos2 = {};
let precioUnit = 0;
let precioUnit2 = 0;
let num = 0;
let num2 = 0;
let impSubtotal = 0;
let impSub2 = 0;

let subT = 0;
var subT2 = 0;
var porcentajeEnvio = 0.15;




function actualizarCostos() {

    let subText = document.getElementById("subtotalText");
    let envText = document.getElementById("envioText");
    let totalText = document.getElementById("totalCostText");

    //calculo el precio unitario del pino
    var t1 = (subT * 100);
    //calculo el precio unitario de autos y lo paso a pesos 
    var t2 = (subT2 * 12500 * 40);
    var t = (t2 + t1);

    let subtextHTML = t;
    let costoEnvioHTML = (porcentajeEnvio * t);
    let totalEnvioHTML = Math.round(t + costoEnvioHTML);

    subText.innerHTML = subtextHTML;
    envText.innerHTML = costoEnvioHTML;
    totalText.innerHTML = totalEnvioHTML;


    let detalleHtml = document.getElementById("detalleCompra");
    detalleHtml.innerHTML = ` Total a pagar $ ` + totalEnvioHTML;


}



//funcion que se ejecuta cuando se hace click en el boton aceptar
function btnAceptar() {

    document.getElementById("calle").value="";
    document.getElementById("numeroL").value="";
    document.getElementById("esquina").value ="";
    document.getElementById("detalleCompra").innerHTML = '';
    document.getElementById("subtotalText").innerHTML = 0;
    document.getElementById("envioText").innerHTML = 0;
    document.getElementById("totalCostText").innerHTML = 0;
    document.getElementById("numero").value = 0;
    document.getElementById("numero2").value = 0;
    document.getElementById("subTotal").innerHTML = 0;
    document.getElementById("subTotal2").innerHTML = 0;



}


document.addEventListener("DOMContentLoaded", function (e) {


    //funcion que trae el numero del input, se lo paso a una variable  e imprimo en otro id el monto.
    document.getElementById("numero").addEventListener("change", function () {
        var num = document.getElementById("numero").value;

        impSubtotal = document.getElementById("subTotal");
        impSubtotal.innerHTML = num * 100;
        subT = 100 * num;
        subT = this.value

        actualizarCostos();

    });

    //funcion que trae el numero del input, se lo paso a una variable  e imprimo en otro id el monto.
    document.getElementById("numero2").addEventListener("change", function () {
        var num2 = document.getElementById("numero2").value;

        impSub2 = document.getElementById("subTotal2");
        impSub2.innerHTML = (40 * 12500) * num2;
        subT2 = (Math.round(12500 * 40) * impSub2);

        subT2 = this.value;
        actualizarCostos();

    });


    document.getElementById("premiumradio").addEventListener("change", function () {
        porcentajeEnvio = 0.15;
        actualizarCostos()
    });

    document.getElementById("expressradio").addEventListener("change", function () {
        porcentajeEnvio = 0.07;
        actualizarCostos()
    });

    document.getElementById("standardradio").addEventListener("change", function () {
        porcentajeEnvio = 0.05;
        actualizarCostos()
    });








});









document.addEventListener("DOMContentLoaded", function (ex) {
    getJSONData(ARTICLES_CART).then(function (res) {
        if (res.status === "ok") {
            art = res.data;

            articulos = document.getElementById("art");
            articulos2 = document.getElementById("art2");
            precioUnit = document.getElementById("costoUnit");
            precioUnit2 = document.getElementById("costoUnit2");
            num = document.getElementById("numero");
            num2 = document.getElementById("numero2");

            for (let i = 0; i < art.articles.length; i++) {
                articulos.innerHTML = art.articles[0].name;
                precioUnit.innerHTML = art.articles[0].currency + ` ` + art.articles[0].unitCost;
                num.value = art.articles[0].count;

                if (art.articles[i]) {

                    articulos2.innerHTML = art.articles[i].name;
                    precioUnit2.innerHTML = art.articles[i].currency + ` ` + art.articles[i].unitCost;
                    num2.value = art.articles[i].count;
                }
            }

        }


    })
});