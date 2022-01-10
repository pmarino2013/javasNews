let usuario = JSON.parse(localStorage.getItem("user")) || null;

let menuAdmin = document.querySelector("#admin");

function validar() {
  if (usuario?.email === "admin@admin.com.ar") {

    let enlace=document.createElement('a')
    enlace.classList='dropdown-item'
    enlace.href="./admin.html"
    enlace.innerHTML='<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Administrar'
    // let menu=`<a class="dropdown-item" href="./admin.html"><i class="fa fa-user-o" aria-hidden="true"></i> Administrar</a>`
    menuAdmin.appendChild(enlace)
  }
}

validar()
