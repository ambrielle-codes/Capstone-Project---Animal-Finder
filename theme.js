if(localStorage.getItem('theme') === 'dark'){
    document.body.className = 'dark';
    themeBtn.src = "images/light-mode.png";
    themeBtn.style.backgroundColor = 'white';
} else {
    document.body.className = ' ';
    themeBtn.src = "images/dark-mode.png";
    themeBtn.style.backgroundColor = 'black';
}

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

document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D'){
        document.getElementById('themeBtn').click();
    }
})