const option = {
    method: "GET",
    headers: {
        'X-RapidAPI-Key': '8e4e7fb831mshfae0d0b9e21b818p1c51acjsnbf38dfdf6bed',
        'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
    }
}

function getLang(data) {
    var opt = document.createElement("option")
    opt.setAttribute("value", data[1])
    opt.innerText = data[0]
    document.getElementById("lang").append(opt)
}

window.load = fetch('https://translate-plus.p.rapidapi.com/', option)
    .then((result) => result.json())
    .then((result) => {
        Object.entries(result.supported_languages).slice(1,).forEach((lng) => getLang(lng))
    })

document.getElementById("btn").onclick = function () {
    var text = document.getElementById("search").value
    var lng = document.getElementById("lang").value



    if (text === "") {
        alert("Your text is empty")
    } else {
        const option = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '8e4e7fb831mshfae0d0b9e21b818p1c51acjsnbf38dfdf6bed',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            body: `{"text": ${JSON.stringify(text)}}`
        };

        fetch('https://translate-plus.p.rapidapi.com/language_detect', option)
            .then(response => response.json())
            .then(response => {
             var detecting = response.language_detection.language

             const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '8e4e7fb831mshfae0d0b9e21b818p1c51acjsnbf38dfdf6bed',
                    'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
                },
                body: `{"text":${JSON.stringify(text)},"source":${JSON.stringify(detecting)},"target":${JSON.stringify(lng)}}`
            };
            
            fetch('https://translate-plus.p.rapidapi.com/translate', options)
                .then(response => response.json())
                .then(response => {
                    document.getElementById("res").innerText = response.translations.translation
                })
                .catch(err => console.error(err));
             })
            .catch(err => console.error(err));
    }
    
}