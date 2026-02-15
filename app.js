//===============VARIABLE GLOBABLE=====================//

let usuarios  = {
    admin: "admin123",
    usuario: "1234",
    demo: "demo"
};

let usuarioActual = null;
let peliculasGlobales =[];
let peliculaEdicion = null;

//===============INICIALIZACION DE APP =====================//

document.addEventListener("DOMContentLoaded", () =>{
    inicializarApp(); //cargar aplicacion
    eventos(); //cargar eventos

     // Eventos de filtros tipo Netflix
        document.getElementById("inputBuscar").addEventListener("input", aplicarFiltros);

        document.getElementById("selectGenero").addEventListener("change", aplicarFiltros);
});


function inicializarApp(){
    //cargar usuarios registrados en localstorage
    cargarUsuariosRegistrados();

    //verificar si hay usuario logeado
    let userLogged = localStorage.getItem("usuarioLogueado");
    if(userLogged){
        usuarioActual = JSON.parse(userLogged);
        mostrarDashboard();
    }

    //cargar datos de peliculas  de ejemplo la primera vez
    if(!localStorage.getItem("peliculas")){
        cargarDatosEjemplos();
    }
}

function cargarUsuariosRegistrados(){
    //obtener usuarios de localstorage y agregarlos a la variable "usuarios"
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};
    if(usuariosRegistrados){
        Object.assign(usuarios, usuariosRegistrados);  
    }    
}
//===============EVENTOS DEL USUARIOS =====================//

function eventos(){
    //boton login
    document.querySelector("#formLogin").addEventListener("submit", login);
    //boton logout
    document.querySelector("#btnSalir").addEventListener("click", logout);
    //boton register
    document.querySelector("#formRegister").addEventListener("submit", register);
    //boton guardar
    document.querySelector("#btnGuardarPelicula").addEventListener("click", guardarPelicula);
}



function login(e){
    e.preventDefault();
    let user = document.querySelector("#inputUser").value;
    let password = document.querySelector("#inputPassword").value;

    if (usuarios[user] && usuarios[user]=== password){
        usuarioActual = user;
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));
        mostrarDashboard();
        document.querySelector("#formLogin").reset();
    }else{
        alert("El usuario y/o contraseña no son validos")
    }
}

function mostrarDashboard(){
    document.querySelector("#loginSection").style.display = "none";
    document.querySelector("#btnEntrar").style.display = "none";
    document.querySelector("#dashboard").style.display = "block";
    document.querySelector("#btnSalir").style.display = "block";
    document.querySelector(".userLogged").textContent = usuarioActual;

    //cargar pelicula
    cargarPeliculas();
}

function mostrarLogin(){
    document.querySelector("#loginSection").style.display = "flex";
    document.querySelector("#btnEntrar").style.display = "block";
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#btnSalir").style.display = "none";
}

function logout(){
    let confirmar = confirm("Desea cerrar seccion?");
    if (confirmar){
        usuarioActual = null;
        localStorage.removeItem("usuarioLogueado");
        mostrarLogin();
        document.querySelector("#formLogin").reset();
    }
}

function register(e){
    e.preventDefault();
    let nombre = document.querySelector("#inputNombre").value.trim();
    let email = document.querySelector("#inputEmail").value.trim();
    let usuario = document.querySelector("#inputUserReg").value.trim();
    let password = document.querySelector("#inputPasswordReg").value.trim();
    let confirmPassword = document.querySelector("#inputConfirmPassword").value.trim();

    if(nombre && email && usuario && password && confirmPassword){
        usuarios[usuario] = password; //agregar usuario a la lista
        //verificar si el usuario existe
        if(usuarios[usuario]){
            alert("El usuario ya existe por favor elige otro");
            return;
        }
        //guardar en localstorage
        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};
        usuariosRegistrados[usuario] = password;
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

        //exito
        alert("Usuario "+ usuario +" registrado con exito ✅, inicia sesion")

        //limpiar formulario de registro
        document.querySelector("#formRegister").reset();
        document.querySelector("#login-tab").click();
        return;

    }else{
        alert("Por favor completa todos los campos");
        return;
    }if(usuario.length < 4){
        alert("El usuario debe contener minimo 4 caracteres");
        return;
    }if(password.length < 6){
        alert("El password debe contener minimo 6 caracteres");
        return;
    }if(password !== confirmPassword){
        alert("Las contraseñas no coinciden");
        return;
    }
}

/*PELICULAS DE EJEMPLOS*/

function cargarDatosEjemplos(){
    let peliculasEjemplos = [
        {
            id: 1,
            titulo: "Terminator 2: El juicio final",
            genero: "Ciencia ficcion",
            director: "Cameron Diaz",
            ano: 1991,
            calificacion: 9.0,
            descripcion: "La historia se sitúa en 1995, once años después de los eventos de la primera película. Sarah Connor, madre de John Connor, está recluida en un psiquiátrico debido a sus advertencias sobre el futuro dominado por las máquinas. John, ahora un niño de diez años, vive con una familia adoptiva en Los Ángeles, mientras es entrenado por su madre en tácticas de supervivencia para prepararlo como el líder de la resistencia humana contra Skynet, la inteligencia artificial que busca exterminar a la humanidad.",
            imagen: "https://originalvintagemovieposters.com/wp-content/uploads/2021/06/Terminator-2-5942-scaled-1379x2048.jpg",
            fecha: new Date()
        },

        {
            id: 2,
            titulo: "The dark knight",
            genero: "Ciencia ficcion",
            director: "Chistopher Nola",
            ano: 2018,
            calificacion: 9.0,
            descripcion: "Batman en su lucha contra el crimen organizado en Gotham junto al teniente Gordon y el fiscal Harvey Dent. La alianza se desmorona cuando el Joker (Heath Ledger) sume a la ciudad en el caos, desafiando la moral del héroe y convirtiendo a Dent en el villano Dos Caras. ",
            imagen: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
            fecha: new Date()
        },

        {
            id: 3,
            titulo: "Volver al futuro",
            genero: "Ciencia ficcion",
            director: "Robert Zemeckis",
            ano: 1985,
            calificacion: 9.0,
            descripcion: "El adolescente Marty McFly es amigo de Doc, un científico que ha construido una máquina del tiempo. Cuando los dos prueban el artefacto, un error fortuito hace que Marty llegue a 1955, año en el que sus padres iban al instituto y todavía no se habían conocido. Después de impedir su primer encuentro, Marty deberá conseguir que se conozcan y se enamoren, de lo contrario su existencia no sería posible",
            imagen: "https://www.eldiario.net/portal/wp-content/uploads/2025/11/VOLVER-AL-FUTURO-1985-Animacion.webp",
            fecha: new Date()
        }
    ];

    //guardar en localstorage
    localStorage.setItem("peliculas", JSON.stringify(peliculasEjemplos));
}

//====================Cargar peliculas de ejemplos=======================//
function cargarPeliculas(){
    let peliculas = localStorage.getItem("peliculas");
    peliculasGlobales = peliculas ? JSON.parse(peliculas) : [];
    
    //mostrar en el grid las peliculas
    renderizarGrid(peliculasGlobales);
    renderizarSlider();
    iniciarSliderAutomatico();
}

//==================== renderizar peliculas =======================//
function renderizarGrid(pelis){
    let grid = document.querySelector("#gridPeliculas");
    let sinResultados = document.querySelector("#sinResultados");

    if(pelis.length === 0){
        grid.innerHTML = "";
        sinResultados.style.display = "block";
        return;
    }

    sinResultados.style.display = "none";
    grid.innerHTML = pelis.map( p => 
        `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="movie-card">
                    <img src="${p.imagen}" class="movie-imagen" onerror="this.src='https://www.shutterstock.com/image-vector/simple-image-placeholder-picture-minimalist-260nw-2679706831.jpg'">
                        <div class="movie-content">
                            <h5 class="movie-title">${p.titulo}</h5>
                            <span class="movie-genero">${p.genero}</span>
                            <div class="movie-meta"><b>${p.ano}</b> - ${p.director}</div> 
                            <div class="movie-rating"> ⭐ ${p.calificacion}/10 </div>
                            <div class="movie-descripcion"> ${p.descripcion} </div>
                            <div class="movie-actions">
                                <button class="btn btn-info" onclick="verDetalle(${p.id})"><i class="bi bi-eye"></i> Detalle</button>
                                <button class="btn btn-warning" onclick="editarPelicula(${p.id})"><i class="bi bi-pencil"></i> Editar</button>
                                <button class="btn btn-danger" onclick="eliminarPelicula(${p.id})"><i class="bi bi-trash"></i> Eliminar</button>
                            </div>    
                        </div>
                </div>
            </div>
        `
    ).join("");
}

//Agregar o Editar Peliculas
function guardarPelicula(){
    //obtener los datos del formulario
    let titulo = document.querySelector("#inputTitulo").value;
    let genero = document.querySelector("#inputGenero").value;
    let director = document.querySelector("#inputDirector").value;
    let ano = document.querySelector("#inputAno").value;
    let calificacion = document.querySelector("#inputCalificacion").value;
    let descripcion = document.querySelector("#inputSinopsis").value;
    let imagen = document.querySelector("#inputImagen").value;

    //validar si estamos editando o agregando una nueva pelicula

    if(peliculaEdicion){
        //editando pelicula
        
            peliculaEdicion.titulo = titulo;
            peliculaEdicion.genero = genero;
            peliculaEdicion.director = director;
            peliculaEdicion.ano = ano;
            peliculaEdicion.calificacion = calificacion;
            peliculaEdicion.descripcion = descripcion;
            peliculaEdicion.imagen = imagen;
        
            localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
        
            alert("Película actualizada correctamente ✅");
        
            peliculaEdicion = null;
        
            // Cambiar título del modal nuevamente
            document.querySelector("#modalAddLabel").textContent = "Agregar Pelicula";
        
            cargarPeliculas();
        
            // Cerrar modal
            let modal = bootstrap.Modal.getInstance(document.querySelector("#modalAdd"));
            modal.hide();
        
    }else{
        //agregando una nueva pelicula
            //crear objeto para guarda los datos de la nueva pelicula
            let nuevaPelicula = {
                id: peliculasGlobales.length > 0 
                ? Math.max(...peliculasGlobales.map(p => p.id)) + 1 
                : 4,
                titulo, genero, director, ano, calificacion, descripcion, imagen, 
                fecha: new Date()
            }
            //agregar pelicula a la lista de peliculas
            peliculasGlobales.unshift(nuevaPelicula);
            alert("Pelicula agregada exitosamente ✅");

            //agregar pelicula a localstorage
            localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
            peliculaEdicion = null; //limpiar variable de edicion

            //agregar pelicula en el dashboard
            cargarPeliculas();
    }
}

//

function editarPelicula( id ){
    //encontrar la pelicula para editarla
    let pelicula = peliculasGlobales.find((p)=> p.id === id);

    //si se encontro pelicula llenamos el formulario
    if( pelicula ){
        peliculaEdicion = pelicula; //actulizar la variable global
        //llenar los campos del formulario
        document.querySelector("#inputTitulo").value = pelicula.titulo;
        document.querySelector("#inputGenero").value = pelicula.genero;
        document.querySelector("#inputDirector").value = pelicula.director;
        document.querySelector("#inputAno").value = pelicula.ano;
        document.querySelector("#inputCalificacion").value = pelicula.calificacion;
        document.querySelector("#inputSinopsis").value = pelicula.descripcion;
        document.querySelector("#inputImagen").value = pelicula.imagen;

        //cambiar titulo del modal
        document.querySelector("#modalAddLabel").textContent = "Editar Pelicula";

        //mostral modal
        let modal = new bootstrap.Modal(document.querySelector("#modalAdd"));
        modal.show();
    }

}

//eliminar pelicula
function eliminarPelicula( id ){
    //confirmar si desea eliminar la pelicula
    let confirmar = confirm("Deseas eliminar esta pelicula?");
    if( confirmar ){
        //buscar o filtrar las peliculas que no tengan el id
        peliculasGlobales = peliculasGlobales.filter((p)=> p.id !== id);

        //guardar las peliculas restantes en localstorage
        localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
        //actulaizar el dashboard
        cargarPeliculas();
        //mostrar confirmacion de eliminacion
        alert("Pelicula eliminada con exito 👌");
    }
}

//Mostrar detalle de la pelicula
function verDetalle( id ){
    //encontrar la pelicula para mostra los detalles
    let pelicula = peliculasGlobales.find((p)=> p.id === id);

    //si la encontro
    if( pelicula){
        document.querySelector("#detallesTitulo").textContent = pelicula.titulo;
        document.querySelector("#detallesGenero").textContent = pelicula.genero;
        document.querySelector("#detallesDirector").textContent = pelicula.director;
        document.querySelector("#detallesAno").textContent = pelicula.ano;
        document.querySelector("#detallesCalificacion").textContent = pelicula.calificacion;
        document.querySelector("#detallesDescripcion").textContent = pelicula.descripcion;
        document.querySelector("#detallesImagen").src = pelicula.imagen;

        //mostral modal
        let modal = new bootstrap.Modal(document.querySelector("#modalDetalle"));
        modal.show();
    }
}

//funcion para renderizar slider o carrusel
let indiceActual = 0;

function renderizarSlider(){
    let carrusel = document.querySelector("#carruselMovies");
    carrusel.innerHTML = "";

    if(peliculasGlobales.length === 0) return;

    let pelicula = peliculasGlobales[indiceActual];

    carrusel.innerHTML = `
        <div class="slider-single">
            <img src="${pelicula.imagen}" 
            onerror="this.src='https://www.shutterstock.com/image-vector/simple-image-placeholder-picture-minimalist-260nw-2679706831.jpg'">
            <div class="slider-movie-info">
                <h5>${pelicula.titulo}</h5>
                <small>${pelicula.ano}</small>
            </div>
        </div>
    `;
}

//movimiento del scroll
let intervaloSlider;

function iniciarSliderAutomatico(){

    if(intervaloSlider){
        clearInterval(intervaloSlider);
    }

    intervaloSlider = setInterval(()=>{

        indiceActual++;

        if(indiceActual >= peliculasGlobales.length){
            indiceActual = 0;
        }

        renderizarSlider();

    }, 5000);
}

function buscarPeliculas(texto){

    let filtradas = peliculasGlobales.filter(pelicula =>
        pelicula.titulo.toLowerCase().includes(texto.toLowerCase())
    );

    renderizarGrid(filtradas); // 👈 aquí estaba el error

    document.querySelector("#carruselMovies").style.display =
        texto.trim() !== "" ? "none" : "block";
}

function aplicarFiltros(){

    let texto = document.getElementById("inputBuscar").value.toLowerCase();
    let genero = document.getElementById("selectGenero").value;

    let filtradas = peliculasGlobales.filter(pelicula => {

        let coincideTexto =
            pelicula.titulo.toLowerCase().includes(texto) ||
            pelicula.director.toLowerCase().includes(texto);

        let coincideGenero =
            genero === "" || pelicula.genero === genero;

        return coincideTexto && coincideGenero;
    });

    renderizarGrid(filtradas);

    // Ocultar slider si hay filtros activos
    document.querySelector("#carruselMovies").style.display =
        (texto !== "" || genero !== "") ? "none" : "block";
}
