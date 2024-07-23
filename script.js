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
playerx.name=prompt("Which player uses X?");
playerx.signal="X";
playery.name=prompt("Which player uses O?");
playery.signal="O";