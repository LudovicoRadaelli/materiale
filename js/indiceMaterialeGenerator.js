fetch("capitoli.json")
  .then(response => response.json())
  .then(jsonContent => {

    for(let chapterNumber = 1; chapterNumber <= jsonContent["capitolo"].length; chapterNumber++) {
        let div = document.querySelectorAll(".chapter")[chapterNumber-1];
        let h2 = document.createElement("h2");
        let nomeCartellaCapitolo =  jsonContent["capitolo"][chapterNumber -1]["nomeCartella"]
        h2.className = "chapter"
        h2.innerHTML = `${chapterNumber}) ${jsonContent["capitolo"][chapterNumber-1]["titolo"]}<br><br>`
        div.appendChild(h2);

        for(let i = 0; i < jsonContent["capitolo"][chapterNumber -1]["paragrafo"].length; i++) {
            let paragraphNumber = jsonContent["capitolo"][chapterNumber -1]["paragrafo"][i]["numero"];
            let paragraphTitle = jsonContent["capitolo"][chapterNumber -1]["paragrafo"][i]["titolo"];
            let nomeCartellaParagrafo = jsonContent["capitolo"][chapterNumber -1]["paragrafo"][i]["nomeCartella"]
            let a = document.createElement("a");
            a.href = `${chapterNumber}${nomeCartellaCapitolo}/${nomeCartellaParagrafo}/index.html`;
            a.innerHTML = `<code><b>${paragraphNumber}) ${paragraphTitle}</b></code><br><br>`
            div.appendChild(a);
        }
    }
    
  })
  .catch(error => console.error("Errore durante il caricamento del file JSON:", error));