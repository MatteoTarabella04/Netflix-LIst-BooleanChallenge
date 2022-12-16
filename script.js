/* -------------------
OPERAZIONI PRELIMINARI
--------------------*/

// Storage
const STORAGE_KEY = '__serie-list__';

// Elementi
const totalSlot = document.querySelector('.total-slot');
const serieListElement = document.querySelector('.serie-list');

const form = document.querySelector('#serie-form');
const serieField = document.querySelector('#serie-field');
const epField = document.querySelector('#ep-field');

// Lista
let serieList = [];

// Controllo storage
const prevList = localStorage.getItem(STORAGE_KEY);

if (prevList) {
    serieList = JSON.parse(prevList);
    calculateTotal();
    renderList();
}

/* -----------------------
EVENTI DINAMICI
----------------------- */

// Form
form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const serieName = serieField.value.trim();
    const epNum = epField.value.trim();
  
    addSerie(serieName, epNum);

    form.reset();
  
    serieField.focus();
});


/* ------------------
FUNZIONI
------------------*/

// Serie
function addSerie(serieName, epNum) {
    const newSerie = {
      serieName,
      epNum: Number(epNum),
    };
  

    serieList.push(newSerie);
    console.log(serieList);
  
    // Update Storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serieList));
  
    calculateTotal();
  
    renderList()
}
  
  

function calculateTotal() {
    let total = 0;
  
    for (let i = 0; i < serieList.length; i++) {
      total += serieList[i].epNum;
    }
  
    totalSlot.innerText = total;
}
  
// Render
function renderList() {
    serieListElement.innerHTML = '';
  
    for (let i = 0; i < serieList.length; i++) {
      const serieElement = createListElement(i);
  
      serieListElement.innerHTML += serieElement;
    }
  
    setDoneButtons();
}
  
function createListElement(i) {
    const serie = serieList[i];
  
    return `
    <li class="serie">
        <div class="serie-info">
            <h3>${serie.serieName}</h3>
        </div>
        <strong class="ep-count">${serie.epNum}</strong>
        <button class="done-button data-index="${i}">Done 👍🏻</button>
    </li>
    `;
}
  
  
// Button Done
function setDoneButtons() {
    const doneButtons = document.querySelectorAll('.done-button');
  
    for (let i = 0; i < doneButtons.length; i++) {
      const button = doneButtons[i];
  
        button.addEventListener('click', function () {
        const index = button.dataset.index;
  
        removeSerie(index);
    })};
    
}
  
  
// Done
function removeSerie(index) {
    serieList.splice(index, 1);
    console.log(serieList);
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serieList));
  
    calculateTotal();

    renderList();
}