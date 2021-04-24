/*
Q1. I want this code to log out "hey amy", but it logs out "hey arnold" - why?

function greet(person) {
    if (person == { name: 'amy' }) {
        return 'hey amy'
    } else {
        return 'hey arnold'
    }
}
greet({ name: 'amy' })

Q1 answer : 
This is because person is an object and one cannot do comparison with an object ({ name: 'amy' } != { name: 'amy' }). Propose fixes is one have to 
deconstruct the person object to get the value of  "name". Then do comparison if the name is Amy or Arnold. Furthermore,
always use strict comparitor for proper coding practices.
*/

// Fixes
function greet(person) {
    let { name } = person;
    if (name === "amy") {
        return "hey amy";
    } else {
        return "hey arnold";
    }
}

// or

function greet({ name }) {
    if (name === "amy") {
        return "hey amy";
    } else {
        return "hey arnold";
    }
}

// or

function greet(name) {
    if (person.name === "amy") {
        return "hey amy";
    } else {
        return "hey arnold";
    }
}

/*

Q2. I want this code to log out the numbers 0, 1, 2, 3 in that order, but it doesn’t do what I expect. Why?

for (var i = 0; i < 4; i++) {
    setTimeout(() => console.log(i), 0)
}

Q2 answer: The function argument to setTimeout is closing over the loop variable. 
The loop finishes before the first timeout and displays the current value of i, which is 4.
Furthermore, var is a function scope while let is block scope.
Therefore using let will solve the problem because when using let, each loop is block scope rather than
var where is replace the function scope of the variable.
*/

// Fixes
for (let i = 0; i < 4; i++) {
    setTimeout(() => console.log(i), 0);
}
// or
for (var i = 0; i < 4; i++) {
    console.log(i);
}

/*

Q3. I want this code to log out "doggo", but it logs out undefined!

let dog = {
    name: 'doggo',
    sayName() {
        console.log(this.name)
    }
}

let sayName = dog.sayName
sayName()

*/
let dog = {
    name: "doggo",
    sayName() {
        console.log(this.name);
    },
};

// Fixes
dog.sayName();
// or
dog.sayName.bind(dog)();
// or
let sayName = dog.sayName;
sayName.bind(dog)();
/*

Q4. I want my dog to bark(), but instead I get an error. Why?

function Dog(name) {
    this.name = name
}
Dog.bark = function() {
    console.log(this.name + ' says woof')
}
let fido = new Dog('fido')
fido.bark()

Q4 answer:
Since, we set the bark function on an another function (Dog()), 
this also means that it can be a constructor. In Javascript, functions are considered an object

*/

// Fixes
class Dog_class {
    constructor(name) {
        this.name = name;
    }
    bark() {
        console.log(this.name + " says woof");
    }
}

let class_fido = new Dog_class("fido");
class_fido.bark();

//or
function Dog_fun(name) {
    this.name = name;
}
Dog_fun.prototype.bark = function () {
    console.log(this.name + " says woof");
};
let fido = new Dog_fun("fido");
fido.bark();

//or

function Dog_func(name) {
    this.name = name;
}
Dog_func.bark = function () {
    console.log(this.name + " says woof");
};
var bark_bark = Dog_func.bark.bind(fido);
bark_bark();
/*

Q5. Why does this code return the results that it does?

function isBig(thing) {
    if (thing == 0 || thing == 1 || thing == 2) {
        return false
    }
        return true
}
isBig(1)    // false
isBig([2])  // false
isBig([3])  // true

Q5 answer:

isBig(1) -> if thing is == 1, it will return false
isBig([2]) -> since the comparator is using == , JS will implicitly convert [2] to 2 before comparing. Result will be false if using ===
isBig([3]) -> similar to the previous question, and if it does not satisfy the condition, it will return true

*/
