/*var leftbutton = document.querySelector('#changeleft');
var slides = document.querySelectorAll('.slide');

function moveleft(){
slides[0].classList.remove('data-active');
slides[slides.length-1].classList.add('data-active');
slides[0].remove();
document.querySelector('.slides').appendChild(slides[0]);
}
leftbutton.addEventListener('onclick', moveleft);

var rightbutton = document.querySelector('#changeright');

function moveright(){
    for (let i=0; i<slides.length; i++ ){
    if (slides[i].classList.contains('data-active')){  
        slides[i].classList.remove('data-active');
        if(i<slides.length - 1){
            slides[i+1].classList.add('data-active');
        }else{
            slides[0].classList.add('data-active');
        }
        
        }
    }
}


rightbutton.addEventListener('click', moveright);*/
