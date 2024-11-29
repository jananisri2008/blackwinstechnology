function calculator(operator){
    let num1=parseFloat(document.getElementById('num1').value);
    let num2=parseFloat(document.getElementById('num2').value);
    let result;
    switch(operator){
        case"+":
        result=num1+num2;
        break;
        case"-":
        result=num1-num2;
        break;
        case"*":
        result=num1*num2;
        break;
        case"/":
        result=num1/num2;
        break;
        case"%":
        result=num1%num2;
        break;
        default:
            result="error";
    }
    document.getElementById('result').value = result;
}
function clearFn(){
    document.getElementById('num1').value='';
    document.getElementById('num2').value='';
    document.getElementById('result').value='';
}


