// =============================
// Travel Explorer
// Módulo: Países
// =============================

// Elementos del HTML
const txtPais = document.getElementById("txtPais");
const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

// Evento del botón
btnBuscar.addEventListener("click", buscarPais);

// También buscar al presionar Enter
txtPais.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        buscarPais();

    }

});

// =============================
// Función principal
// =============================

async function buscarPais(){

    // Obtener texto
    const pais = txtPais.value.trim();

    // Validación
    if(pais === ""){

        resultado.innerHTML = `

        <div class="alert alert-warning">

            Escribe el nombre de un país.

        </div>

        `;

        return;

    }

    try{

        // Mostrar mensaje mientras carga

        resultado.innerHTML = `

        <div class="text-center">

            <div class="spinner-border text-primary"></div>

            <p class="mt-3">Buscando información...</p>

        </div>

        `;

        // Consultar API

        const respuesta = await fetch(
    `https://restcountries.francocarballar.com/api/v1/name/${encodeURIComponent(pais)}`
);

        if(!respuesta.ok){

            throw new Error("País no encontrado");

        }

        const datos = await respuesta.json();

        mostrarPais(datos[0]);

    }

    catch(error){

        resultado.innerHTML = `

        <div class="alert alert-danger">

            No fue posible obtener la información.

        </div>

        `;

    }

}

// =============================
// Mostrar información
// =============================

function mostrarPais(pais){

    const nombre = pais.name.common;

    const oficial = pais.name.official;

    const capital = pais.capital ? pais.capital[0] : "No disponible";

    const continente = pais.region;

    const poblacion = pais.population.toLocaleString();

    const bandera = pais.flags?.png || "";

    const escudo = pais.coatOfArms?.png || "";

    const idiomas = pais.languages
        ? Object.values(pais.languages).join(", ")
        : "No disponible";

    const moneda = pais.currencies
        ? Object.values(pais.currencies)[0].name
        : "No disponible";

    const area = pais.area.toLocaleString();

    const mapa = pais.maps?.googleMaps || "#";

    resultado.innerHTML = `

<div class="card shadow-lg p-4">

    <div class="text-center">

        <img src="${bandera}"
             class="img-fluid mb-3"
             style="max-width:250px;">

        <h2>${nombre}</h2>

        <p class="text-muted">

            ${oficial}

        </p>

    </div>

    <hr>

    <div class="row">

        <div class="col-md-6">

            <p><strong>Capital:</strong> ${capital}</p>

            <p><strong>Continente:</strong> ${continente}</p>

            <p><strong>Población:</strong> ${poblacion}</p>

            <p><strong>Idioma:</strong> ${idiomas}</p>

        </div>

        <div class="col-md-6">

            <p><strong>Moneda:</strong> ${moneda}</p>

            <p><strong>Área:</strong> ${area} km²</p>

            <p>

                <strong>Mapa:</strong>

                <a href="${mapa}"

                   target="_blank">

                   Ver ubicación

                </a>

            </p>

        </div>

    </div>

    ${escudo ? `

        <div class="text-center mt-4">

            <h5>Escudo Nacional</h5>

            <img src="${escudo}"

                 style="max-width:150px;">

        </div>

    ` : ""}

</div>

`;

}