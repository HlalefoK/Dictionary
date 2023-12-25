function lookupWord() {
    let form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let word = data.get("word");
        let options = {
            method: 'Get',
        };

        document.getElementById('results').innerHTML = <p>Searching for <em>$</em></p>
    })
}