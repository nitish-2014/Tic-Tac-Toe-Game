const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;

//position where payer can win
const winningPosition=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]

];


// let's create a function to initialize the game
function initGame(){
     currentPlayer="X";
     gameGrid=["","","","","","","","",""]; // empty inner logic grid
     //empty on UI on starting or new game button click

     boxes.forEach((box,index) => {
        box.innerText="";
        boxes[index].style.pointerEvents="all";


        //remove green after winning(initialize boxes with css properties again)
        box.classList=`box box${index+1}`;  //box ke upar all properties re applied e.g box1

     });


     //initially at  starting we want to hide the  new player button
     newGameBtn.classList.remove("active");
     gameInfo.innerText=`Current Player- ${currentPlayer}`;

}
initGame();






boxes.forEach( (box ,index) =>{   //here index(0 to 8) provides which box is clicked at that time 
      box.addEventListener("click",()=> {
         handleClick(index);
      })
});



newGameBtn.addEventListener('click',initGame);




function swapTurn(){
    if(currentPlayer=="X")
        currentPlayer="O";
    else
    currentPlayer="X";

    //UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}





function checkGameOver(){
     let answer="";
     


     winningPosition.forEach((position)=>{

        //all three boxes should be non empty and same in value
        if( (gameGrid[position[0]]  !==""  ||  gameGrid[position[1]]  !==""  || gameGrid[position[2]]  !==""  )
          && (  gameGrid[position[0]]  ===gameGrid[position[1]] ) && (  gameGrid[position[1]] === gameGrid[position[2]])    )  {

           //check if winner is X or O

           if(gameGrid[position[0]]==="X")
            answer="X"
          else
            answer="O";

            //disable pointer events when we found winner
            boxes.forEach( (box)=>{
                box.style.pointerEvents="none";
            });


            // now we know the winner and fill the color in boxes
     boxes[position[0]].classList.add("win");
     boxes[position[1]].classList.add("win");
     boxes[position[2]].classList.add("win");


        }
     });


     //if we have winner
     if (answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active"); 
        return;
     }


     //check  game tied
     let fillCount=0;
     gameGrid.forEach( (box)=> {
        if(box !=="")
            fillCount++;
     } );


     //board is full  filled
     if(fillCount===9)
     {
        gameInfo.innerText="Game Tied";
        newGameBtn.classList.add("active");
     }
}






function handleClick(index){
     if(gameGrid[index]==""){  //processing only when grid is empty
         boxes[index].innerText=currentPlayer;  ///update on ui
         gameGrid[index]=currentPlayer;   //update in inner logic
         boxes[index].style.pointerEvents="none";  // for when box filled the, cursor , pointer na bane
         //swap the player's turn 
         swapTurn();
         //check koi jeet to ni gya
         checkGameOver();
     }
}

 
