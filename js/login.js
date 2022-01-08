class Usuario {
  constructor(id, nombre, email, password, imagen, activo = true) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.imagen = imagen;
    this.activo = activo;
  }
}

let usuarios = JSON.parse(localStorage.getItem("users")) || [];
let usuario = JSON.parse(localStorage.getItem("user")) || null;
let mensaje=document.getElementById('mensaje')

const agregarUsuario = function () {
  let id = new Date().getTime();

  usuarios.push(
    new Usuario(
      id,
      "Paul Marino",
      "pmarino@gamil.com",
      "pm123456",
      "http://1.gravatar.com/avatar/2bd6474c77fd501924adfa0aae631f57"
    )
  );

  localStorage.setItem('users', JSON.stringify(usuarios) )


};

//--------Login-------------------------------
function iniciarSesion(event){
    event.preventDefault()
    let correo = document.querySelector("#email_text")
    let pass=document.querySelector("#password_text")

    let validar= usuarios.find(function(user){
        return user.email===correo.value && user.password===pass.value
    })
    
    if(validar){

        if(validar.activo){

            localStorage.setItem('user', JSON.stringify(validar))
            location.replace('./pages/home.html')
        }else{
            mensaje.innerText="Usuario inactivo. Consultar con Administrador"
            mensaje.classList="alert alert-danger"

        }

    }else{
        mensaje.classList="alert alert-danger"
        correo.value=''
        pass.value=""
        correo.focus()
    }

   

}



// agregarUsuario()