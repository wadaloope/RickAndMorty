let pageNum = 1;
let total = 0;
let genero = null;
let container = document.getElementById("container");
let botonAnt = document.getElementById("boton1");
let botonSig = document.getElementById("boton2");
let botonPrimera = document.getElementById("boton1st");
let botonUltima = document.getElementById("botonlast");
let botonInformacion = "";
let botonFin = document.getElementById("nav-last");
let manButton = document.getElementById("maleButton");
let womanButton = document.getElementById("femaleButton");
let genlessButton = document.getElementById("gennyButton");
let unkButton = document.getElementById("dkButton");

const getCharacters = (pageNum) => {
    fetch(`https://rickandmortyapi.com/api/character?page=${pageNum}`).then((response) => {
        //resolve
        console.log('resolved', response);
        const parseo = response.json(); //parsea la informacion pero devuelve una promesa
        return parseo;
    }).then(data => {
        total = data.info.pages;
        if (data.info.next === null) { botonSig.setAttribute("disabled", true); botonUltima.setAttribute("disabled", true) };
        if (data.info.prev === null) { botonAnt.setAttribute("disabled", true); botonPrimera.setAttribute("disabled", true) };
        renderPage(data.results);
        // aqui cargaria la info parseada en un super vector en un array de objetos showsCharacters
    }).catch((err) => {
        //reject
        console.log('rejected', err);
    });
}

const getCharGen = (charGen, pageNum) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pageNum}&gender=${charGen}`).then((response) => {
        //resolve
        console.log('resolved', response);
        const parseo = response.json(); //parsea la informacion pero devuelve una promesa
        return parseo;
    }).then(data => {
        total = data.info.pages;
        if (data.info.next === null) { botonSig.setAttribute("disabled", true); botonUltima.setAttribute("disabled", true) };
        if (data.info.prev === null) { botonAnt.setAttribute("disabled", true); botonPrimera.setAttribute("disabled", true) };
        renderPage(data.results);
        // aqui cargaria la info parseada en un super vector en un array de objetos showsCharacters
    }).catch((err) => {
        //reject
        console.log('rejected', err);
    });
}

getCharacters();
const renderPage = (showsCharacters) => {
    container.innerHTML = ''; //limpiando el contenido de pagina anterior
    showsCharacters.forEach((character) => {
        container.innerHTML += `<div class="card" style="border-radius: 15px; background-color: rgba(255, 255, 255, 0.281); height: 325px; width: 210px">
            <img src= ${character.image} alt="" style="width: 200px; border-radius: 15px; margin-top: 10px">
            <h2 style="-webkit-text-stroke-width: 1px;-webkit-text-stroke-color: rgb(4, 43, 3)">${character.name}</h2>
            <button class="button" id="butto${character.id}"style="width: 175px; border-radius: 15px; background-color: rgba(5, 5, 65, 0.514);color: rgb(145, 255, 0); font-weight: 200">Mas informacion</button>
            </div>`;
        // clickear()
    })
    showsCharacters.forEach((character) => {
        botonInformacion = document.getElementById(`butto${character.id}`);
        botonInformacion.addEventListener("click", () => {
            renderizarModal(botonInformacion, character);
        })
        const renderizarModal = (botonInformacion, character) => {
            const modal = document.getElementById('modal');
            modal.innerHTML = `<div class="content" id="contenidoPopup" style="size: inherit; max-width: 291px; padding: 10px; display:flex ;flex-direction: column; justify-content: center">
            <h2 style="color: rgb(145, 255, 0);-webkit-text-stroke-width: 1px;-webkit-text-stroke-color: rgb(4, 43, 3)">${character.name}</h2>
            <img src= ${character.image} alt="" style="display:block; width: 200px; border-radius: 15px; margin-top: 10px">    
            <ul style="color: rgb(145, 255, 0); font-weight: 200; margin:10px">
            <li>Genero: ${character.gender}</h3>
            <li>Especie: ${character.species}</li>
            <li>Estado: ${character.status}</li>
            <li>Origen: ${character.origin.name}</li>
            <li>Ubicacion: ${character.location.name}</li>
            </ul>
            <button class="close-button" style="width: 175px; border-radius: 15px; background-color: rgba(5, 5, 65, 0.514);color: rgb(145, 255, 0); font-weight: 200">Cerrar</button>
            </div>`
            modal.showModal();
            const closeModal = document.querySelector('.close-button');
            closeModal.addEventListener('click', () => {
                modal.close();
            })
        }

    })


}

manButton.addEventListener("click", () => {
    pageNum = 1;
    genero = "male";
    total = 0;
    botonSig.removeAttribute("disabled", true);
    botonUltima.removeAttribute("disabled", true);
    getCharGen(genero, pageNum);
})

womanButton.addEventListener("click", () => {
    pageNum = 1;
    genero = "female";
    total = 0;
    botonSig.removeAttribute("disabled", true);
    botonUltima.removeAttribute("disabled", true);
    getCharGen(genero, pageNum);
})

genlessButton.addEventListener("click", () => {
    pageNum = 1;
    genero = "genderless";
    total = 0;
    botonSig.removeAttribute("disabled", true);
    botonUltima.removeAttribute("disabled", true);
    getCharGen(genero, pageNum);
})

unkButton.addEventListener("click", () => {
    pageNum = 1;
    genero = "unknown";
    total = 0;
    botonSig.removeAttribute("disabled", true);
    botonUltima.removeAttribute("disabled", true);
    getCharGen(genero, pageNum);
})

botonAnt.addEventListener("click", () => {
    pageNum -= 1;
    botonSig.removeAttribute("disabled", true);
    botonUltima.removeAttribute("disabled", true);
    if (genero != null) { getCharGen(genero, pageNum) }
    else { getCharacters(pageNum) }
})

botonSig.addEventListener("click", () => {
    pageNum += 1;
    botonAnt.removeAttribute("disabled", true);
    botonPrimera.removeAttribute("disabled", true);
    if (genero != null) { getCharGen(genero, pageNum) }
    else { getCharacters(pageNum) }
})

botonPrimera.addEventListener("click", () => {
    pageNum = 1;
    botonSig.removeAttribute("disabled", true);
    botonUltima.removeAttribute("disabled", true);
    botonAnt.setAttribute("disabled", true);
    botonPrimera.setAttribute("disabled", true);
    if (genero != null) { getCharGen(genero, pageNum) }
    else { getCharacters(1) }
})

botonUltima.addEventListener("click", () => {
    pageNum =total;
    botonAnt.removeAttribute("disabled", true);
    botonPrimera.removeAttribute("disabled", true);
    botonUltima.setAttribute("disabled", true);
    botonSig.setAttribute("disabled", true);
    if (genero != null) { getCharGen(genero, pageNum) }
    else { getCharacters(total) }
})

botonFin.addEventListener("click", () => {
    pageNum=total;
    botonAnt.removeAttribute("disabled", true);
    botonPrimera.removeAttribute("disabled", true);
    botonUltima.setAttribute("disabled", true);
    botonSig.setAttribute("disabled", true);
    if (genero != null) { getCharGen(genero, pageNum) }
    else { getCharacters(total) }
})