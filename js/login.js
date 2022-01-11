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

//------------------------------------------------------
var forms = document.querySelectorAll(".needs-validation");

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );
});

//-------------------------------------------------------
const agregarUsuario = function (event) {
  event.preventDefault();

  let id = new Date().getTime();

  let nombre = document.querySelector("#validationCustom01").value;
  let email = document.querySelector("#validationCustom02").value;
  let password = document.querySelector("#validationCustom03").value;
  let imagen = document.querySelector("#validationCustom04").value;

  let validar = usuarios.find(function (user) {
    return user.email === email;
  });

  if (!validar) {
    usuarios.push(new Usuario(id, nombre, email, password, imagen));
    localStorage.setItem("users", JSON.stringify(usuarios));
    location.replace("../index.html");
  } else {
    alert(
      "El email ya se encuentra registrado, inicie sesión con sus credenciales"
    );
    document.querySelector("#validationCustom02").value = "";
    document.querySelector("#validationCustom02").focus();
  }

  // usuarios.push(
  //   new Usuario(
  //     id,
  //     "Pablo Marino",
  //     "pmarino@gmail.com",
  //     "pm123456",
  //     "http://1.gravatar.com/avatar/2bd6474c77fd501924adfa0aae631f57"
  //   ),
  //   new Usuario(
  //     99,
  //     "Admin",
  //     "admin@admin.com.ar",
  //     "admin",
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx_7XSeoV5uoxiFIbSEg9QT-YT7TFqgvuxag&usqp=CAU"
  //   )
  // );
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
