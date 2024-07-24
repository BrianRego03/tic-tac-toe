let gameBoard ={
    marks:['a','b','c','d','e','f','g','h','i']
};

function player(name){
    let score=0;
    const getScore=()=>score;
    const matchWon=()=>score++;

        return{name,signal:null,start:0,getScore,matchWon};
}
playerx=player();
playery=player();
// playerx.name=prompt("Which player uses X?");
// playerx.signal="X";
// playery.name=prompt("Which player uses O?");
// playery.signal="O";


function beginDecider() {
    if(Math.random()<0.5)
    {
        playerx.start=1;
        console.log(`${playerx.name} goes first`);
    }
    else {playery.start=1;
            console.log(`${playery.name} goes first`);
        }
}   
beginDecider();     

let count=0;
function startGame(gridPosition){
    
    let winner=0;
    console.log(gridPosition);
    
    if(playerx.start==1)
    {
        
        gameBoard.marks[gridPosition]=playerx.signal;
        playerx.start--;
        playery.start++;
        winner=boardChecker();
        console.log(winner);
        
    }
    else{
        
        gameBoard.marks[gridPosition]=playery.signal;
        playery.start--;
        playerx.start++;
        winner=boardChecker();
        console.log(winner);
        

    }
    count++;
        
    
    // console.log(gameBoard);
    if((count==9)&&(winner==0))
        {console.log("It's a tie");
            return;}
    else if(winner=="X")
        {console.log(`${playerx.name} wins`);
         return;}
    else if(winner=='O')
        {console.log(`${playery.name} wins`);
            return;}
    else
        return;  
}

// startGame();

function boardChecker(){
    const winnerArray=['012','345','678','036','147','258','048','246'];
    
    
    for(let combo of winnerArray){
        // console.log(this);
        let splitArray=combo.split("");
        console.log(splitArray);
        if((gameBoard.marks[splitArray[0]]==gameBoard.marks[splitArray[1]])&&
        (gameBoard.marks[splitArray[1]]==gameBoard.marks[splitArray[2]]))
        {
            console.log(`we have a winner ${gameBoard.marks[splitArray[0]]} at
                 ${splitArray[0]}${splitArray[1]}${splitArray[2]}`);
            // console.log(gameBoard.marks[splitArray[0]]);     
            return gameBoard.marks[splitArray[0]];      
        }
        
    }
    return 0;
}


let startButton=document.querySelector("#starterbutton");
let dialogButton=document.querySelector('#formAlign')

startButton.addEventListener('click',()=>{dialogButton.showModal();});

let formSubmit=document.querySelector("form");

formSubmit.addEventListener('submit',function(e){
    e.preventDefault();
    let wait=0;
    playerx.name=formSubmit[0].value;
    playery.name=formSubmit[3].value;

    clearStart();
    
    wait=1;
    if(wait=1)
        dialogButton.close();

    

})

let formButtonActivate=(function(){
    let buttonx1=document.querySelector("#player1X");
    let buttono1=document.querySelector("#player1O");
    let buttonx2=document.querySelector("#player2X");
    let buttono2=document.querySelector("#player2O");

    let xoCombo=()=>{
        buttonx1.setAttribute("class","xButtonHighlight");
        buttono1.setAttribute("class","greyedOut");
        buttonx2.setAttribute("class","greyedOut");
        buttono2.setAttribute("class","yButtonHighlight");

        playerx.signal="X";
        playery.signal="O";
        
    };

    let oxCombo=()=>{
        buttonx1.setAttribute("class","greyedOut");
        buttono1.setAttribute("class","yButtonHighlight");
        buttonx2.setAttribute("class","xButtonHighlight");
        buttono2.setAttribute("class","greyedOut");

        playery.signal="X";
        playerx.signal="O";

    }

    xoCombo();

    buttonx1.addEventListener('click',()=>{xoCombo();});
    buttono1.addEventListener('click',()=>{oxCombo();});
    buttonx2.addEventListener('click',()=>{oxCombo();});
    buttono2.addEventListener('click',()=>{xoCombo();});
})();

let clearStart=()=>{
    const startSection=document.getElementById("start");
    startSection.remove();
    initializeDisplay();
};

let displayScreen=document.getElementById("displayInfo");
let titleDiv=document.getElementById("title");
let initializeDisplay=()=>{
    let displayDiv=document.createElement("div");
    titleDiv.insertAdjacentElement('afterend',displayDiv);
    displayDiv.setAttribute("id","displayInfo");
    if(playerx.start>0){
        displayDiv.innerText=`${playerx.name} starts first`;
    }
    else{
        displayDiv.innerText=`${playery.name} starts first`;

    }
    

}


let gridButtons=document.querySelectorAll(".gridChildren");

for(let currentButton of gridButtons){
    currentButton.addEventListener('click',()=>{
        let location=currentButton.id.slice(4);
        if(playerx.start>0){
            currentButton.innerText=playerx.signal;
            currentButton.classList.add("xButtonHighlight");
            console.log(currentButton);
            console.dir(currentButton);
            startGame(location);
        }
        else{
            currentButton.innerText=playery.signal;
            currentButton.classList.add("yButtonHighlight");
            console.log(currentButton);
            console.dir(currentButton);
            startGame(location);

        }
    })
}

