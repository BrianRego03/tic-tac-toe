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



function beginDecider() {
    if(Math.random()<0.5)
    {
        playerx.start=1;
        
    }
    else {playery.start=1;
            
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
        
        
    }
    else{
        
        gameBoard.marks[gridPosition]=playery.signal;
        playery.start--;
        playerx.start++;
        winner=boardChecker();
        
        

    }
    count++;
        
    
    
    if((count==9)&&(winner==0))
        {
            console.log("It's a tie");
            disableGrid();
            displayWinner(`It's a tie`);
            clearGameBoard();
            return;}
    else if(winner=="X")
        {
            console.log(`${playerx.name} wins`);
            disableGrid();
            displayWinner(`${playerx.name} wins`);
            return;}
    else if(winner=='O')
        {
            console.log(`${playery.name} wins`);
            disableGrid();
            displayWinner(`${playery.name} wins`);
            return;}
    else
        return;  
}



function boardChecker(){
    const winnerArray=['012','345','678','036','147','258','048','246'];
    
    
    for(let combo of winnerArray){
        
        let splitArray=combo.split("");
        
        if((gameBoard.marks[splitArray[0]]==gameBoard.marks[splitArray[1]])&&
        (gameBoard.marks[splitArray[1]]==gameBoard.marks[splitArray[2]]))
        {
            console.log(`we have a winner ${gameBoard.marks[splitArray[0]]} at
                 ${splitArray[0]}${splitArray[1]}${splitArray[2]}`);
            
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
        buttono1.setAttribute("class","xButtonHighlight");
        buttonx2.setAttribute("class","yButtonHighlight");
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
    gridGenerate();
    gridActivator();
};

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




let gridActivator=()=>{
    let gridButtons=document.querySelectorAll(".gridChildren");
    for(let currentButton of gridButtons){
        currentButton.addEventListener('click',()=>{
            let location=currentButton.id.slice(4);
            if(playerx.start>0){
                currentButton.innerText=playerx.signal;
                currentButton.classList.add("xButtonHighlight");
                
                startGame(location);
            }
            else{
                currentButton.innerText=playery.signal;
                currentButton.classList.add("yButtonHighlight");
                
                startGame(location);
    
            }
            currentButton.disabled=true;
        })
    }
}

let disableGrid=()=>{
    let gridButtons=document.querySelectorAll(".gridChildren");
    for(let disableButton of gridButtons){
        disableButton.disabled=true;
    }
};

let displayWinner=(thread)=>{

    let displayScreen=document.getElementById("displayInfo");
    displayScreen.innerText=thread;
    };

let gridGenerate=()=>{
    let gridDiv=document.createElement("div");
    document.body.appendChild(gridDiv);
    gridDiv.setAttribute("id","gridContainment");
    let gridContain=document.createElement("div");
    gridDiv.appendChild(gridContain);
    gridContain.setAttribute("id","tictacGrid");
    
    let gridNumber=0;
    while(gridNumber<9)
    {   let gridChild=document.createElement("button");
        
        gridContain.appendChild(gridChild);
        gridChild.setAttribute("id",`grid${gridNumber}`);
        gridChild.setAttribute("class","gridChildren");
        gridNumber++;
        
    }
}    

let clearGameBoard=()=>{
    let displayDiv=document.querySelector("#displayInfo");
    let gridDiv=document.querySelector("#gridContainment");
    document.body.removeChild(displayDiv);
    document.body.removeChild(gridDiv);

}

