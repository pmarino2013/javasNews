import { articulos } from "./data.js";
// console.log(articulos);
let contenedor = document.querySelector("#container_news");
let usuario = JSON.parse(localStorage.getItem("user")) || null;

//-------Función que valida si el usuario se logueo-----------
function validarAuth() {
  if (!usuario) {
    document.querySelector("#navbarSupportedContent").classList="d-none";
    contenedor.classList = "row row-cols-1";
    contenedor.innerHTML = `
        <div class="alert alert-danger" role="alert">
        No puede acceder a esta información. Para poder continuar debe loguearse, puede hacerlo desde <a href="../index.html">aquí</a>
        </div>
        `;
  }else{
    cargarNoticias(articulos);
  }
}
//--------------------------------------------------------------

function cargarNoticias(array) {
  contenedor.innerHTML = "";

  if (array.length <= 0) {
    let div = document.createElement("div");
    div.classList = "col";
    let mensaje = `<h4 class="text-center">No se encontraron resultados</h4>`;
    div.innerHTML = mensaje;
    contenedor.classList = "row row-cols-1";
    contenedor.appendChild(div);
  }
  array.map(function (articulo) {
    let div = document.createElement("div");
    div.classList = "col";
    let tarjeta = `
                <div class="card h-100">
                <img src="${articulo.urlToImage}" class="card-img-top img_news" alt="${articulo.title}">
                <div class="card-body">
                <span class="badge rounded-pill bg-dark mb-1">${articulo.source.name}</span>
                    <h5 class="card-title">${articulo.title}</h5>
                    <p class="card-text">${articulo.description}</p>
                </div>
                <div class="card-footer d-grid">
                    <a class="btn btn-info text-white" href="${articulo.url}" target="_blank">Ver más...</a>
                </div>
                </div>
            `;

    div.innerHTML = tarjeta;
    contenedor.classList = "row row-cols-1 row-cols-md-3 g-4";
    contenedor.appendChild(div);
  });
}

//--------------buscar por portal de noticia-----------------
function buscarSource(termino) {
  let resultado = articulos.filter(function (articulo) {
    return articulo.source.name.toLowerCase().includes(termino.toLowerCase());
  });

  //   console.log(resultado);
  cargarNoticias(resultado);
}

//---------Buscar noticia-------------------------------
function buscarNews(termino) {
  let resultado = articulos.filter(function (articulo) {
    return articulo.title.toLowerCase().includes(termino.toLowerCase());
  });

  //   console.log(resultado);
  cargarNoticias(resultado);
}

//----------------------------------------------
//   function logout(){
//       location.replace('../index.html')
//   }
//------------------------------------------------
document.querySelector("#form_search").addEventListener("submit", function (e) {
  e.preventDefault();
  buscarNews(document.querySelector("#text_search").value);
  //   buscarSource(document.querySelector("#text_search").value);
});

document.querySelector("#text_search").addEventListener("click", function () {
  document.querySelector("#text_search").value = "";
  cargarNoticias(articulos);
});

document.querySelector("#logout").addEventListener("click", function () {
  location.replace("../index.html");
});


validarAuth()