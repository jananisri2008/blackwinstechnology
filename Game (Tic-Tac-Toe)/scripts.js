let board=[['','',''],['','',''],['','','']];
let player='X';

function render(){
    let tboard=document.getElementById('board');
    tboard.innerHTML='';
    

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let cell=document.createElement('div');
            cell.classList.add('cell');
            cell.textContent=board[i][j];
            cell.onclick=()=>cellclick(i,j);
            tboard.appendChild(cell);
        }
    }
}

function cellclick(i,j){
    if(board[i][j]===''){
        board[i][j]=player;

        if(winner()){
                       
            document.getElementById("result").innerHTML=player +'is winner';
            setTimeout(restart,2000);
           
        }
        player=(player==='X')?'O':'X';
        render();
    }
}

function winner(){
    //row
    for(let i=0;i<3;i++){
        if(board[i][0]===board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return true;
         }
    }
    //column
    for(let i=0;i<3;i++){
         if(board[0][i]===board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            return true;
         }
    }
    //cross major
    if(board[0][0]===board[1][1]&& board[1][1]===board[2][2]&& board[0][0]!==''){
        return true;
    }
     if(board[0][2]===board[1][1] && board[1][1]===board[2][0] && board[0][2]!==''){
        return true;
    }
        return false;
}
function restart(){
    board=[['','',''],['','',''],['','','']];
    player='X';
    document.getElementById("result").innerHTML="";
render();
}
render();

