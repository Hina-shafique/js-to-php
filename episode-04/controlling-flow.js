// flow control

if (1 < 3) {
  console.log("1 is less than 3");
} else if (1 > 3) {
  //
} else {
  //
}

//turnary operator

var value = 1 < 3 ? "1 is less than 3" : "1 is greater than 3";

// switch statement

var value = "hello";
switch (value) {
  case "HELLO":
    // some condition
    break;
  case "world":
    // some condition
    break;

  default:
    break;
}

// for loop

for (var ii = 0; ii < 10; ii++) {
  console.log(ii);
}

// while loop
var ii = 0;
while (ii < 10) {
  console.log(ii);
  ii++;
}

// do while loop
var ii = 0;
do {
  console.log(ii);
  ii++;
} while (ii < 10);

// Array in iteration loop

var fruits = ["apple", "banana", "orange", "cherry"];

for (var fruit of fruits) {
  // fruit is individual element in the array
  console.log(fruit);
}

// loop iterating with key like key value pair

var person = {
  //person object literal notation
  frirstName: "john", //[property name: value]
  lastName: "doe",
};

for (var prop in person) {
  if (prop === "firstName") {
    console.log(`${prop}: ${person[prop]}`);
    break; // if we want to stop iteration
  }
}

//continue statement
for (var prop in person) {
  if (prop === "firstName") {
    continue; // if we want to skip this iteration
  }
  console.log(`${prop}: ${person[prop]}`);
}
