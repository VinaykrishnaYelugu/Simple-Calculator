let divObjs = document.querySelectorAll("#solvers_>section>div");
let h1Obj = document.querySelector("#solvers_ h1");
let arr=[];
let str="";
let question="";

for( let i=0 ; i<divObjs.length ; i++ ) {
    divObjs[i].addEventListener("click",function(){
        str="";
        switch(i){
            case 0 : arr.push("+"); break;
            case 1 : arr.push("-"); break;
            case 2 : arr.push("*"); break;
            case 3 : arr.push("/"); break;
            case 4 : arr.push(1); break;
            case 5 : arr.push(2); break;
            case 6 : arr.push(3); break;
            case 7 : arr=[]; break;
            case 8 : arr.push(4); break;
            case 9 : arr.push(5); break;
            case 10 : arr.push(6); break;
            case 11 : arr.pop(); break;
            case 12 : arr.push(7); break;
            case 13 : arr.push(8); break;
            case 14 : arr.push(9); break;

            case 16 : arr.push("."); break;
            case 17 : arr.push(0); break;
            case 18 : arr.push("("); break;
            case 19 : arr.push(")"); break;
        }

        for( let j=0 ; j<arr.length ; j++ ){
            str+=arr[j];
         }
         h1Obj.innerText = str;
    });
}

function isOperand(x){
    switch( x ) {
        case 0 : case 1 :  case 2 : case 3 : case 4 : case 5 : case 6 : case 7 : case 8 : case 9 : return true; 
        default : return false; 
    }
}

function solve( a , b , operation ) {
    if( operation=="+" )
       return (a+b);
    else if( operation=="-" ) 
       return (a-b);
    else if( operation=="*" )
       return (a*b);
    else if( operation=="/" )
       return (a/b);
}


function peek( stack ){
   return stack[ stack.length-1];
}

function priority( x ) {
   if( ( x=="+" ) || ( x=="-" ) )
      return 1;
   else if( (x=="*") || (x=="/") )
      return 2;
   else if( (x=="(") )
      return 0;
}

function calculate(){
    let stack1 = [], stack2 = [];
    let oprnd1, oprnd2, oprtn;
    
    arr.unshift( "(" );
    arr.push( ")" );

    for( let i=0 ; i<arr.length ; i++ ) {
           if( isOperand( arr[i] ) ) {
               let num = "";               
               while( isOperand( arr[i] ) || arr[i]=="." ){
                  num+=arr[i++];
               }
               i--;
               stack1.push( Number(num) );
               console.log(`${peek(stack1)} is operand hence pushed in Stk1!!`);
           } 
           else{
               if( arr[i]=='(') {
                  stack2.push(arr[i]);
                  console.log("else-1=> "+arr[i]+" entered in stack2!!");
               }
               else if( arr[i]==')' ){
                  while( stack2.length>0 && peek(stack2)!="(" ) {
                     oprnd2 = stack1.pop();
                     oprnd1 = stack1.pop();
                     oprtn = stack2.pop();
                     stack1.push( solve( oprnd1  , oprnd2 , oprtn ) );
                     console.log("else-2=> solved "+oprnd1+" "+oprtn+" "+oprnd2+" = "+peek(stack1));
                  }
                  let x = stack2.pop();
                  console.log("else-2=> "+x+" popped from stack2!!");
               }
               else{
                  while( stack2.length>0 && priority(peek(stack2))>=priority(arr[i]) ){
                    oprnd2 = stack1.pop();
                    oprnd1 = stack1.pop();
                    oprtn = stack2.pop();
                    stack1.push( solve( oprnd1  , oprnd2 , oprtn ) );
                    console.log("else-3=> solved "+oprnd1+" "+oprtn+" "+oprnd2+" = "+peek(stack1));
                  }
                  console.log("else-3=> "+arr[i]+" entered in stack2!!");
                  stack2.push( arr[i] );
               }
           }
    }

    console.log( peek(stack1) + " | "+ stack1.length + " | "+stack2.length);
    if( isNaN(peek(stack1)) || peek(stack1)===undefined || stack2.length!=0 ){
        h1Obj.innerHTML = `${str} = <br>ERROR!`;
    }
    else {
        h1Obj.innerHTML = `${str} = <br> ${stack1[0]}`;
    }
}

divObjs[15].addEventListener( "click" , function(){
      calculate();
});