'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Simple Array Methods
/////////////////////////////////////////////////
// // Now before we start, let's quickly talk about why arrays
// // do actually have methods.
// // Well, remember that methods are simply functions
// // that we can call on objects.
// // So basically, they are functions attached to objects.
// // So if we have array methods, that means that
// // arrays themselves are also objects.
// // And so these array methods are simply functions
// // that are attached to all arrays
// // that we create in JavaScript.

// // Now, we will learn why all arrays have access
// // to this methods in a later section
// // when we talk about prototypal inheritance.
// // But for now, I just want you to understand that arrays
// // are objects, and that they get access to special
// // built in methods that we can essentially
// // see as tools for arrays.
// // And so as I mentioned, in this lecture, we're gonna start
// // by learning some very simple tools
// // that we can use on arrays.

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //=================
// // SLICE METHOD

// // Alright, the first method we're gonna talk about
// // is the slice method.
// // And this one is very similar to the slice method
// // that's available on strings, remember?
// // So with the slice method, we can extract part of any array,
// // but without changing the original array.
// // So essentially, we can take a slice of an array.
// // And so that's why it's called slice.
// // So array.slice, and now just like in strings,
// // we have the begin parameter.

// console.log(arr.slice(2));
// // will return a new array
// // So as I said, this does not mutate the original arr, array.
// // Instead it returns a new array.
// // So a copy of the array, but only with the extracted parts.

// console.log(arr.slice(2, 4));
// // the end parameter here is not included in the output.

// // And so the length of the output array right here
// // will be the end parameter minus the beginning one.

// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// // So minus one will basically take the last two elements
// // of the array, so D and E.
// // And so with this, it's pre

// console.log(arr.slice(1, -2));

// // to simply create a shallow copy of any array.
// console.log(arr.slice());

// // something similar in one of the previous sections,
// // but using the spread operator, remember?
// // So back then we did this.
// // So creating a new array, and then expanding
// // the original array into that.
// // And so that gives us the exact same result.
// console.log([...arr]);

// // So the question is, should you use the spread operator
// // or the slice method, in order to create a shallow copy?
// // Well, that's actually entirely up to you.
// // So it's just a matter of personal preference.
// // The only time you really need to use the slice method here
// // is when you want to chain multiple methods together
// // so calling one after the other.
// // And we will do that, of course, later in this section.
// // All right.
// // So that is the slice method.

// //================
// // SPLICE

// // And a splice method works in almost the same way as slice.
// // But the fundamental difference is that
// // it does actually change the original array.
// // So it mutates that array.

// // console.log(arr.splice(2));

// // But now, watch what happened to our original array,
// // and we see that all that remains here in our original array
// // is the first two elements.
// // And so now the extracted elements are actually gone
// // from the original array.
// // So splice deleted them.
// // And so what we can see is that splice actually does mutate
// // the original array, so it takes part of the array
// // and returns it and then the original array itself
// // loses this part that was extracted.
// console.log(arr);

// // Now in practice, most of the time the value that
// // the splice method returns, doesn't even interest us.
// // All we are usually interested in is to just delete
// // one or more elements from an array using splice.
// // And one pretty common use case is to simply remove
// // the last element of an array.
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2); //number of element to delete
// console.log(arr);

// // splice reference
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

// //===============
// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

// // But now what's important to note here is the fact
// // that the reverse method does actually mutate
// // the original array.
// console.log(arr2);

// //==================
// // CONCAT

// // And so this one is used to concatenate two arrays.

// const letters = arr.concat(arr2);
// console.log(letters);

// // And once again, we already did this before,
// // in another way, remember?
// console.log([...arr, ...arr2]);

// // This gives us the exact same result
// // and it also does not mutate any of the involved arrays.
// // So just like concat, which also doesn't mutate
// // the original array here, alright.

// // And by the way, here in this concat method,
// // so if you prefer to do this one is of course perfectly fine.
// // And once again, it is just a matter of personal preference,
// // whether you prefer to use the spread operator,
// // or the concat method.
// // All right.

// //================
// //JOIN

// // And finally, just the join method
// // that we already talked about before,
// // but just for the sake of completion here, right.

// console.log(letters.join(' - '));

// // Okay, and so as you already know, the result here
// // is a string with the separator that we specified.
// // Great.

// // So your array tool set is rapidly growing here.
// // And remember that you already know push on shift,
// // pop shift, index of n includes from the intersection.
// // Now if you ever lose track of all these different methods,
// // and how they work, you can always come back to these videos.

// // Or of course, check the documentation on MDN,
// // just like we did here.

// // So no developer in the world knows all of this by heart.
// // So sometimes I even have to look up how the splice
// // or the slice method works,
// // because it's just too many methods to keep track of.
// // And, yeah, it's very hard to know everything by heart.

///////////////////////////////////////////////////////////
// The new at Method
///////////////////////////////////////////////////////////
// There's a new,
// very simple array method in ES2022,
// which is the At Method.

const arr = [23, 11, 64];
console.log(arr[0]); // array at position zero
console.log(arr.at(0)); // array at position zero

// So basically we can now replace
// the traditional bracket notation
// with the more modern looking At Method,
// if we prefer to use array methods like this.

// Now, maybe this doesn't look all too useful.
// So, what's the big deal here?
// Well, actually there is one particularity of the At Method,
// which makes it quite useful to use
// instead of the brackets notation.

// getting the last array element - traditional
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);

//new method
console.log(arr.at(-1));

// Now the only question is,
// should you use this new At Method
// or should you keep using the bracket notation?
// Well, as always, it depends.

// So, if you want to get to the last element of an array,
// or basically start counting from the end of an array,
// then you should probably start using the At Method.

// Also, if you want to do something called "method chaining",
// which we will talk about later in this section,
// then the At Method is also perfect for that.
// So basically combining multiple methods
// all at the same time.
// And then, it's quite helpful to use
// the At Method instead of the brackets notation.

// Now, on the other hand,
// if you just want to quickly get a value from an array,
// so just like the first element,
// then of course you can keep using the brackets notation.
// And personally, I also do that all the time.
// So basically if all you want to do is something like this,
// then you can simply keep using the square brackets.
// Okay.

// Oh, and by the way,
// I actually also wanted to let you know that the At Method
// also works on strings.
console.log('elmar'.at(0));
console.log('elmar'.at(-1));
