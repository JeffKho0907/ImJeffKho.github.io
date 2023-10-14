

const buttons = document.querySelectorAll('.buttons');
const display = document.querySelector('#display');
const displayOne = document.querySelector('.one');
const displayTwo = document.querySelector('.two');
const numButtons = document.querySelectorAll('.numbers')
const opButtons = document.querySelectorAll('.operators'); 
const calculate = document.querySelector('.calculate');
const del = document.querySelector('#delete');
const clear = document.querySelector('#clear');
const remove = document.querySelectorAll('.remove');


let firstNumber = '0';
let secondNumber = '';
let operator = '';

numButtons.forEach((button) => {
    button.addEventListener('click', (e)=> {        
        numbers(e.target.textContent);
        e.target.blur();
    } )

})

opButtons.forEach((button) => {
    
    button.addEventListener('click', (e)=>{
        operateBtn(e.target.textContent);
        e.target.blur()
    } );
})



calculate.addEventListener('click', ()=> {
    operate(firstNumber, secondNumber);
    
})



function operate(x, y) {
    y = parseFloat(y);
    x = parseFloat(x); 

    if((secondNumber === '' && operator !='') || (secondNumber ==='' && operator === '')){
        firstNumber = x;
        displayTwo.textContent = firstNumber;
    } else {
        if(operator === "+") {
        firstNumber = x+y;
        
        } else if(operator === "-") {
            firstNumber = x-y;
            
        } else if (operator === "x") {
            firstNumber = x*y;
            
        } else if (operator === "÷") {
            firstNumber = x/y;
            if(firstNumber === Infinity ) {
                displayTwo.textContent = "Can't divide by 0";
                firstNumber = '';
            }
            
        }
        firstNumber = firstNumber.toFixed(1);
        secondNumber = '';
        displayTwo.textContent = firstNumber;

    }
    
    operator = '';
    return 1;
}

del.addEventListener('click', ()=>{
    backspace();
})

clear.addEventListener('click', ()=>{
    wipe();
    
})

function wipe() {
    operator = '';
    firstNumber = '0';
    secondNumber ='';
    displayOne.textContent ='0';
    displayTwo.textContent = '0';
}
 
function operateBtn(op) {
    
    if(operator != '') {
        operate(firstNumber, secondNumber);
        operator = op;
        displayOne.textContent = firstNumber + operator;
        displayTwo.textContent = firstNumber ;
    } else if(displayTwo.textContent != '0' && displayTwo.textContent != '') {
        operator = op;
        displayTwo.textContent = '0';
        displayOne.textContent = firstNumber + operator;
    } else {
        operator = op;
        displayOne.textContent += operator;
        
    }
    
}

function numbers(num) {
    if(operator === '') {
        if(displayOne.textContent === '0') {
            displayOne.textContent = '';
        }
        if(displayTwo.textContent != '' && displayTwo.textContent != '0') {
            firstNumber = '';
            displayOne.textContent = '';
            displayTwo.textContent = '0';
        }
        
            firstNumber += num;
            
        
    } else {
       
            secondNumber += num;
            
        
        
    }
    displayOne.textContent += num;
    
    
}

function backspace() {
    if(secondNumber === '' && operator ==='') {
        firstNumber = firstNumber.slice(0,-1);
        displayOne.textContent = displayOne.textContent.slice(0,-1);
            if(firstNumber === '') {
                firstNumber = '0';
                displayOne.textContent ='0';
            }
        } else if (operator != '' && secondNumber === '') {
            operator = '';
            operatorClicked = false;
            displayOne.textContent =displayOne.textContent.slice(0,-1);
        } else {
            secondNumber = secondNumber.slice(0,-1);
            displayOne.textContent = displayOne.textContent.slice(0,-1);
        }
}



document.addEventListener('keydown', (e)=> {
    console.log(e.key);
    if(e.key==='Backspace') {
        backspace();
        del.classList.add('removeclick');
    } else if(e.key==='Escape') {
       wipe();
       clear.classList.add('removeclick');
    } else if (e.key ==='Enter' || e.key === '=') {
        operate(firstNumber, secondNumber);
        calculate.classList.add('reverseborder');
    } else if(e.key === '+' || e.key === '-' || e.key === 'x') {
        operateBtn(e.key);
        let button = document.querySelector(`[data-key="${e.key}"]`);
        button.classList.add('reverseborder');
    } else if( e.key === '/') {
        operateBtn('÷');
        let button = document.querySelector(`[data-key="${e.key}"]`);
        button.classList.add('reverseborder');
    } else if((e.key >= 0 && e.key <= 9) || e.key === '.') {
        numbers(e.key);
        let button = document.querySelector(`[data-key="${e.key}"]`);
        button.classList.add('reverseborder');
    }

})

document.addEventListener('keyup', (e)=> {
    if(e.key==='Backspace') {
        del.classList.remove('removeclick');
    }else if(e.key==='Escape') {
        clear.classList.remove('removeclick');
    } else if((e.key >= 0 && e.key <= 9) || e.key === '.') {
        
        let button = document.querySelector(`[data-key="${e.key}"]`);
        button.classList.remove('reverseborder')
    } else if (e.key ==='Enter' || e.key === '=') {
        calculate.classList.remove('reverseborder');
    }else if(e.key === '+' || e.key === '-' || e.key === 'x') {
        let button = document.querySelector(`[data-key="${e.key}"]`);
        button.classList.remove('reverseborder');
        } else if( e.key === '/') {
            let button = document.querySelector(`[data-key="${e.key}"]`);
            button.classList.remove('reverseborder');
    }
    
})

