'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// So yah, so one object for each account
// and you could ask why not use a map instead of an object.
// Well the thing is that we're gonna pretend
// that all these data is coming from a Web API.
// So a little bit like we talked about earlier.
// And whenever we get data from an API
// this data usually comes in a form of objects.

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

// And so it's a good practice to pass the data
// into a function
// instead of, for example, having this function work
// with a global variable.
// That would work as well
// but it's a lot better to pass that data directly
// into the function.
const displayMovements = function (movements) {
  // Now in our HTML here
  // is a little bit similar to text content.
  // So remember that now the difference
  // is that text content simply returns the text itself
  // while HTML returns everything, including the HTML.
  // So all the HTML tags will be included.
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
          <div class="movements__type 
          movements__type--${type}">${i + 1} ${type}</div>          
          <div class="movements__value">${mov}</div>
      </div>
    `;

    //docs insertAdjacentHTML
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

    // We're only inserting new HTML here
    // inside of the containerMovements
    // but we are not overriding anything.
    // And so actually that has to be the first thing that we do.
    // So the first thing is to essentially
    // empty the entire container
    // and only then we start adding new elements.
    // So that's something common to do
    // and it is also not difficult at all.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
// // There's a new,
// // very simple array method in ES2022,
// // which is the At Method.

// const arr = [23, 11, 64];
// console.log(arr[0]); // array at position zero
// console.log(arr.at(0)); // array at position zero

// // So basically we can now replace
// // the traditional bracket notation
// // with the more modern looking At Method,
// // if we prefer to use array methods like this.

// // Now, maybe this doesn't look all too useful.
// // So, what's the big deal here?
// // Well, actually there is one particularity of the At Method,
// // which makes it quite useful to use
// // instead of the brackets notation.

// // getting the last array element - traditional
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);

// //new method
// console.log(arr.at(-1));

// // Now the only question is,
// // should you use this new At Method
// // or should you keep using the bracket notation?
// // Well, as always, it depends.

// // So, if you want to get to the last element of an array,
// // or basically start counting from the end of an array,
// // then you should probably start using the At Method.

// // Also, if you want to do something called "method chaining",
// // which we will talk about later in this section,
// // then the At Method is also perfect for that.
// // So basically combining multiple methods
// // all at the same time.
// // And then, it's quite helpful to use
// // the At Method instead of the brackets notation.

// // Now, on the other hand,
// // if you just want to quickly get a value from an array,
// // so just like the first element,
// // then of course you can keep using the brackets notation.
// // And personally, I also do that all the time.
// // So basically if all you want to do is something like this,
// // then you can simply keep using the square brackets.
// // Okay.

// // Oh, and by the way,
// // I actually also wanted to let you know that the At Method
// // also works on strings.
// console.log('elmar'.at(0));
// console.log('elmar'.at(-1));

////////////////////////////////////////////////////////////
// Looping Arrays: forEach
////////////////////////////////////////////////////////////

// // In this lecture we will loop over an array
// // using the forEach method.
// // Now we had already learned
// // how to loop over an array using the for of loop,
// // but the forEach method is really fundamentally different.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // So these positive values here are basically deposits
// // and the negative values are withdrawals.

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdraw ${Math.abs(movement)}`);
//   }
// }

// // but now let's finally learn how to use the forEach method
// // to achieve the exact same thing
// // but in my opinion in an easier way.
// // So to loop over the movements array
// // we use forEach,
// // and that's with a capital E, don't forget that.
// // And then the forEach method
// // actually requires a callback function here.
// // So forEach is technically a higher order function
// // as we learned in the last section,
// // which requires a callback function
// // in order to tell it what to do.

// // So it's the forEach method here
// // that will call this callback function.
// // We are not calling it ourselves as always.
// // And that's of course important to keep in mind once again,
// // But when exactly will forEach actually
// // call this callback function.
// // Well what the forEach method does is to loop over the array,
// // and in each iteration it will execute
// // this callback function here.
// // Also as the forEach method calls this callback function
// // in each iteration it will pass in the current element
// // of the array as an argument,

// // and we can specify that here
// // and let's call that again movement.
// // So again, each time this callback here is called,
// // so in each iteration,
// // it will receive the current element of the array
// // as an argument.

// console.log('------FOREACH-------');
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdraw ${Math.abs(movement)}`);
//   }
// });

// // 0: function(200)
// // 1: function(450)
// // 2: function(400)
// // ...

// // So basically this is exactly the concept that I explained
// // In the last section
// // when I said that we use a callback function
// // to tell another higher order function
// // exactly what it should do,
// // and so in this case we tell forEach
// // that in each iteration
// // it should log one of these two strings here to the console
// // So we give the forEach method instructions
// // by giving it a callback function
// // which contains these instructions, alright.
// // And I really know and understand
// // that this is quite a hard concept to wrap your head around.
// // But if you just continue using this from now on
// // then eventually it will start to make sense, believe me.

// // Well I think that we can both agree
// // that it is the forEach method, right.
// // And maybe you don't agree with that
// // and of course that's okay,
// // as I keep mentioning
// // it's always good to develop your own style of programming.

// // So entries is in fact just another array method
// // and it returns an array of arrays,
// // remember, which in the first position
// // contains the current index
// // and then the value itself.
// // And so this is how we access
// // the counter variable in the for of loop.
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
//   }
// }

// // And here, fortunately, it's a lot easier
// // to get access to the current index.
// // So to understand how it works we need to remember once more
// // that it is the forEach method
// // who calls this callback function in each iteration.
// // And as it calls this function
// // it also passes in the current element of the array,
// // but actually that's not all it passes in

// // in fact forEach passes in the current element,
// // the index and the entire array that we are looping.
// // And so therefore we can specify them here
// // in our parameter list.
// // So let's say index and array,

// // now of course we can just use one, like we have been doing,
// // or we can just use two,
// // or we can use all three together.
// // And as always the names here do not matter at all,
// // but what does matter is the order.
// // So the first parameter always needs to be
// // the current element,
// // the second parameter always the current index
// // and the third one always the entire array
// // that we are looping over.
// // Because that's the order in which the arguments,
// // so the actual values, are passed into our callback function.

// // And in fact in the real world we actually use
// // shorter names.
// console.log('------FOREACH with index-------');
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdraw ${Math.abs(mov)}`);
//   }
// });

// // Now when should you use forEach
// // and when should you use the for of loop.

// // Well one fundamental difference
// // between the two of them is that you cannot break out
// // of a forEach loop.
// // So the continue and break statements
// // do not work in a forEach loop at all.
// // So instead, forEach will always loop over the entire array
// // and there is nothing that you can do about it.

// // So if you really need to break out of a loop
// // then you have to keep using the for of loop,

// // but other than that
// // it really comes down to your personal preference.
// // Just like so many other things in JavaScript.
// // So every programming language always has
// // many different ways or different tools
// // to achieve the same thing.
// // And specially as more things
// // keep getting added to the language
// // there will always be more options to achieve the same result

// // All right, and with this we wrap up this lecture.
// // SO in my opinion this is a really brilliant
// // and powerful mechanism,
// // but I know that it's also rather complex
// // to wrap your head around this, isn't it?
// // And it actually took quite some time for me
// // to fully understand this myself, back in the day.
// // So please don't become frustrated with this,
// // it will all become obvious with the practice.
// // So just keep using this and then you will be fine.
// // Once you do understand exactly how this works
// // so specially this mechanism of the callback
// // and of the passing arguments into this callback here
// // so once you understand this fundamental mechanism
// // then working with all other array methods
// // in this section will become really easy.
// // Because most of them follow the exact same principle
// // of the callback function that we just explored here.
// // So please review this lecture carefully, and yeah.
// // If you really understand
// // the role of the callback function here

///////////////////////////////////////////////////////////////////
// forEach With Maps and Sets
///////////////////////////////////////////////////////////////////
// // So we learned about the forEach method on arrays.
// // However, forEach is also available on maps and sets.
// // And so let's take a small detour now
// // and see how forEach works with maps and with sets.

// // MAP

// // And remember that in this array of arrays,
// // each of these array elements, so this inner array,
// // will be one entry of the map,
// // where this here is the key -(USD), and this is the value (United States dollar).
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // And so we can call forEach also on a map.
// // So forEach, and then again, the callback function,
// // and now this callback function also has three parameters.
// // So when the forEach method calls it,
// // it will call this function with three arguments.
// // So the first one will be the current value,
// // so the current value in the current iteration,
// // the second one is the key, and the third one
// // is the entire map that is being looped over.

// // And so you see, this is similar to the array,
// // where in the array,
// // the first parameter is the current element of the array,
// // the second one is the index
// // and the third is the entire array.
// // And so there is a nice correspondence between these,
// // and so this is quite easy to memorize here.

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// //SET

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

// // And so what this means is that the key here
// // is exactly the same as the value.
// // So why is that?

// // Well, a set doesn't have keys, right?
// // And it doesn't have indexes either.
// // And so there is no value that would make sense for the key.
// // All right, so essentially this key here
// // makes no sense at all.
// // It wouldn't even have to be there.
// // And so the people who designed this forEach method for sets,
// // they could have simply omitted the second argument, right?

// // Well, if they did that,
// // then this forEach would have been different from the others.
// // And so that would then create confusion in developers,
// // and therefore it was decided to keep the same signature.
// // So basically to keep the same three parameters
// // in this callback function and simply
// // to set the second one to the first one.
// // So we can just write value here as well,
// // just to avoid that confusion.

// // we cannot have the duplicate parameter name.
// // And so we can just use an underscore,
// // which in JavaScript means a throwaway variable.
// // So that means a variable that is completely unnecessary.
// // So it's just a convention which we will see again
// // a little bit later.

/////////////////////////////////////////////////////////////////
// PROJECT: "Bankist" App
/////////////////////////////////////////////////////////////////

//see video the instructions
//see flowchat image attached

///////////////////////////////////////////////////////
// Creating DOM Elements
///////////////////////////////////////////////////////
