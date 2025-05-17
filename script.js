let container = document.createElement('div');
container.className = 'content';
document.getElementsByClassName('main')[0].appendChild(container);

let allAnimalsBtn = document.getElementById('allAnimalsBtn');


function renderAnimals(animals){
    container.innerHTML = '';
    if(animals.length < 1){
        if(!document.getElementById('msg')){ // new message element is not created if one is alrady there
            const msg = document.createElement('h2');
        msg.id = 'msg'
        msg.textContent = 'No animals found.'
        msg.style.color = 'var(--accent)';
        msg.style.textAlign = 'center';
        msg.style.padding = '1em 0';
        // "No animals found" message if there is no elements in passed array
        document.getElementsByClassName('main')[0].insertBefore(msg, document.getElementById('sessionTimer'));
        }
    } else {
        if(document.getElementById('msg')){
            msg.remove(); // remove "No animals found" message if it is there when loading cards
        }
        animals.sort(function(a,b){return a.name.charCodeAt(0) - b.name.charCodeAt(0)});
        animals.forEach(animal => {
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
            <h1>${animal.name}</h1>
                <div class='information'>
                    <div>
                    <p>Habitat: ${animal.habitat}</p>
                    <p>Diet: ${animal.diet}</p>
                    <p>Continent(s): ${animal.location}</p>
                </div>
                <div class="img-container">
                    <img src=${animal.image}>
                    <br>
                    <p style='text-align: center'><i>${animal.scientific}</i></p>
                </div>
            </div>
            `;
            container.appendChild(card);
        });    
    }
}

function renderAllAnimals(){
    // resets animal cards container before reloading it
    deselectAllCategories();
    container.innerHTML = ''; 
    document.getElementById('searchInput').value = '';
    renderAnimals(allAnimals);
    allAnimalsBtn.removeEventListener('click', renderAllAnimals);
    allAnimalsBtn.textContent = "All Animals (A-Z)";
    allAnimalsBtn.className = ' ';
}

function searchByName(){
    deselectAllCategories();
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    console.log(input);
    if (input !== " "){
        //filters allAnimals array to only include animals with the name that the user searches for
        let filteredAnimals = allAnimals.filter(animal => animal.name.toLowerCase().includes(input));
        renderAnimals(filteredAnimals);
    }
    returnButton();
}

function searchByClass(animalClass){
    document.getElementById('searchInput').value = '';
    deselectAllCategories();
    animalClass = animalClass.trim().toLowerCase();
    let filteredAnimals = allAnimals.filter(animal => {
        return animalClass === animal.class.toLowerCase();
    });
    renderAnimals(filteredAnimals);
    returnButton()
    document.getElementsByClassName(animalClass)[0].classList.add('selected'); // add selected class to category user clicks on
}

function returnButton(){
    // change "All Animals (A-Z)" text into a button to clear search/go back to all animals
    allAnimalsBtn.textContent = '⬅ Return to All Animals';
    allAnimalsBtn.className = 'allAnimalsBtn';
    allAnimalsBtn.addEventListener('click', renderAllAnimals);
}

document.getElementById('searchInput').addEventListener('input', searchByName);
document.getElementById('searchInput').addEventListener('keydown', function(e){
    if (e.key === "Enter"){
        let input = document.getElementById('searchInput').value;
        try{
            let onlyLetters = /^[A-Za-z]+$/;
            if(!onlyLetters.test(input)) throw 'Search can only include letter characters.'
            searchByName();
            saveSearchTerm(input.toLowerCase().trim());
        } catch(err){
            alert(err);
        }
        document.getElementById('searchInput').value = '';
    }
});

function saveSearchTerm(term){
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if(searchHistory.length >= 10){
        searchHistory.shift(); //removes oldest search term to replace with user's newest search
    }
    if(!searchHistory.includes(term)){
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    displaySearchHistory();
}

function displaySearchHistory(){
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const ul = document.getElementById('searchHistory');
    ul.innerHTML = 'Most Recent Searches:';
    if (searchHistory.length > 0){ // creates interactive li element for each search term
        searchHistory.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            li.addEventListener('click', function(){
                document.getElementById('searchInput').value = term;
                searchByName();
            });
            ul.appendChild(li);
        });
    }
};

function deselectAllCategories(){
    // remove selected class from all categories
    document.querySelectorAll("div.categories > div").forEach(category => {
        category.classList.remove('selected');
    });
}

//starts the program
renderAllAnimals();
displaySearchHistory();
document.querySelectorAll("div.categories > div").forEach(category => {
    category.addEventListener("click", () => searchByClass(category.textContent));
})