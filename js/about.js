let usuario = JSON.parse(localStorage.getItem("user")) || null;
let contenedor=document.querySelector('#contenedor')
function validarAuth() {
    if (!usuario) {
      document.querySelector("#navbarSupportedContent").classList="d-none";
     
      contenedor.innerHTML = `
      <div class="row">
            <div class="col">
            <div class="alert alert-danger" role="alert">
            No puede acceder a esta información. Para poder continuar debe loguearse, puede hacerlo desde <a href="../index.html">aquí</a>
            </div>
            </div>
        </div>                
          `;
    }
  }

  validarAuth()