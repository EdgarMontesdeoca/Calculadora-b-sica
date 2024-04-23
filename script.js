let runningTotal = 0;
let buffer = '0';
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−': // Carácter Unicode para la resta
        case '×': // Carácter Unicode para la multiplicación
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if (buffer === '0'){
        return;
    }
    
    const intBuffer = parseFloat(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){ // Carácter Unicode para la resta
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){ // Carácter Unicode para la multiplicación
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        if(intBuffer === 0){
            alert("Error: No se puede dividir por cero");
            buffer = '0';
            runningTotal = 0;
            return;
        }
        runningTotal /= intBuffer;
    }
    if(!isFinite(runningTotal)){
        alert("Error: El resultado es demasiado grande o demasiado pequeño para ser representado");
        buffer = '0';
        runningTotal = 0;
        return;
    }
}

function handleNumber(numberStrig){
    if(buffer === '0'){
        buffer = numberStrig;
    }else{
        buffer += numberStrig;
    }
}

function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
