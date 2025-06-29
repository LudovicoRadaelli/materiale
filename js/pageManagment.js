let select = document.querySelector('.select');
let selectedOption = select.querySelector('.selected-option');
let dropdown = select.querySelector('.dropdown');
let options = dropdown.querySelectorAll('.option');

//Richiamo il file json contenente l'indice delle dispense per creare il menù a discesa
fetch("../../capitoli.json")
  .then(response => response.json())
  .then(jsonContent => {

    //Leggo qual è il numero relativo al capitolo
    let chapterNumber = parseInt(document.querySelector("#chapterNumber").innerHTML);
    
    
    
    for(let i = 0; i < jsonContent["capitolo"][chapterNumber -1]["paragrafo"].length; i++) {
        //let paragraphNumber = jsonContent["capitolo"][chapterNumber -1]["paragrafo"][i]["numero"];
        let paragraphNumber = `${chapterNumber}.${i+1}`
        let paragraphTitle = jsonContent["capitolo"][chapterNumber -1]["paragrafo"][i]["titolo"];
        let nomeCartella = jsonContent["capitolo"][chapterNumber -1]["paragrafo"][i]["nomeCartella"]
        let a = document.createElement("a");
        a.className = "selectOption";
        a.href = `../${nomeCartella}/index.html`;
        a.innerHTML = `<code><b>${paragraphNumber}) ${paragraphTitle}</b></code>`
        dropdown.appendChild(a);
    }

    //assegno un numero al paragrafo a partire dalla sua posizione nella lista di paragrafi del file json
    let numberOfCurrentParagraph;
    let paragraphTitle = document.querySelector("#paragraphTitle").innerHTML;
    for(let i = 0; i < jsonContent["capitolo"][chapterNumber - 1]["paragrafo"].length; i++) {
        if(jsonContent["capitolo"][chapterNumber - 1]["paragrafo"][i]["titolo"] == paragraphTitle) {
            numberOfCurrentParagraph = i + 1;
            console.log(`hai aperto il paragrafo ${numberOfCurrentParagraph}`)
            break;
        }
    }

    //I prossimi comandi inseriscono titoli, titoletti e numerazione del paragrafo
    //La compilazione automatica si poggia unicamente sui i primi due div del file HTML che chiama lo script
    
    document.querySelector("#titleTag").innerHTML = `${chapterNumber}.${numberOfCurrentParagraph}) ${paragraphTitle}`;

    document.querySelector("#bTagTitoloCapitolo").innerHTML = `${jsonContent["capitolo"][chapterNumber -1]["titolo"]} /`;
    
    document.querySelector("#bTagTitoloParagrafo").innerHTML = `${chapterNumber}.${numberOfCurrentParagraph}) ${paragraphTitle}`;

    document.querySelector("#paragraphCircledNumber").innerHTML = `${chapterNumber}.${numberOfCurrentParagraph}`;

    document.querySelector("#h3ParagraphTitle").innerHTML = `${paragraphTitle}`;

    document.querySelector("#exParagraphNumber").innerHTML = `${chapterNumber}.${numberOfCurrentParagraph}`;

    
    

  })
  .catch(error => console.error("Errore durante il caricamento del file JSON:", error));


//Queste sono le istruzioni che gestiscono il menù a discesa
selectedOption.addEventListener('click', function() {
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});

document.addEventListener('click', function(event) {
    if (!select.contains(event.target)) {
    dropdown.style.display = 'none';
    }
});




function inserimentoNumerazione() {

    

    
}

//funzionamento dei tasti previous e next
function changeParagraph(direction) {
    fetch("../../capitoli.json")
        .then(response => response.json())
        .then(jsonContent => {

            //Leggo qual è il numero relativo al capitolo
            let chapterNumber = parseInt(document.querySelector("#chapterNumber").innerHTML);
            let paragraphNumber;
            let paragraphTitle = document.querySelector("#paragraphTitle").innerHTML;
            for(let i = 0; i < jsonContent["capitolo"][chapterNumber - 1]["paragrafo"].length; i++) {
                if(jsonContent["capitolo"][chapterNumber - 1]["paragrafo"][i]["titolo"] == paragraphTitle) {
                    paragraphNumber = i + 1;
                    console.log(`hai aperto il paragrafo ${paragraphNumber}`)
                    break;
                }
            }
            let nomeCartella;
            let totalNumberOfParagraphs = jsonContent["capitolo"][chapterNumber -1]["paragrafo"].length;
            console.log(`capitolo: ${chapterNumber-1}, paragrafo: ${paragraphNumber}`)
            if(direction === "next" && (paragraphNumber-1 + 1 < totalNumberOfParagraphs)) {
                nomeCartella = jsonContent["capitolo"][chapterNumber -1]["paragrafo"][paragraphNumber-1 + 1]["nomeCartella"];
                window.location.href = `../${nomeCartella}/index.html`
            } else if(direction === "previous" && (paragraphNumber-1 - 1 >= 0)) {
                nomeCartella = jsonContent["capitolo"][chapterNumber -1]["paragrafo"][paragraphNumber-1 -1]["nomeCartella"];
                window.location.href = `../${nomeCartella}/index.html`
            } 
            
            
        })
        .catch(error => console.error("Errore durante il caricamento del file JSON:", error));
}



function showExplanation() {
    let explanation = document.getElementsByClassName("explanation")[0];
    let explanationButton = document.getElementsByClassName("explanationButton")[0];
    let exercise = document.getElementsByClassName("exercise")[0];
    let exerciseButton = document.getElementsByClassName("exerciseButton")[0];

    exercise.style.display = "none";
    exerciseButton.style.borderColor = "lightgray"

    explanation.style.display = "block";
    explanationButton.style.borderColor = "blue"
}

function showExercise() {
    let explanation = document.getElementsByClassName("explanation")[0];
    let explanationButton = document.getElementsByClassName("explanationButton")[0];
    let exercise = document.getElementsByClassName("exercise")[0];
    let exerciseButton = document.getElementsByClassName("exerciseButton")[0];

    exercise.style.display = "block";
    exerciseButton.style.borderColor = "blue"

    explanation.style.display = "none";
    explanationButton.style.borderColor = "lightgray"

}