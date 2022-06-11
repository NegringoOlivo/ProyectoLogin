//Logica del proyecto Login


const loadInitialTemplate = () => {
    const template = `
    <div>
    <h1>Animales Registrados</h1>
    <form id="animal-form">
        <div>
            <label>Nombre:</label>
            <input name="nombre">
        </div>
        <div>
            <label>Tipo:</label>
            <input name="tipo">
        </div>
        <button type="submit">Enviar</button>
    </form>
    <ul id="animal-list"></ul>
</div>
`
const body = document.getElementsByTagName("body")[0];
body.innerHTML = template;
} 
//Funcion para crear animales en la base de datos.
const addFormListener = () => {
    const animalForm  = document.getElementById("animal-form");
    animalForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(animalForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        await fetch("/animal", {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }      
        })
        animalForm.reset();
        getAnimals();
    }
}
//Obtiene animales (Elementos) de la base de datos
const getAnimals = async () => {
    const response = await fetch("/animals", {
        headers:{
            Authorization: localStorage.getItem('jwt')
        }
    });
    const animals = await response.json();
    console.log(animals);
    const template = animalL =>
        `
        <li>
           ${animalL.nombre} ${animalL.tipo}  <button data-id="${animalL_id}">Eliminar</button>
        </li>
    `
    const animalList = document.getElementById("animal-list");
    animalList.innerHTML = animals.map(animal => template(animal)).join("");
    animals.forEach(animal => {
        const userNode = document.querySelector(`[data-id="${animal._id}"]`);
        userNode.onclick = async (e) => {
            await fetch(`/animal/${animal._id}`,{
                method: "DELETE",
            })
            userNode.parentNode.remove();
            alert("Eliminado con exito");
        }

    })
    }


const checkLogin = () => localStorage.getItem("jwt");

//Función pagina de login
const loginPage = () => {
    loadLoginTemplate();
    addLoginListener();
    gotoRegisterListener();
}

//funcion para cargar la pantalla de registro
const loadRegisterTemplate = () => {
    const template = `
    <div>
    <h1>Registro</h1>
    <form id="register-form">
        <div>
            <label>Correo:</label>
            <input name="email">
        </div>
        <div>
            <label>Contraseña:</label>
            <input name="password">
        </div>
        <button type="submit">Enviar</button>
    </form>
    <a href="#" id="login">Iniciar Sesión</a>
    <div id="error"></div>
</div>
`
const body = document.getElementsByTagName("body")[0];
body.innerHTML = template;
}

//Función para agregar registro de usuarios
const addRegisterListener = () => {
    const registerForm = document.getElementById("register-form");
    registerForm.onsubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const responseData = await response.text();
        console.log(response.status);
        if(response.status >= 300){
            const errorNode = document.getElementById("error");
            errorNode.innerHTML = responseData;
        }else{
            localStorage.setItem('jwt', `Bearer ${responseData}`);
            animalPage();
        }

    }
}
const gotoLoginListener = () => {}

//Función mostrar pagina de registro
const registerPage = () =>{
    console.log("Pagina de registro");
    loadRegisterTemplate();
    addRegisterListener();
    gotoLoginListener();
} 

//función pagina de animales
const animalPage = () =>{
    loadInitialTemplate();
    addFormListener();
    getAnimals();
} 

//Carga la pagina de inicio de sesión (login)
const loadLoginTemplate = () => {
    const template = `
    <div>
    <h1>Login</h1>
    <form id="login-form">
        <div>
            <label>Correo:</label>
            <input name="email">
        </div>
        <div>
            <label>Contraseña:</label>
            <input name="password">
        </div>
        <button type="submit">Enviar</button>
    </form>
    <a href="#" id="register">Registrarse</a>
    <div id="error"></div>
</div>
`
const body = document.getElementsByTagName("body")[0];
body.innerHTML = template;
}

const gotoRegisterListener = () =>{
    const gotoRegister = document.getElementById("register");
    gotoRegister.onclick = (e) =>{
        e.preventDefault();
        registerPage();
    }
}


//función agregar usuarios para login
const addLoginListener = () =>{
    const loginForm = document.getElementById("login-form");
    loginForm.onsubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const responseData = await response.text();
        console.log(response.status);
        if(response.status >= 300){
            const errorNode = document.getElementById("error");
            errorNode.innerHTML = responseData;
        }else{
            console.log(responseData);
        }

    }
}

//función principal para iniciar a correr la app
window.onload = () => { // variable window is a global object, for after load method onload
    const isLoggedIn = checkLogin();
    if(isLoggedIn){
        animalPage();
    }else{
        loginPage();
    }
}