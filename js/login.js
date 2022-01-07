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

localStorage.removeItem("user");
// localStorage.remove('users')
const usuarios = JSON.parse(localStorage.getItem("users")) || [];
const usuario = JSON.parse(localStorage.getItem("user")) || null;
const mensaje = document.querySelector("#mensaje");


//-------------------------------------------------------
const agregarUsuario = function () {
  let id = new Date().getTime();

  usuarios.push(
    new Usuario(
      id,
      "Pablo Marino",
      "pmarino@gmail.com",
      "pm123456",
      "http://1.gravatar.com/avatar/2bd6474c77fd501924adfa0aae631f57"
    )
  );

  localStorage.setItem("users", JSON.stringify(usuarios));
};

//-------------------------------------------------------
const iniciarSesion = function (e) {
  e.preventDefault();

  let correo = document.querySelector("#email_text");
  let pass = document.querySelector("#password_text");

  let validar = usuarios.find(function (user) {
    return user.email === correo.value && user.password === pass.value;
  });

  if (validar?.activo) {
    let user = {
      id: validar.id,
      nombre: validar.nombre,
      email: validar.email,
      imagen: validar.imagen,
    };

    localStorage.setItem("user", JSON.stringify(user));
    location.replace("./pages/home.html");
  } else {
    mensaje.classList = "alert alert-danger";
    correo.value = "";
    pass.value = "";
    correo.focus();
  }
};

// agregarUsuario();
