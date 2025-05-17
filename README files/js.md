# Animal Finder JavaScript Explanation and Documentation

## JavaScript Structure
- theme.js
- animals.js
- script.js
- greet.js
- timer.js

## Table of Contents
1. [Initialization](#initialization)
    - [Data Rendering](#data-rendering)
    - [Live Timer](#live-timer)
    - [Event-Listeners](#event-listeners)
2. [Data Management](#data-management)
    - [Greet Message](#greet-message)
    - [Theme Saving](#theme-saving)
    - [Search History](#search-history)
3. [Logic & Event Handling](#logic-&-event-handling)
    - [Live Search](#live-search)
    - [Keyboard Shortcuts](#keyboard-shortcuts)
    - [Error Handling and Regex Validation](#error-regex)
4. [Rubric Checklist](#rubric-checklist)

### Initialization
```javascript
    let container = document.createElement('div');
    container.className = 'content'
    document.getElementsByClassName('main')[0].appendChild(container);

    let allAnimalsBtn = document.getElementById('allAnimalsBtn');
```
This section selects a DOM element to be used later in the code and creates and appends the container element to the main container in the HTML.
```javascript
//script.js
renderAllAnimals();
displaySearchHistory();
//timer.js
startTimer();
//greet.js
greet();
```
This section calls a few functions to initialize the program.
```js
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
```
The ```renderAllAnimals()``` function uses the ```allAnimals``` array to display all animals in the animals.js data file. Some other DOM elements are also reset to their original status for if they were changed in other functions.
```js
function startTimer(){
    if(document.getElementById('sessionTimer')){
        return;
    }

    let sessionSeconds = 0;

    const timerElement = document.createElement('div');
    timerElement.id = 'sessionTimer';
    timerElement.style.marginTop = '20px';
    timerElement.style.color = 'var(--secondary)';
    timerElement.style.fontSize = '18px';
    timerElement.style.textAlign = 'center';
    document.getElementsByClassName('main')[0].appendChild(timerElement);

    updateTimerDisplay(timerElement, sessionSeconds);

    let timerInterval = setInterval(() => {
        sessionSeconds++;
        updateTimerDisplay(timerElement, sessionSeconds);
        sessionStorage.setItem('timeOnPage', sessionSeconds.toString());
    }, 1000)
}
```
The ```startTimer()``` function creates and styles a div element to display how long the user has been on the page using an interval that updates the time every second.
#### Data Rendering

```js
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
```
The `renderAnimals(animals)` function creates cards to display each individual animal for every object array element in the array passed through the ```animals``` parameter. If the passed array has no elements, the message "No animals found" is displayed by appending an h2 element to the main container.
```js
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
    };
};
```
The ```displaySearchHistory()``` function parses the user's search history data from the local storage as an array and creates a li element for every term the user has searched and appends it to the ul that acts as a container.

#### Live Timer
```js
function updateTimerDisplay(element, totalSeconds){
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600)/60);
    const seconds = totalSeconds % 60;

    let timeText = 'Time on page:'
    if (hours > 0){
        timeText += ` ${hours}h`
    }
    if (hours > 0 || minutes > 0){
        timeText += ` ${minutes}m`
    }
    
    timeText += ` ${seconds}s`;

    element.textContent = timeText;
}
```
The ```updateTimerDisplay(element,totalSeconds)``` function is called every second in a timer interval using parameters passed from the ```startTimer()``` to convert the number of seconds the user has been on the web app for to minutes and seconds and display it in the timer element. 

#### Event Listeners
```js
document.querySelectorAll("div.categories > div").forEach(category => {
    category.addEventListener("click", () => searchByClass(category.textContent));
})
```
This section of code is one of the first run and makes it so the category HTML elements call the ```searchByClass(animalClass)``` function when clicked.

### Data Management
#### Theme Saving
```js
if(localStorage.getItem('theme') === 'dark'){
    document.body.className = 'dark';
    themeBtn.src = "images/light-mode.png";
    themeBtn.style.backgroundColor = 'white';
} else {
    document.body.className = ' ';
    themeBtn.src = "images/dark-mode.png";
    themeBtn.style.backgroundColor = 'black';
}
```
This code is run after the page loads, getting the user's saved theme from the local storage and immediately updating the webpage display according to what theme the user last had.

```js
document.getElementById('themeBtn').addEventListener('click', function(){
    const themeBtn = document.getElementById('themeBtn');
    if(document.body.className === 'dark'){
        localStorage.setItem('theme', 'light');
        document.body.className = ' ';
        themeBtn.src = "images/dark-mode.png";
        themeBtn.style.backgroundColor = 'black';
    } else {
        localStorage.setItem('theme', 'dark');
        document.body.className = 'dark';
        themeBtn.src = "images/light-mode.png";
        themeBtn.style.backgroundColor = 'white';
    }
})
```
This section of code creates an item in the local storage and styles the theme button and applies a class to the document body accordingly.
#### Greet Message
```js
function greet(){
    const hasVisitedBefore = document.cookie.includes('visitedBefore=true');
    if (!hasVisitedBefore){
        let expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 7);
        document.cookie = `visitedBefore=true;expires=${expiryDate.toUTCString()}; path=/`;
        alert('Welcome to Animal Finder!')
    } 
}
```
The ```greet()``` function creates a cookie when a user opens the webpage for the first time and uses the date object to set the expiry date 7 days from the first moment they viewed the page. If the user has not visited the page before, a "Welcome to Animal Finder" alert appears.

#### Search History

```js
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
```
The ```saveSearchTerm(term)``` function parses a JavaScript array from the searchHistory item. If there are no elements in the array then it is set to an empty array. If the user inputs an original search term, it is appended to the array. If the user inputs a new search term while the search history array has already reached 10 elements, the oldest element is removed to make space for the new search term.

### Logic & Event Handling
#### Live Search
```js
document.getElementById('searchInput').addEventListener('input', searchByName);
```
This event listener calls the ```searchByName()``` function whenever the search bar recieves input which allows for a live search functionality.
#### Keyboard Shortcuts
```js
document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D'){
        document.getElementById('themeBtn').click();
    }
})
```
The section of code makes it so when the user presses Ctrl + D, the theme button is clicked and the theme is changed.
#### Error Handling and Regex Validation
```js
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
```
### Rubric Checklist
1. Variable Naming & Indentation -> ```let container = document.createElement('div');```
2. Function Naming and Modularity -> ```function renderAnimals(animals){...}```
3. Arrays & Objects Usage -> ```const allAnimals = [
    {
        name: "Plains Zebra",
        family: "Equidae",
        class: "Mammals",
        scientific: "Equus quagga",
        habitat: "Grasslands",
        diet: "Herbivore",
        location: "Africa",
        image: "images/plains-zebra.jpg"
    }...]```
4. Array Methods -> ```let filteredAnimals = allAnimals.filter(animal => animal.name.toLowerCase().includes(input));```
5. Looping/Iteration -> ```animals.forEach(animal => {...});```
6. JSON Data Handling -> ```let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];```
7. Web Storage -> ```localStorage.setItem('searchHistory', JSON.stringify(searchHistory));```
8. Saving/Retrieving User Data -> ```if(localStorage.getItem('theme') === 'dark'){...};```
9. Cookies with Expiry -> ```document.cookie = `visitedBefore=true;expires=${expiryDate.toUTCString()}; path=/`;```
10. DOM Manipulation -> ```msg.remove();```
11. CSS Manipulation via JS -> ```container.className = 'content';```
12. Theme Preference -> ```localStorage.setItem('theme', 'dark');```
13. Comments & Code Readability -> ```document.getElementsByClassName(animalClass)[0].classList.add('selected'); // adds selected class to category user clicks on```
14. Error Handling & Debugging -> ```onsole.log(input);``` + 
```js
try{
    let onlyLetters = /^[A-Za-z]+$/;
    if(!onlyLetters.test(input)) throw 'Search can only include letter characters.'
    searchByName();
    saveSearchTerm(input.toLowerCase().trim());
    } catch(err){
    alert(err);
}
```

15. Regex Validation -> ```let onlyLetters = /^[A-Za-z]+$/;```
16. Timer & Date Object -> ```let expiryDate = new Date();``` +
```js
let timerInterval = setInterval(() => {
        sessionSeconds++;
        updateTimerDisplay(timerElement, sessionSeconds);
        sessionStorage.setItem('timeOnPage', sessionSeconds.toString());
    }, 1000)
```
17. Math, String, Random Methods -> ```const input = document.getElementById('searchInput').value.trim().toLowerCase();```
18. Event Listeners & Shortcuts -> 
```js
document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D'){
        document.getElementById('themeBtn').click();
    }
})
```
19. Real-time Search & History -> ```document.getElementById('searchInput').addEventListener('input', searchByName);``` + ```let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];```

20. CRUD Fuctionality -> ```searchHistory.shift();``` + ```searchHistory.push(term);```
