let gameBoard ={
    marks:['a','b','c','d','e','f','g','h','i']
};

function player(name,signal){
    let start=0;
    let score=0;

    return{name,signal,start,score};
}

