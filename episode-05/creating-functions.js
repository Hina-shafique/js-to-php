// functions
// Hoisting means that before any code executes, JavaScript scans the file and moves certain declarations to the top.
// Function declarations are hoisted, so you can call them before they are defined in the code

// anonymous function

(function () {      //IIFE - Immediately Invoked Function Expression
  //protecting the code from global scope pollution

  function doNothing() {
    // return undefined
  }

  alert(sum(1, 3)); // run this before the function is defined bcz of hoisting

  var foo = doNothing(); // foo is undefined

  // function declaration syntax

  function sum(a, b) {
    // function key word, followed by function name and parameters
    return a + b;
  }

  // function expressions

  var diff = function (a, b) {
    // anonymous function assigned to a variable
    return a - b;
  };

  // arrow function syntax

  var multiply = (a, b) => a * b;
  //complex
  var divide = (a, b) => {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  };

})();
