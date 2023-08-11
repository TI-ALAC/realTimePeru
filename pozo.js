var content = document.getElementById('contenido');
var content2 = document.getElementById('contenido2');
var content3 = document.getElementById('contenido3');
var content4 = document.getElementById('contenido4');
var content5 = document.getElementById('contenido5');
var content6 = document.getElementById('contenido6');
var content7 = document.getElementById('contenido7');
var dat = document.getElementById('date');
var datef = document.getElementById('datef');
var millon = document.getElementById('millones');
var title = document.getElementById('title1');
var Unidad = document.getElementById('pozoUnidad');

const URL = window.location.href;
const split = URL.split("/?");
const idPanelSplit = split[1].split("id=")
const provinceSplit = split[2].split("province=")
const idPanel = idPanelSplit[1]
const province = provinceSplit[1]


const fecha = new Date();
const dateEs = fecha.toLocaleTimeString('es-ES');
const palabras = dateEs.split(":");

if (palabras[0] < 18) {
  document.getElementById("img-province-lluvia").src = "img/" + province + "/Dia/Lluvia.jpg"
  document.getElementById("img-province-sol").src = "img/" + province + "/Dia/Sol.jpg"
  document.getElementById("img-province-soleadolluvia").src = "img/" + province + "/Dia/Soleadolluvia.jpg"
  document.getElementById("img-province-templado").src = "img/" + province + "/Dia/Templado.jpg"
  document.getElementById("img-province-trueno").src = "img/" + province + "/Dia/Trueno.jpg"

} else {
  document.getElementById("img-province-lluvia").src = "img/" + province + "/Noche/Lluvia.jpg"
  document.getElementById("img-province-templado").src = "img/" + province + "/Noche/Templado.jpg"
  document.getElementById("img-province-trueno").src = "img/" + province + "/Noche/Trueno.jpg"
}

async function init() {
  const coord = await axios.get(`https://apialacplayer.alacoohperu.pe/playlist/panel/${idPanel}`);
  var latitud = coord.data.data[0].point.coordinates[0];
  var longitud = coord.data.data[0].point.coordinates[1];
  const response = await axios.get(`https://weatherstation.alacoohperu.pe/api/clima/${latitud}/${longitud}`);
  const text_clima = response.data.data.weather[0].description;
  const datatemp = response.data.data.main.temp.toFixed(0);
  const result = datatemp.toString();
  const fecha = new Date();
  const dateEs = fecha.toLocaleTimeString('es-ES');
  const palabras = dateEs.split(":");
  const palabraDia = palabras[0] + ":" + palabras[1];
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateEss = fecha.toLocaleDateString('es-ES', options);
  const palabrass = dateEss.split(",");
  const palabraDias = palabrass[0][0].toUpperCase() + palabrass[0].substr(1);
  const palabrassplit = palabrass[1].split("de");
  const trim = palabrassplit[1].trim()
  const test = trim[0].toUpperCase() + trim.substring(1);
  console.log(test)
  const unir = palabraDias + "" + palabrassplit[0] + "de " + test + palabrassplit[2]; 
  console.log(unir)
  datef.innerHTML = unir;
  dat.innerHTML = palabraDia;
  title.innerHTML = result + '°';

  if (text_clima == 'lluvia ligera' || text_clima == 'lluvia moderada') {
    content.style.display = "block";
    content6.style.display = "block";
    setTimeout(() => {
      content7.style.display = "none";
    }, 4500);
    setTimeout(() => {
      content.style.display = "none";
      content6.style.display = "none";
      content7.style.display = "block";
    }, 7500);
  } else if (text_clima == 'cielo claro' || text_clima == 'algo de nubes' || text_clima == 'nubes dispersas') {
    content2.style.display = "block";
    content6.style.display = "block";
    setTimeout(() => {
      content7.style.display = "none";
    }, 4500);
    setTimeout(() => {
      content2.style.display = "none";
      content6.style.display = "none";
      content7.style.display = "block";
    }, 117500);
  } else if (text_clima == 'soleado con lluvia') {
    content3.style.display = "block";
    content6.style.display = "block";
    setTimeout(() => {
      content7.style.display = "none";
    }, 4500);
    setTimeout(() => {
      content3.style.display = "none";
      content6.style.display = "none";
      content7.style.display = "block";
    }, 7500);
  } else if (text_clima == 'niebla' || text_clima == 'muy nuboso' || text_clima == 'nubes' || text_clima == 'bruma') {
    content4.style.display = "block";
    content6.style.display = "block";
    setTimeout(() => {
      content7.style.display = "none";
    }, 4500);
    setTimeout(() => {
      content4.style.display = "none";
      content6.style.display = "none";
      content7.style.display = "block";
    }, 117500);
  } else if (text_clima == 'tormenta con lluvia ligera' || text_clima == 'tormenta') {
    content5.style.display = "block";
    content6.style.display = "block";
    setTimeout(() => {
      content7.style.display = "none";
    }, 4500);
    setTimeout(() => {
      content5.style.display = "none";
      content6.style.display = "none";
      content7.style.display = "block";
    }, 7500);
  }

}

init();
