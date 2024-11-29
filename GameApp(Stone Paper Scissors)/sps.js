let choose=['stone','paper','scissors'];
//let result=0;
document.getElementById('stone').addEventListener('click',()=>play('stone'));
document.getElementById('paper').addEventListener('click',()=>play('paper'));
document.getElementById('scissors').addEventListener('click',()=>play('scissors'));

function play(user){
      // let choose=['stone','paper','scissors'];
        let i=Math.floor(Math.random()*choose.length);
        computer=choose[i];

        finalresult(user,computer);
}

function finalresult(user,computer){
    document.getElementById("useropt").innerHTML=`User Choose: ${user}`;
    document.getElementById("computeropt").innerHTML=`Computer Choose: ${computer}`;
    
     if((user==='stone' && computer==='scissors')||
                 (user==='paper' && computer==='rock')||
                 (user==='scissors' && computer==='paper')
                )
                {
                   // alert(`Winner User choose ${user} Computer choose ${computer}`);
                  // document.getElementById("useropt").innerHTML=user;
                  document.getElementById("result").innerHTML=`User win`;
                } else if(user===computer)
                    {
                    //alert(`Tie both select same ${user}`);
                    document.getElementById("result").innerHTML=`${user}-Tie both select same`;
            
                    }
                else{
                    //alert(`Looser Computer choose ${computer} User choose ${user}`);
                    //document.getElementById("computeropt").innerHTML=computer;
                    document.getElementById("result").innerHTML=`Computer win`;
                
                }
}