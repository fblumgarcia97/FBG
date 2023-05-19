/*Juego del dado*/
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function play(){
    let randomNumber1=getRandomIntInclusive(1,6);
    let randomNumber2=getRandomIntInclusive(1,6);
    console.log(randomNumber1+"  "+randomNumber2)
    document.querySelector(".imag1").setAttribute("src","images/dice"+randomNumber1+".png");
    document.querySelector(".imag2").setAttribute("src","images/dice"+randomNumber2+".png");
    if(randomNumber1>randomNumber2){
        document.querySelector("h1").innerText="Player 1 Winner";
    }else if(randomNumber2>randomNumber1){
        document.querySelector("h1").innerText="Player 2 Winner";
    }else{
        document.querySelector("h1").innerText="Draw";
    }
    return randomNumber1,randomNumber2;
}
/*Drums*/
$(".drums").click(function (){
    makeSound(this.innerHTML);
    buttonAnimation(this.innerHTML);
});
$(document).keypress(function (e){
    makeSound(e.key.toLowerCase());
    buttonAnimation(e.key.toLowerCase());  
});
function makeSound(key){
    switch(key){
        case "w":
            var audio = new Audio('sounds/crash.mp3');
            audio.play();
            break;
        case "a":
            var audio = new Audio('sounds/kick-bass.mp3');
            audio.play();
            break;
        case "s":
            var audio = new Audio('sounds/snare.mp3');
            audio.play();
            break;
        case "d":
            var audio = new Audio('sounds/tom-1.mp3');
            audio.play();
            break;
        case "j":
            var audio = new Audio('sounds/tom-2.mp3');
            audio.play();
            break;
        case "k":
            var audio = new Audio('sounds/tom-3.mp3');
            audio.play();
            break;    
        case "l":
            var audio = new Audio('sounds/tom-4.mp3');
            audio.play();
            break;
        default:
            console.log("df");
            break;
    }  
}
function buttonAnimation(key){
    $("."+key).addClass("pressed");
    setTimeout(function(){
        $("."+key).removeClass("pressed");
    },100)
}
/*Simon Dice*/
let buttonColours=["green","red","yellow","blue"];
let level;
let count=-10;
let randomChosenColour=new Array;
let userChosenColour=new Array;
function nextSequence(){//Muestra la secuencia
    let randomNumber1=Math.floor(Math.random()*(4));//Número aleatorio
    animationButtons(buttonColours[randomNumber1]);//Animación correspondiente
    randomChosenColour.push(buttonColours[randomNumber1]);//Añade al array
    level++;//Hace el aumento del nivel
    count=0;//Resetea count
    userChosenColour=[];//resetea
    $("#level-title").text("Level "+level);//Cambia el título por esto
    $("#start").addClass("playing");//Quita el botón
    return count;
}
function animationButtons(id){//Animaciones
    $("#"+id).addClass("pressed");//Añade clase
    var audio = new Audio('sounds/'+id+'.mp3');//Llama al audio
    audio.play();//Lo reproduce
    setTimeout(function(){//En cierto tiempo vuelva a la normalidad
        $("#"+id).removeClass("pressed");
    },100)
}
function checkAnswer(num){//Verifica respuesta
    if(userChosenColour[num]==randomChosenColour[num]){//Si es igual el color del user y del sistema
        count++;
    }else{//En cambio
        $("#SimonSays").addClass("game-over");
        var audio = new Audio('sounds/wrong.mp3');//Llama al audio
        audio.play();//Lo reproduce
        $("#start").removeClass("playing");
        $("#level-title").text("Game Over, Press P Key to Restart or");
        count=-10;//Pone este contador para no registrar en el array
    }
    if(count==randomChosenColour.length){//Si el count tiene el mismo tamaño del length
        setTimeout(function(){
            count=-10;
            nextSequence();//LLama la nueva secuencia con 400ms
        },400)
    }
}
function startOver(){
    if(count==-10){
        level=0;
    randomChosenColour=[];
    $("#SimonSays").removeClass("game-over");
    nextSequence();
    }
}
$(".btn").click(function(){//Cuando se presiona algun color
    animationButtons(this.id);//Saca animacion
    if(count!=-10){//Si se cumple
        userChosenColour.push(this.id);//Se agrega al array el color
        checkAnswer(count);
    }
})
$(document).keypress(function(e){
    if(e.key.toLowerCase()=="p"){//Comprueba que se presione la tecla que es
        startOver();
    }
})
