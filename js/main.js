import { getProducts } from './ajax.js';
let loader = document.getElementsByTagName("img")[0];
let urlJson = "./mocks/products.json";

window.addEventListener('load', () => {

});
function deleteNodes(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}
var productList = [];
var selectedProducts = [];

var productCode = document.getElementById("code");
function validateCode() {
    const errorMsg = productCode.nextElementSibling;
    let existCodeOrNot = productList.find(product => product.id === productCode.value);
    if (productCode.validity.valueMissing) {
        productCode.classList.add("error-field");
        productCode.classList.remove("success-field");
        errorMsg.textContent = "Este campo es obligatorio";

    } else if (productCode.validity.patternMismatch) {
        productCode.classList.add("error-field");
        productCode.classList.remove("success-field");
        errorMsg.textContent = "No es un código valido";

    } else if (productCode.validity.tooShort) {
        productCode.classList.add("error-field");
        productCode.classList.remove("success-field");
        errorMsg.textContent = "Es muy corto";
    } else if (typeof existCodeOrNot != 'undefined') {
        productCode.classList.add("error-field");
        productCode.classList.remove("success-field");
        errorMsg.textContent = "El producto ya existe";

    } else {
        productCode.classList.remove("error-field");
        productCode.classList.add("success-field");
        errorMsg.textContent = "";
    }
}
productCode.addEventListener("input", validateCode);

var productName = document.getElementById("name");
function validateName() {
    const errorMsg = productName.nextElementSibling;

    if (productName.validity.valueMissing) {
        productName.classList.add("error-field");
        productName.classList.remove("success-field");
        errorMsg.textContent = "Este campo es obligatorio";

    } else if (productName.validity.patternMismatch) {
        productName.classList.add("error-field");
        productName.classList.remove("success-field");
        errorMsg.textContent = "No es un nombre valido";

    } else if (productName.validity.tooShort) {
        productName.classList.add("error-field");
        productName.classList.remove("success-field");
        errorMsg.textContent = "Es muy corto";
    } else {
        productName.classList.remove("error-field");
        productName.classList.add("success-field");
        errorMsg.textContent = "";
    }
}
productName.addEventListener("input", validateName);

var productGrasa = document.getElementById("fat");
function validateGrasa() {
    const errorMsg = productGrasa.nextElementSibling;

    if (productGrasa.validity.valueMissing) {
        productGrasa.classList.add("error-field");
        productGrasa.classList.remove("success-field");
        errorMsg.textContent = "Este campo es obligatorio";

    } 
    else {
        productGrasa.classList.remove("error-field");
        productGrasa.classList.add("success-field");
        errorMsg.textContent = "";
    }
}
productGrasa.addEventListener("input", validateGrasa);

var productHidratos = document.getElementById("hydrates");
function validateHidratos() {
    const errorMsg = productHidratos.nextElementSibling;

    if (productHidratos.validity.valueMissing) {
        productHidratos.classList.add("error-field");
        productHidratos.classList.remove("success-field");
        errorMsg.textContent = "Este campo es obligatorio";

    
    } else {
        productHidratos.classList.remove("error-field");
        productHidratos.classList.add("success-field");
        errorMsg.textContent = "";
    }
}
productHidratos.addEventListener("input", validateHidratos);

var productProteinas = document.getElementById("protein");
function validateProteinas() {
    const errorMsg = productProteinas.nextElementSibling;

    if (productProteinas.validity.valueMissing) {
        productProteinas.classList.add("error-field");
        productProteinas.classList.remove("success-field");
        errorMsg.textContent = "Este campo es obligatorio";

    
    } else {
        productProteinas.classList.remove("error-field");
        productProteinas.classList.add("success-field");
        errorMsg.textContent = "";
    }
}
productProteinas.addEventListener("input", validateProteinas);

function checkForm() {
    let countFails = 0;
    if (!productCode.validity.valid) {
        validateCode();
        countFails++;
    }
    if (!productName.validity.valid) {
        validateName();
        countFails++;
    }
    if (!productGrasa.validity.valid) {
        validateGrasa();
        countFails++;
    }
    if (!productHidratos.validity.valid) {
        validateHidratos();
        countFails++;
    }
    if (!productProteinas.validity.valid) {
        validateProteinas();
        countFails++;
    }
    if (countFails == 0) {
        addProduct();
    } 
}
let buttonSubmit = document.getElementsByTagName("button")[0];
async function addProduct(){
    let product = {
        id:productCode.value,
        name:productName.value,
        grasas:productGrasa.value,
        hidratos:productHidratos.value,
        proteinas:productProteinas.value
    }
    productList.push(product);
    buttonSubmit.disabled = true;
    buttonSubmit.textContent = "Cargando...";
    await new Promise(r => setTimeout(r, 3000));
    buttonSubmit.disabled = false;
    buttonSubmit.textContent = "Añadir";
    productCode.value = null;
    productName.value = null;
    productGrasa.value = null;
    productHidratos.value = null;
    productProteinas.value = null;
    showProduct(product);
}
document.forms[0].addEventListener("submit",(e) => {
    checkForm();
    e.preventDefault();
});

document.getElementById("toogleForm").addEventListener('click', e => {
    $(e.target.nextElementSibling).slideToggle()
})
$("#consumedProducts").droppable({
    drop: function (event, ui) { //accept (draggable)
        let dragItem = $(ui.draggable[0]);
        let productCode = ui.draggable[0].dataset.code;
        dragItem.draggable("option", "revert", false);
        dragItem.draggable("disable");
        let infoProduct = productList.find(product => product.id === productCode);
        selectedProducts.push(infoProduct);
        console.log(`Información nutricional \nGrasas:${infoProduct.grasas} \nHidratos:${infoProduct.hidratos} \nProteínas:${infoProduct.proteinas}`);
    },

});
document.getElementById("startBtn").addEventListener('click', async (e) => {
    loader.style.display = "inline-block";
    document.getElementById("startBtn").disabled = true;
    /* Usar esta sentencia para ralentizar la petición ajax */
    await new Promise(r => setTimeout(r, 3000));
    productList = await getProducts(urlJson);
    deleteNodes(document.getElementById("availableProducts"));
    productList.forEach(element => {
        showProduct(element);
    });
    document.getElementsByTagName("nav")[0].style.display = "inline-block";
})

function showProduct(product) {
    //Usar esta función para pintar cada producto siguiendo los requisitos del enunciado
    let template = document.getElementById("productTemp");
    template.content.firstElementChild.textContent = product.name;
    template.content.firstElementChild.dataset.code = product.id;
    let clone = document.importNode(template.content, true);
    document.getElementById("availableProducts").appendChild(clone);
    $(".product").draggable({
        cursor: 'move',
        containment: '#interactive',	  //cambiamos la punta de flecha del ratón por una cruz
        revert: true
    });
}