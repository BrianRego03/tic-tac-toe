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
// beginDecider();     

function startGame(){
    let count=0;
    let winner=0;
    while(count<9)
    {
        let xposition;
        let yposition;
        if(playerx.start==1)
        {
            xposition=prompt(`where should ${playerx.name} play?(0-8)`);
            gameBoard.marks[xposition]=playerx.signal;
            playerx.start--;
            playery.start++;
            winner=boardChecker();
            console.log(winner);
            if(winner=='X')
                break;
        }
        else{
            yposition=prompt(`where should ${playery.name} play?(0-8)`);
            gameBoard.marks[yposition]=playery.signal;
            playery.start--;
            playerx.start++;
            winner=boardChecker();
            console.log(winner);
            if(winner=='O')
                break;

        }
        count++;
        
    }
    // console.log(gameBoard);
    if(winner==0)
        console.log("It's a tie");
    else if(winner=="X")
        console.log(`${playerx.name} wins`);
    else if(winner=='O')
        console.log(`${playery.name} wins`);
    else
        console.log('error');    
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
