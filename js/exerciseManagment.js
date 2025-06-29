let numberOfTries = [0,0,0,0,0,0,0,0]

function enableSubmit(n) {
    //riallineo il numero della domanda con il suo indice nei vettori
    n = n - 1

    var questionBox = document.getElementsByClassName("questionBox")[n];
    var button = questionBox.getElementsByClassName("submit")[0];
    
    //non appena un'opzione viene selezionata abilito il tasto submit relativo
    button.disabled = false;            
}

function checkAnswer(n, type, rightAnswer, userAnswer, maxNumberOfTries) {
    //riallineo il numero della domanda con il suo indice nei vettorri
    n = n - 1;

    if(type === "rispostaUnica") {

        var questionBox = document.getElementsByClassName("questionBox")[n];
        let radioButton = questionBox.getElementsByClassName("radioButton")

        numberOfTries[n]++;

        //scorro tutti gli input della classe radioButton relativi alla domanda 
        //non appena individuo quello selezionato, ne registro il valore nel vettore userAnswer
        for(let i = 0; i < radioButton.length; i++) {
            if(radioButton[i].checked === true) {
                userAnswer = radioButton[i].value;
            }
        }

        if(userAnswer == rightAnswer) {
            //se la risposta è corretta inspessisco il riquadro e lo coloro di verde 
            questionBox.getElementsByClassName("option")[userAnswer - 1].style.borderColor = "rgb(0, 249, 0)"
            questionBox.getElementsByClassName("option")[userAnswer - 1].style.borderWidth = "0.2rem"
        } else {
            //se la risposta è sbagliata inspessisco il riquadro e lo coloro di rosso
            questionBox.getElementsByClassName("option")[userAnswer - 1].style.borderColor = "red"
            questionBox.getElementsByClassName("option")[userAnswer - 1].style.borderWidth = "0.2rem"
        }

        //e faccio comparire il numero di tentativi usati
        questionBox.getElementsByClassName("numberOfTries")[0].style.display = "block"
        questionBox.getElementsByClassName("numberOfTries")[0].innerHTML = `Hai usato ${numberOfTries[n]} dei ${maxNumberOfTries} tentativi disponibili`

        //se sono stati esauriti i tentativi possibili oppure
        //è stata data la risposta corretta, do la possibilità di controllare la risposta
        //e disabilitio il pulsante submit
        if(numberOfTries[n] === maxNumberOfTries || userAnswer == rightAnswer) {
            questionBox.getElementsByClassName("showAnswer")[0].style.visibility = "visible"
            questionBox.getElementsByClassName("submit")[0].disabled = true;
        }

    }
    
    if(type === "rispostaMultipla") {


        let questionBox = document.getElementsByClassName("questionBox")[n];
        let checkboxButton = questionBox.getElementsByClassName("checkboxButton");
        let whyAnswerIsWrong = questionBox.getElementsByClassName(`whyAnswerIsWrong`)[0];
        let button = questionBox.getElementsByClassName("submit")[0];
        
        //questa variabile booleana mi permette di capire se c'è una risposta sbagliata tra quelle fornite dall'utente
        let allGivenAnswersAreRight = true;
        //questa variabile booleana mi permette di capire se l'utento non ha selezionato qualcuna delle riposte corrette
        let noAnswerMissing = true;
        //pulisco gli indizzi sul perché la riposta è sbagliata
        
        numberOfTries[n]++;
        whyAnswerIsWrong.innerHTML = ``;

        //scorro tutti gli input della classe checkboxButton relativi alla domanda 
        //non appena individuo quello selezionato, ne registro il valore nel vettore userAnswer
        for(let i = 0; i < checkboxButton.length; i++) {
            if(checkboxButton[i].checked === true) {
                userAnswer.push(checkboxButton[i].value);
            }
        }

        //gli elementi dell'array rightAnswer sono numeri, mentre quelli di userAnswer sono stringhe.
        //Per confrontarli trasformo le stringhe in numeri
        for(let i = 0; i < userAnswer.length; i++) {
            userAnswer[i] =  parseInt(userAnswer[i]);
        }

        console.log(`userAnswer:`);
        console.log(userAnswer);
        console.log(`rightAnswer`)
        console.log(rightAnswer)

        //se qualche elemento di userAnswer non è compreso in rightAnswer allora l'utente ha fornito almeno
        //una risposta sbagliata
        for(let i = 0; i < userAnswer.length; i++) {
            if(!rightAnswer.includes(userAnswer[i])) {
                allGivenAnswersAreRight = false;
                console.log(`allGivenAnswersAreRight, fallita la ${i}-esima iterazione`)
                break;
            }
        }

        //se qualche elemento di rightAnswer non è compreso in userAnswer allora l'utente non ha fornito
        //tutte le risposte corrette
        for(let i = 0; i < rightAnswer.length; i++) {
            if(!userAnswer.includes(rightAnswer[i])) {
                noAnswerMissing = false;
                console.log(`noAnswerMissing, fallita la ${i}-esima iterazione`)
                break;
            }
        }

        //se la risposta è corretta inspessisco il riquadro e lo coloro di verde, disabilito il pulsante submit 
        //e consento di controllare la risposta per esteso
        if(allGivenAnswersAreRight && noAnswerMissing) {
            for(let i = 0; i < userAnswer.length; i++) {
                questionBox.getElementsByClassName("option")[userAnswer[i] -1].style.borderColor = "rgb(0, 249, 0)";
                questionBox.getElementsByClassName("option")[userAnswer[i] -1].style.borderWidth = "0.2rem";
            }
            button.disabled = true;
            questionBox.getElementsByClassName("showAnswer")[0].style.visibility = "visible"
        }

        if(!allGivenAnswersAreRight) {
            whyAnswerIsWrong.innerHTML += `<br>❌ Almeno una delle opzioni selezionate non è corretta. `
        }

        if(!noAnswerMissing) {
            whyAnswerIsWrong.innerHTML += `<br>❌ Manca almeno una delle opzioni corrette`
        }


        //faccio comparire il numero di tentativi usati
        questionBox.getElementsByClassName("numberOfTries")[0].style.display = "block"
        questionBox.getElementsByClassName("numberOfTries")[0].innerHTML = `Hai usato ${numberOfTries[n]} dei ${maxNumberOfTries} tentativi disponibili`

        //se sono stati esauriti i tentativi possibili oppure do la possibilità di controllare la risposta
        //e disabilitio il pulsante submit
        if(numberOfTries[n] === maxNumberOfTries) {
            questionBox.getElementsByClassName("showAnswer")[0].style.visibility = "visible"
            questionBox.getElementsByClassName("submit")[0].disabled = true;
        }

        
        //pulisco il vettore userAnswer in modo che se l'utente dovesse effettuare un
        //altro tentativo il vettore non sia ancora pieno dei vecchi valori
        //ATTENZIONE L'array userAnswer subisce modifiche, quindi per controllare il numero di iterazioni devo registrarlo 
        //prima in una variabile
        let numberOfIteration = userAnswer.length;
        for(let i = 0; i < numberOfIteration; i++) {
            userAnswer.pop();
        }

        console.log(userAnswer)

    } 

    if(type === "selezionaOpzioni") {        
    
        let questionBox = document.getElementsByClassName("questionBox")[n];            
        let textToFill = questionBox.getElementsByClassName("textToFill")[0];
        let selectOptionAnswer = textToFill.getElementsByClassName("selectOptionAnswer");
        
        let whyAnswerIsWrong = questionBox.getElementsByClassName(`whyAnswerIsWrong`)[0];
        let button = questionBox.getElementsByClassName("submit")[0];
        let userIsRight = true;
        
        
        
        numberOfTries[n]++;       
        whyAnswerIsWrong.innerHTML = ``; 

        for(let i = 0; i < selectOptionAnswer.length; i++) {
            console.log(i)
            if(selectOptionAnswer[i].options[selectOptionAnswer[i].selectedIndex].value !== `${rightAnswer[i]}`) {
                userIsRight = false;
            }
            console.log(selectOptionAnswer[i].options[selectOptionAnswer[i].selectedIndex].value);
            console.log(rightAnswer[i]);
        }

        
        //se la risposta è corretta inspessisco il riquadro e lo coloro di verde, disabilito il pulsante submit 
        //e consento di controllare la risposta per esteso
        if(userIsRight) {
            for(let i = 0; i < selectOptionAnswer.length; i++) {
                selectOptionAnswer[i].style.borderColor = "rgb(0, 249, 0)";
                selectOptionAnswer[i].borderWidth = "0.2rem";
            }

            /* selectOption.forEach(elm => {
                elm.style.borderColor = "rgb(0, 249, 0)";
                elm.borderWidth = "0.2rem";
            }); */
            button.disabled = true;
            questionBox.getElementsByClassName("showAnswer")[0].style.visibility = "visible"
            whyAnswerIsWrong.innerHTML = `<br> ✅ Le opzioni selezionate sono corrette. `
        } else {
            whyAnswerIsWrong.innerHTML += `<br>❌ Almeno una delle opzioni selezionate non è corretta. `
        }
    

        //faccio comparire il numero di tentativi usati
        questionBox.getElementsByClassName("numberOfTries")[0].style.display = "block"
        questionBox.getElementsByClassName("numberOfTries")[0].innerHTML = `Hai usato ${numberOfTries[n]} dei ${maxNumberOfTries} tentativi disponibili`

        //se sono stati esauriti i tentativi possibili oppure do la possibilità di controllare la risposta
        //e disabilitio il pulsante submit
        if(numberOfTries[n] === maxNumberOfTries[n]) {
            questionBox.getElementsByClassName("showAnswer")[0].style.visibility = "visible"
            questionBox.getElementsByClassName("submit")[0].disabled = true;
        }

        
        if(numberOfTries[n] === maxNumberOfTries) {
            questionBox.getElementsByClassName("showAnswer")[0].style.visibility = "visible"
            questionBox.getElementsByClassName("submit")[0].disabled = true;
        }

    
    }
}

function showAnswer(n) {
    //riallineo il numero della domanda con il suo indice nei vettorri
    n = n - 1;
    
    //rendo visibile la risposta. Nelle righe //* e //** assegno un id provvisorio all'elemento
    //in modo da poter scrollare la pagina fino ad esso. Successivamente elimino l'id provvisorio
    let questionBox = document.getElementsByClassName("questionBox")[n];
    let showAnswer = questionBox.getElementsByClassName("showAnswer")[0];
    let answerContainer = questionBox.getElementsByClassName("answerContainer")[0]


    if(showAnswer.innerHTML === `Mostra la risposta`) {
        answerContainer.style.display = "block";
        answerContainer.id = "answer"; //*
        document.location.href = `#answer`
        answerContainer.id = ""; //**
        //cambio il nome dell'opzione
        showAnswer.innerHTML = "Nascondi la risposta";
    } else {
        showAnswer.innerHTML = "Mostra la risposta";
        answerContainer.style.display = "none"
    }
    
}