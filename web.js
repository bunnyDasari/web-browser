let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");


function createAppend(result) {
    let {
        title,
        link,
        description
    } = result;

    let dev = document.createElement("dev");
    dev.classList.add("result-item");
    searchResults.appendChild(dev);

    let ar = document.createElement("a");
    ar.classList.add("result-item");
    ar.textContent = title;
    ar.href = link;
    ar.target = "_blank";
    searchResults.appendChild(ar);

    let br = document.createElement("br");
    searchResults.appendChild(br);

    let url_ele = document.createElement("a");
    url_ele.classList("result-item");
    url_ele.textContent = link;
    url_ele.href = link;
    url_ele.target = "_blank";


    searchResults.appendChild(url_ele);

    let para = document.createElement("p");
    para.textContent = description;
    para.classList.add("link-description");
    searchResults.appendChild(para);


}

function displayResults(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {

        createAppend(result);

    }

}

function searchWiki(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none");
        let serachInp = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + serachInp;
        let options = {
            method: "GET"

        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }

}


searchInput.addEventListener("keydown", searchWiki);