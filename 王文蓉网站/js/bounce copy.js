const letterss = document.getElementById('letterss');        
const letterElementss = letterss.textContent.split('').map((letter, index) => {            
const span = document.createElement('span');            
span.classList.add('bouncing-letter');            
span.textContent = letter;            
span.style.animationDelay = `${index * 0.2}s`;            
return span;
        });
        letterss.innerHTML = '';        
letterElementss.forEach(span => letterss.appendChild(span));