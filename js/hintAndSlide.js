/* HTML Hint 
        <button id="hintAAAAAAAAAA-button" onclick="showHint(`AAAAAAAAAA`)">Svolgimento</button>
        <div id="hintAAAAAAAAAA" class="hint" style="display: none;">     
            <b class="gray">Svolgimento</b> 
        </div>
*/

/* HTML slide

    <div id="slide-containerAAAAAAAAAA" class="slide-container AAAAAAAAAA grayBorder">
        <div class="slideAAAAAAAAAA">
            
        </div>
    </div>
    <div style="display: flex; flex-direction:row; justify-content: space-evenly; align-items: center;">
        <button id="previousSlide-buttonAAAAAAAAAA" onclick="previousSlide(`AAAAAAAAAA`)">Indietro</button>
        <button id="nextSlide-buttonAAAAAAAAAA" onclick="nextSlide(`AAAAAAAAAA`)">Avanti</button>
    </div> 

*/


function showHint(i) {
    
    //creo un array con tutti gli elementi button della pagina
    listaButton = document.getElementsByTagName(`button`);

    //per ogni elemento button dell'array 
    listaButton.forEach(elm => {
        //se id="hint**********-button"         
        if(/^hint.{10}-button$/.test(elm.id)) {            
            //allora rendo visibile il button
            elm.style.display = "block";
            
            //ed invisibile l'hint relativo
            let hintID = elm.id.match(/^hint(.*)-button$/)[1]; //estraggo l'id del div da quello del button            
            document.getElementById(`hint${hintID}`).style.display = "none";  
        }
    });
    
    //rendo non visibile il button che è stato premuto
    document.getElementById(`hint${i}-button`).style.display = "none";
    //rendo visibile l'hint relativo
    document.getElementById(`hint${i}`).style.display = "block";
    document.location.href = `#hint${i}`    
}  

//in questa var inserisco la targa della raccolta di slide che sto scorrendo
let currentSlide;

//creo un array di oggetti che abbiano come attributi "element" l'elemento slide-container
//e come attributo "targa" il codice che li identifica e come attributo "slideIndex" l'indice 
//attuale della raccolta

let slideContainerList = [];
document.getElementsByClassName(`slide-container`).forEach(elm => {    
    slideContainerList.push({
        element: elm,
        targa: elm.className.match(/^slide-container (.{10}) grayBorder$/)[1],
        slideIndex: 0
    })
});


//inizializzo tutte le raccolte di slide presenti
slideContainerList.forEach(elm => {
    inizialize(elm.targa)    
});


//aggiungo la possibilità di scorrere le slide tramite frecce
document.addEventListener("keydown", (event) => {
    if(currentSlide !== 0) {
        if(event.key === "ArrowRight" && document.getElementById(`nextSlide-button${currentSlide}`).disabled === false) {
            nextSlide(currentSlide);            
        } else if(event.key === "ArrowLeft" && document.getElementById(`previousSlide-button${currentSlide}`).disabled === false) {
            previousSlide(currentSlide);
        }
    }
})


//funzione per passare alla slide successiva
function nextSlide(n) {

    ///Copio nella variabile obj l'oggetto che contiene l'elemento slide-container, la sua targa 
    //e slideIndex. IMPORTANTE: ogni modifica apportata ad obj viene effettuata anche sull'oggetto
    //originale
    let obj = slideContainerList.find(ob => ob.targa === n);         
    
    //una volta spinto il button registro qual è la targa associata alla raccolta di slide 
    //che sto scorrendo
    currentSlide = obj.targa;

    //ogni volta che il pulsante viene premuto scrollo in modo da centrare le slide
    document.location.href=`#slide-container${obj.targa}`
    
    //Creo un array con tutte le slide contraddistinte dalla targa n
    let slide = document.getElementsByClassName(`slide${obj.targa}`)
    
    //nascondo tutte le slide
    for(let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
    }

    //aggiorno l'indice
    obj.slideIndex++;    

    //se dopo essere stato aggiornato l'indice corrente è diverso da 0
    if(obj.slideIndex !== 0 ) {
        //abilito il pulsante previous 
        document.getElementById(`previousSlide-button${obj.targa}`).disabled = false;
    }

    //se ci sono ancora slide da mostrare 
    if(obj.slideIndex < slide.length) {
        //rendo visibile la successiva
        slide[obj.slideIndex].style.display = "block";
    }

    //se le slide da mostrare sono finite. 
    if(obj.slideIndex  === slide.length -1) {
        //rendo nuovamente visibile l'ultima slide (altimenti sparisce)    
        slide[slide.length-1].style.display = "block";
        //e scrollo la vista al riquadro conclusiovo
        document.getElementById(`nextSlide-button${obj.targa}`).disabled = true;  
    }

}
    
//funzione per passare alla slide successiva
function previousSlide(n) {

    ///Copio nella variabile obj l'oggetto che contiene l'elemento slide-container, la sua targa 
    //e slideIndex. IMPORTANTE: ogni modifica apportata ad obj viene effettuata anche sull'oggetto
    //originale
    let obj = slideContainerList.find(ob => ob.targa === n); 

    //una volta spinto il button registro qual è la targa associata alla raccolta di slide 
    //che sto scorrendo
    currentSlide = obj.targa;

    //ogni volta che il pulsante viene premuto scrollo in modo da centrare le slide
    document.location.href=`#slide-container${obj.targa}`
    
    //Creo un array con tutte le slide contraddistinte dalla targa n
    let slide = document.getElementsByClassName(`slide${obj.targa}`)
    
    //nascondo tutte le slide
    for(let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
    }

    //aggiorno l'indice
    obj.slideIndex--;


    //visualizzo la precedente. 
    slide[obj.slideIndex].style.display = "block";
    
    //se è la prima slide 
    if(obj.slideIndex === 0) {
        //disattivo il tasto previous
        document.getElementById(`previousSlide-button${obj.targa}`).disabled = true;        
    } 

    //nel caso in cui il pulsante next sia disabilitato 
    if(document.getElementById(`nextSlide-button${obj.targa}`).disabled === true) {
        //lo riattivo
        document.getElementById(`nextSlide-button${obj.targa}`).disabled = false;  
    }
}


function inizialize(n) {

    ///Copio nella variabile obj l'oggetto che contiene l'elemento slide-container, la sua targa 
    //e slideIndex. IMPORTANTE: ogni modifica apportata ad obj viene effettuata anche sull'oggetto
    //originale
    let obj = slideContainerList.find(ob => ob.targa === n);            

    //imposto a 0 l'indice corrente della raccolta di slide 
    //contraddistinte dalla targa n 
    obj.slideIndex = 0;
    
    //Creo un array con tutte le slide contraddistinte dalla targa n
    let slide = document.getElementsByClassName(`slide${obj.targa}`)

    //rendo non visibili le slide della raccolta
    for(let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none"
    }

    //rendo visibile la prima slide
    slide[0].style.display = "block"

    //pulsante next disabled
    document.getElementById(`nextSlide-button${obj.targa}`).disabled = false;

    //pulsante previous disabled
    document.getElementById(`previousSlide-button${obj.targa}`).disabled = true;

}
