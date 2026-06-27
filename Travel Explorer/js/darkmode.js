const boton = document.getElementById("modoOscuro");

boton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("tema","oscuro");

    }else{

        localStorage.setItem("tema","claro");

    }

});

window.onload = ()=>{

    let tema = localStorage.getItem("tema");

    if(tema==="oscuro"){

        document.body.classList.add("dark");

    }

}
const botonModo = document.getElementById("modoOscuro");

if (botonModo) {
    botonModo.addEventListener("click", cambiarModo);
}