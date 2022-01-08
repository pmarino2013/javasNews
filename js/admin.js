class Articulo {
  constructor(
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content = ""
  ) {
    this.source = source;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;
  }
}

let noticias = JSON.parse(localStorage.getItem("articulos"));

let cuerpoTabla = document.querySelector("#cuerpo_tabla");

let myModal = new bootstrap.Modal(document.getElementById('myModal'))

let indiceNoticia=null
//------------------------------------------------------
function cargarTabla(array) {
  cuerpoTabla.innerHTML = "";

  array.map(function (item, index) {
    let tr = document.createElement("tr");
    let cuerpo = `
        <td>${item.source.name}</td>
        <td>${item.author}</td>
        <td><a class="enlace" href="${item.url}" target="_blank">${item.title}</a></td>
        <td class="d-flex align-items-center">
        <i class="fa fa-pencil-square-o me-2" role="button" aria-hidden="true" onclick="abrirModal(${index})"></i>
        <i class="fa fa-trash-o" role="button" aria-hidden="true" onclick="borrarNoticia(${index})"></i>
        </td>
`;
    tr.innerHTML = cuerpo;
    cuerpoTabla.appendChild(tr);
  });
}

// Validar formulario------------------------------------
let forms = document.querySelectorAll(".needs-validation");
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        guardarNoticia();
      }
      
      form.classList.add("was-validated");
    },
    false
  );
});

//---------------------------------------------------------
function guardarNoticia() {
  let portal = document.querySelector("#validationCustom00").value;
  let autor = document.querySelector("#validationCustom01").value;
  let titulo = document.querySelector("#validationCustom02").value;
  let descripcion = document.querySelector(
    "#validationCustomDescription"
  ).value;
  let url = document.querySelector("#validationCustom03").value;
  let imagen = document.querySelector("#validationCustom04").value;
  let fecha = document.querySelector("#validationCustom05").value;
  let contenido = document.querySelector("#validationCustomContent").value;

  noticias.push(
    new Articulo(
      { id: new Date().getTime(), name: portal },
      autor,
      titulo,
      descripcion,
      url,
      imagen,
      fecha,
      contenido
    )
  );

  localStorage.setItem("articulos", JSON.stringify(noticias));
  cargarTabla(noticias);
  // document.querySelector('#formulario').reset()
  location.reload();
}

//------------------------------------------------
function abrirModal(id){
  indiceNoticia=id
  document.querySelector("#updatePortal").value=noticias[id].source.name
 document.querySelector("#updateAutor").value=noticias[id].author
  document.querySelector("#updateTitulo").value=noticias[id].title
 document.querySelector("#updateDescripcion").value=noticias[id].description
 document.querySelector("#updateUrl").value=noticias[id].url
 document.querySelector("#updateImagen").value=noticias[id].urlToImage
  document.querySelector("#updateContenido").value=noticias[id].content

myModal.show()

}

//-------------------------------------------------
function actualizarNoticia(){
  
  noticias[indiceNoticia].source.name=document.querySelector("#updatePortal").value
  noticias[indiceNoticia].author=document.querySelector("#updateAutor").value
  noticias[indiceNoticia].title=document.querySelector("#updateTitulo").value
  noticias[indiceNoticia].description=document.querySelector("#updateDescripcion").value
  noticias[indiceNoticia].url=document.querySelector("#updateUrl").value
  noticias[indiceNoticia].urlToImage=document.querySelector("#updateImagen").value
  noticias[indiceNoticia].content=document.querySelector("#updateContenido").value

  localStorage.setItem("articulos", JSON.stringify(noticias));

  cargarTabla(noticias);

  myModal.hide()

}

//------------------------------------------------
function borrarNoticia(id) {
  let validar = confirm(
    `Esta segúro que quiere eliminar la noticia ${noticias[id].title}?`
  );

  if (validar) {
    noticias.splice(id, 1);
    localStorage.setItem("articulos", JSON.stringify(noticias));
    cargarTabla(noticias);
  }
}

document.querySelector('#formularioModal').addEventListener("submit", function(event){
  
  event.preventDefault();
        
  actualizarNoticia()
})

cargarTabla(noticias);
