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

window.addEventListener('beforeunload', () => {
    clearInterval(timerInterval);
})

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

startTimer();