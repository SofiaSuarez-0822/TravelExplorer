if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(obtenerClima, errorUbicacion);

} else {

    alert("Tu navegador no soporta geolocalización.");

}

async function obtenerClima(posicion){

    const lat = posicion.coords.latitude;

    const lon = posicion.coords.longitude;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`;

    const respuesta = await fetch(url);

    const datos = await respuesta.json();
    document.getElementById("temperatura").innerHTML =
    datos.current.temperature_2m + " °C";
    
    document.getElementById("viento").innerHTML =
    datos.current.wind_speed_10m + " km/h";

    const ciudad = await fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
);

const lugar = await ciudad.json();

document.getElementById("ciudad").innerHTML =
lugar.address.city ||
lugar.address.town ||
lugar.address.village;

document.getElementById("estado").innerHTML =
obtenerEstado(datos.current.weather_code);

    console.log(datos);

}

function errorUbicacion(error) {

    console.log(error);

    alert("No se pudo obtener la ubicación.");

}

function obtenerEstado(codigo){

    if(codigo==0) return "☀ Soleado";

    if(codigo<=3) return "⛅ Parcialmente nublado";

    if(codigo<=48) return "☁ Nublado";

    if(codigo<=67) return "🌧 Lluvia";

    if(codigo<=77) return "❄ Nieve";

    return "🌦 Variable";

}

function errorUbicacion(){

    alert("No fue posible obtener tu ubicación.");

}