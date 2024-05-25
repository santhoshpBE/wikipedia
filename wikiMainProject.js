let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");
let voiceButton = document.getElementById("voiceBtn");
let transcript = "";

function searchWikipediaVoice(text) {
    if (true) {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = text;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    alert("Your browser does not support the Web Speech API");
} else {
    // Create a new instance of SpeechRecognition
    const recognition = new SpeechRecognition();

    // Set properties
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // If you want to display interim results
    recognition.maxAlternatives = 1; // Maximum number of alternatives

    // Start recognition on button click
    document.getElementById('voiceBtn').addEventListener('click', () => {
        recognition.start();
    });

    // Capture the result and display it
    recognition.onresult = (event) => {
        transcript = event.results[0][0].transcript;
        if (transcript !== "") {
            searchWikipediaVoice(transcript);
        }


    };

    // Handle recognition errors
    recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ', event.error);
    };
}



function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}


voiceButton.addEventListener('onclick', () => {
    if (transcript !== "") {
        console.log(transcript);
    }
});





function searchWikipedia(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}





searchInputEl.addEventListener("keydown", searchWikipedia);