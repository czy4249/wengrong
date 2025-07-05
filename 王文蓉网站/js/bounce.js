const letters = document.getElementById('letters');        
const letterElements = letters.textContent.split('').map((letter, index) => {            
const span = document.createElement('span');            
span.classList.add('bouncing-letter');            
span.textContent = letter;            
span.style.animationDelay = `${index * 0.2}s`;            
return span;
        });
        letters.innerHTML = '';        
letterElements.forEach(span => letters.appendChild(span));