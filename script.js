let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchresults(result) {
    let {
        title,
        link,
        description
    } = result;
    
    // 1. Div container --- result-item
    let resultContainerEl = document.createElement("div");
    resultContainerEl.classList.add("result-item");
    searchResultsEl.appendChild(resultContainerEl);
    // 2. Anchor Title --- result-tilte
    let titleEl = document.createElement("a");
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    titleEl.href = link;
    titleEl.target = "_blank";
    resultContainerEl.appendChild(titleEl);
    // 3. title Break element  
    let brEl = document.createElement("br");
    resultContainerEl.appendChild(brEl);
    // 4. Anchor URL --- result-link 
    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.classList.add("result-url");
    resultContainerEl.appendChild(urlEl);
    // 5. link break Element
    let linebrEl = document.createElement("br");
    resultContainerEl.appendChild(linebrEl);
    // 6. description paragraph --- result-description
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultContainerEl.appendChild(descriptionEl);
}

function displayResults(search_results) {
    for (let result of search_results) {
        createAndAppendSearchresults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
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
                spinnerEl.classList.toggle("d-none");
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);