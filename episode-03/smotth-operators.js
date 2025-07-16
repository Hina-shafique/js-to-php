// + operator (sum, concatinate)

var str1 = "hello";
var str2 = str1 + "world"; // hello world
var str3 = '${str1}, world'; //template string (hello, world)

var result1 = 1 + '2'; // 12 (string concatenation)
var result2 = 1 + 2 + '2'; // 32 (number addition first, then concatenation)
var result3 = 1 + 2 + '2' + [2,4]; // 322,4 (after the string, array is converted to string)

var result4 = 1 - '2'; //-1 (string is converted to number)
var result5 = 1 < '2'; // true (string is converted to number for comparison)
var result = 1 < 'a'; //false (string is not converted to number)
var result6 = 1 > []; //true (empty array is converted to 0)

//falsy values

var emptyString = ''; 
var zero = 0; 
var nullValue = null; 
var undefinedValue = undefined;
var falseValue = false;
var emptyArray = [];
var zeroString = '0';

//equality operator (==)

var value1 = 1 == '1';

//identity operator (===)
var value2 = 1 === '1'; // false (type and value must match)

//inequality operator (!=)
var value3 = 1 != '1'; // false (value is the same, but types differ)
//identity inequality operator (!==)
var value4 = 1 !== '1'; // true (type and value must match)

//increment and decrement operators

var value5 = 1++;
var value6 = 1--;

//arrays

var array1 = [1, 2, 3];
var array2 = [...array1, 4, 5]; // [1, 2, 3, 4, 5] (spread operator)

function sum(...args){
    return args.reduce((a, b)=> a + b, 0);
}

sum(1, 2, 3, 4); // 10 (sums all arguments)