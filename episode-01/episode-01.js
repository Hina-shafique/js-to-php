function helloWorld() {
  alert("hello world");
}

function sum(a,b){
    return a+b;
}

function divide(a,b){
    if(b == 0){
        throw new Error("can't divide by zero");
    }

    return a/b;
}

function sayHello(name){
    var message;
    message = "hello" + name;

    //object . property(method)

    message. toUpperCase();
}

