function greet(){
    const hasVisitedBefore = document.cookie.includes('visitedBefore=true');
    if (!hasVisitedBefore){
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        document.cookie = `visitedBefore=true;expires=${expiryDate.toUTCString()}; path=/`;
        alert('Welcome to Animal Finder!')
    } 
}

greet();