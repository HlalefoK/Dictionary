function lookupWord() {
    let form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let word = data.get("word");
        let options = {
            method: 'Get',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}</em>...</p>`;
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let wordData = {
                word : data[0].word,
                phonetic: data[0].phonetic,
                meanings: [],
                phoneticAudio: data[0].phonetics[0].audio
            };

            for (let meaning of data[0].meanings) {
                let meaningData = {
                    partOfSpeech: meaning.partOfSpeech,
                    definitions: meaning. definitions
                };
                wordData.meanings.push(meaningData);
            }

            let template = document.getElementById('result-template').innerText;
            let compiledFunction = Handlebars.compile(template);
            document.getElementById('results').innerHTML = compiledFunction(wordData);
            let audioElement = document.querySelector('audio');
            if (audioElement) {
                audioElement.addEventListener('play', () => {
                    audioElement.play();
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('results').innerHTML = '<p>Error fetching data. Please check your internet connection or try again later.</p>';
        });
    });
}

function lookupAntonym() {
    let form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let word = data.get("word");
        let options = {
            method: 'GET',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}</em>...</p>`;
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let wordData = {
                word: data[0].word,
                phonetic: data[0].phonetic,
                antonyms: Object.values(data[0].meanings[1].antonyms),
                phoneticAudio: data[0].phonetics[0].audio
            };
            console.log(Object.values(data[0].meanings[1].synonyms));
            console.log(Object.values(data[0].meanings[1].antonyms));

            let template = document.getElementById('antonyms-results').innerText;
            let compiledFunction = Handlebars.compile(template);
            document.getElementById('results').innerHTML = compiledFunction(wordData);
            let audioElement = document.querySelector('audio');

            if (audioElement) {
                audioElement.addEventListener('play', () => {
                    audioElement.play();
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('results').innerHTML = '<p>Error fetching data. Please check your internet connection or try again later.</p>';
        });
    });
}

function lookupSynonym() {
    let form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let word = data.get("word");
        let options = {
            method: 'GET',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}</em>...</p>`;
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');

            }
            return response.json();
        })
        .then(data => {
            let wordData = {
                word: data[0].word,
                phonetic: data[0].phonetic,
                synonyms: Object.values(data[0].meanings[0].synonyms),
                phoneticAudio: data[0].phonetics[0].audio
            };
            console.log(Object.values(data[0].meanings[0].synonyms));

            let template = document.getElementById('synonyms-results').innerText;
            let compiledFunction = Handlebars.compile(template);
            document.getElementById('results').innerHTML = compiledFunction(wordData);
            let audioElement = document.querySelector('audio');
            if (audioElement) {
                audioElement.addEventListener('play', () => {
                    audioElement.play();
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('results').innerHTML = '<p>Error fetching data. Please check your internet connection or try again later.</p>';
        });
    });
}

