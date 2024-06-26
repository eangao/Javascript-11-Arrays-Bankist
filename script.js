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
const displayMovements = function (movements, sort = false) {
  // Now in our HTML here
  // is a little bit similar to text content.
  // So remember that now the difference
  // is that text content simply returns the text itself
  // while HTML returns everything, including the HTML.
  // So all the HTML tags will be included.
  containerMovements.innerHTML = '';

  //   All we want is to display a sorted movements array
  // but we do not want to sort the original underlying data.
  // So what do we do here?

  // Well, we simply take a copy of the movements array
  // and sort that.
  // And so that's what we use now slice for
  // and this is one of these situations
  // that I was telling you about earlier
  // where we need to actually create a copy,
  // using the slice method
  // and not the spread operator
  // because here we are in the middle of a chain.
  // And so we want to keep going after this
  // and so it's a lot better
  // to simply use the method here
  // so that we can then simply chain the sort method onto that.
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
          <div class="movements__type 
          movements__type--${type}">${i + 1} ${type}</div>          
          <div class="movements__value">${mov}€</div>
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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${income}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)

    // Great, but now let's say that the bank
    // introduces a new rule.
    // So now the bank only pays an interest
    // if that interest is at least one Euro
    // or whatever other currency.
    .filter((interest, i, arr) => {
      // console.log(arr);
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interest}€`;
};

// const labelBalance = document.querySelector('.balance__value');
// const labelSumIn = document.querySelector('.summary__value--in');
// const labelSumOut = document.querySelector('.summary__value--out');
// const labelSumInterest = document.querySelector('.summary__value--interest');

const createUsernames = function (accs) {
  //   And in this case, the side effects are gonna be
  // to change, so to mutate the original accounts array.

  //   and in this function, we do not return anything,
  //   because again, what we're doing here
  // is to produce a side effect.
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0]) // map always return the new value
      .join('');
  });
};
// const user = 'Steven Thomas Williams'; //stw
// console.log(createUsernames('Steven Thomas Williams'));

createUsernames(accounts);

// But now we actually want to compute
// one username for each of the account holders
// in our accounts array.
// So to do that, should we use the map
// or the for each method.
// Well, we do not want to create a new array
// in this situation,
// all we want to do is to modify the object,
// so the elements that already exist in the accounts array.

// console.log(accounts);

// So in this lecture, it was very important to understand
// the use case for the map method here, which was perfect,
// because it allowed us to create a new simple array,
// which only contains the initials of whatever name
// it is used on.
// And then on the other hand, the for each method,
// it was a great use case to produce
// some so called side effects.

// So in other words, to simply do some work
// without returning anything.
// And so that's what we did here,
// we simply looped over the accounts array,
// and in each iteration,
// we manipulated the current account object,
// and edit a username to it
// based on the account owner,
// plus all of these transformations
// that we had already done before.

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // And so in HTML, the default behavior,
  // when we click the Submit button, is for the page to reload.
  // So we need to stop that from happening.
  // And for that, we need to actually give this function
  // here, the event parameter, and let's just call it event.
  // And you already know how this callback function gets access
  // to this event object, remember?

  //prevent form from submitting
  e.preventDefault();

  // console.log('LOGIN');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  //   about something called optional chaining, remember?
  // So we can do this, and then this pin property
  // will only be read in case that the current account
  // here actually exists, remember that?
  // And so, this is a lot easier and a lot more elegant.
  // currentAccount && currentAccount.pin  === optional chaining - currentAccount?.pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('LOGIN');
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Now remember how I said in another project,
    // that it's also good to use classes for this?
    // Okay, but in this case, it's really just one style.
    // So it's not a big work to just do it like this.
    // So let's test this one out for now.

    //hide UI
    containerApp.style.opacity = 100;

    // Clear input fields

    // And we can do it like this,
    // login pin also set it to equal,
    // because the assignment operator works from right to left.
    inputLoginUsername.value = inputLoginPin.value = '';

    // We can use this blur function or method.
    // So just call blur, and so that will make
    // it so that this field loses its focus.
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    //needed even we apply optional chaining, if we input username that did not exist (receiverAcc?.username !== currentAccount.username) return true
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // console.log('Transfer valid');

    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

// And the some method will become helpful
// for this loan feature
// because our bank has a rule,
// which says that it only grants a loan
// if there at least one deposit
// with at least 10% of the requested loan amount.
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  // And so whenever we see or hear the word any,
  // we can already know that it's probably a good use case
  // for the some method.

  //   and so yeah, if at least one of the elements
  // in the movements array has this condition,
  // so it's true, so basically it's greater than 10%
  // of the requested amount,
  // then all of this here will become true.
  // And so the some method is perfect
  // to be used in a condition like this.
  // So when we need to test for something,

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // console.log('Delete');
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    console.log(index);
    // Now, the big difference here is that with indexOf,
    // we can only search for a value that is in the array.
    // So, if the array contains the 23, then it's true,
    // and if not, then it's false.
    // But on the other hand, with findIndex,
    // we can create a complex condition like this one,
    // and of course, it doesn't have to be
    // the equality operator here.
    // It can be anything that returns true or false,
    // .indexOf(23)

    //Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear input fields

  // And we can do it like this,
  // login pin also set it to equal,
  // because the assignment operator works from right to left.
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

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

///////////////////////////////////////////////////////////////
// Coding Challenge #1
///////////////////////////////////////////////////////////////

// // Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// // about their dog's age, and stored the data into an array (one array for each). For
// // now, they are just interested in knowing whether a dog is an adult or a puppy.
// // A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// // old.

// // Your tasks:

// // Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// // ('dogsJulia' and 'dogsKate'), and does the following things:

// // 1. Julia found out that the owners of the first and the last two dogs actually have
// // cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// // ages from that copied array (because it's a bad practice to mutate function
// // parameters)

// // 2. Create an array with both Julia's (corrected) and Kate's data

// // 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// // is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// // �
// // ")

// // 4. Run the function for both test datasets

// // Test data:
// // § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// // § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// // Hints: Use tools from all lectures in this section so far �
// // GOOD LUCK �

// const checkDogs = function (dogsJulia, dogsKate) {
//   // 1.

//   // My solutions
//   // const dogsJuliaCorrected = [...dogsJulia];
//   // console.log(dogsJuliaCorrected);
//   // dogsJuliaCorrected.shift();
//   // console.log(dogsJuliaCorrected);
//   // dogsJuliaCorrected.pop();
//   // console.log(dogsJuliaCorrected);
//   // dogsJuliaCorrected.pop();
//   // console.log(dogsJuliaCorrected);

//   // Instructor solution
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   console.log(dogsJuliaCorrected);

//   //2
//   //My solution
//   // const dogs = [...dogsJuliaCorrected, ...dogsKate];

//   //intructor solution
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//////////////////////////////////////////////////////////
// Data Transformations: map, filter, reduce
//////////////////////////////////////////////////////////

// In JavaScript,
// there are three big and important array methods
// that we use all the time to perform data transformations.
// So basically,
// these are methods that we use
// to create new arrays based
// on transforming data from other arrays.
// And in recent years,
// these tools have become really popular and for good reasons
// and therefore you'll see them everywhere you look
// in Modern JavaScript.
// And the tools I'm talking about are;
// map,
// filter
// and reduce.

// SEE PDF LECTURE

///////////////////////////////////////////////////////////
// The map Method
///////////////////////////////////////////////////////////

// // And as we just learned, the map method
// // is yet another way that we can use to loop over a race.
// // But unlike for each, the map method will give us
// // a brand new array
// // and this new array will contain in each position
// // the results of applying a callback function
// // to the original array elements.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// // So we already know that the map method will return
// // a brand new array.
// // modern way
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
//   // return 23;
// });
// console.log(movements);
// console.log(movementsUSD);

// // Great, and of course you can also see
// // that the original movements array
// // was not mutated at all right?
// // And so indeed the map method really only returns
// // in new array with the new elements.
// // And this really is the fundamentals
// // of how the map method works.
// // So we can use this
// // and we will use it in all kinds of different situations.

// const movementsUSDFor = [];
// for (const mov of movements) {
//   movementsUSDFor.push(mov * eurToUsd);
// }
// console.log(movementsUSDFor);

// //using arrow function

// // However many people don't like the way that this looks.
// // So they argued that this lacks the function
// // and the return keyword which they say
// // it leads to bad readability.
// // And that it makes this whole thing
// // more difficult to understand.
// // And while I can see that, that might be true.
// // I actually do prefer the fact how much smaller
// // and cleaner this code is.
// // So in my opinion if you understand well enough
// // how the arrow function actually works
// // then you will become familiar with this pretty quickly.
// // And so then there is no problem in writing code like this.
// // Okay, the main thing that you need to keep in mind
// // is that here we are actually returning this value.
// // So you need to remember
// // that this is like writing return here.

// const movementsUSDArrow = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSDArrow);

// // And so if you understand that, then you're good to go.
// // So I will actually use arrow functions in this situations
// // in the rest of the course, because I believe
// // that they are perfect for these small callback functions.
// // In my opinion they were really developed

// // But as always, if you do prefer the irregular
// // function syntax then please feel 100% free
// // to keep using them instead.

// // So just like to for each method,
// // the math method also has access
// // to the exact same three parameters.
// // So besides the current array element
// // which is this one here, we also get access
// // to the current index as well as the whole array.

// const movementsDescription = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescription);

// // So one more time, all we do here is to pass
// // this callback function into the map method, rigt?
// // But we do not call this function by ourselves.
// // It is the map method who we'll call this function
// // for each of the array elements in the movement array.
// // Okay, now each time that the map method calls or callback
// // it will simply pass in the current array element as well
// // as the current index and the whole array.

// // And off these three, here we are only using the first two,
// // just the current element and the current index, all right?
// // And with this, I hope that by now
// // it is really crystal clear how this all works.

// // Now you could say, that what we did here
// // with this map method is essentially the same
// // as what we did with the, for each method.
// // But in fact, there is a big, big difference
// // between these two approaches.
// // So before we printed each line individually
// // to the console, as we were looping over the array.

// // So in each of the iterations, we performed some action
// // that was then visible in the console
// // and we can call this a side effect.
// // So the, for each method creates side effects.
// // But now here with this map method,
// // all we did was to return each
// // of the strings from the callback.
// // And so basically they got added into a new array.
// // And then finally we logged that entire array
// // to the console and not the elements one by one.
// // And so here in this map method
// // we did not create a side effect in each of the iteration.
// // All we did was to build a brand new array
// // and this idea of side effects will become important again,
// // as we talk more about functional programming.
// // Great, and this is how the map method works,

///////////////////////////////////////////////////////////
// Computing Usernames
///////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// The filter Method
////////////////////////////////////////////////////////////////
// // Now let's learn about the Filter Method.
// // Which, as we learned before is used to filter for elements
// // that satisfy a certain condition.
// // And how do we specify such a condition?
// // Well, you guessed it, we use a callback function again.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // And just like the other callback functions like in the Map,
// // and for each, this one also gets access
// // to the current array element as well as the index
// // and the entire array.

// const deposits = movements.filter(function (mov, i, arr) {
//   return mov > 0;
// });

// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// // And so let's take a look now.
// // And, as expected we get the same result.
// // And so you could again ask, what is the big difference here?
// // Like, what's the big deal
// // and why not just use the four loop for everything.

// // And the reason for that is again the push that exists
// // in JavaScript for using more functional code, like this.
// // But there's also a more practical implication here.
// // And that's because we can actually chain
// // all of these methods together.

// // So, basically use them all one after another
// // to build a big final result.
// // So, a bit similar in fact to what we did here
// // in our application, right here.
// // But here we mixed string methods with array methods,
// // but later on we will do, like big chains,
// // only with array methods
// // and that would be completely impossible using the four loop.

// // So, that's another big advantage of using the methods
// // instead of the regular four loop.

// // Now, anyway I have just another small challenge
// // for you here which is to create an array of the withdrawals.
// // So, withdrawals like this.
// // So I want you to create this array without looking
// // at the code we already wrote.
// // And so the withdrawals should only include
// // the negative numbers too.
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

/////////////////////////////////////////////////////////////////
// The reduce Method
/////////////////////////////////////////////////////////////////
// // In this video, we're gonna talk about
// // the third data transformations method,
// // which is the reduce method.
// // And as you will remember,
// // we use the reduce method to essentially boil down
// // all the elements in an array to one single value.
// // And we talked about the example of
// // adding up all the numbers in one array, right?

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements);

// // Okay. So the reduce function also gets a callback function,
// // but this one is a little bit different from the other ones,

// // like the one in map or for each.
// // So in these other callbacks,
// // the first parameter is always
// // the current element of the array.
// // Let's call it current.
// // The second one is the current index
// // and the third one is the entire array.

// // But here in the callback function of the reduce method,
// // the first parameter is actually
// // something called the accumulator.
// // So let's call it acc like this
// // as an abbreviation of accumulator.
// // And this accumulator is essentially like a snowball
// // that keeps accumulating the value
// // that we ultimately want to return.

// // So in the case of adding all the elements
// // or all the numbers of an array together,
// // that will be the sum.

// //accumulator -> snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   //   So as always, this callback function here
//   // will be called in each iteration
//   // of a looping over the array.
//   // So reduce also loops over the array
//   // and calls this callback in each iteration,
//   // but now what will we actually do
//   // in each of these iterations?
//   // Well, since the accumulator is the value
//   // that we will keep adding to what we're gonna do here
//   // is to add the current value to the accumulator.
//   // So the accumulator plus the current value. Okay.

//   //   Finally, we also need to return this value here
//   // from the callback.
//   //   And so this is how the new accumulator
//   // can then be used in the next iteration of the loop.
//   // So basically in each loop iteration,
//   // we return the updated accumulator
//   // so the current one, plus the new current value.
//   // And so like this, we can then keep adding to it
//   // in the next iteration.

//   console.log(`Iteration ${i}: ${acc}`);
//   console.log(cur);
//   return acc + cur;
// }, 0); //second parameter,

// // but the reduce method actually has a another,
// // so a second parameter,
// // and that is the initial value of the accumulator.
// // So the value that we specify here,
// // which in this case is gonna be zero is the initial value
// // of the accumulator in the first loop iteration.
// // And so in this example, we want to start counting
// // or we want to start adding at zero.

// console.log(balance);

// let sum = 0;
// for (const mov of movements) sum += mov;
// console.log(sum);

// // but now we get indeed the same result.
// // And so here you can see this common pattern
// // that we always need an external variable
// // whenever we want to use a for loop.
// // And that's fine if you only need one loop,
// // but it starts to become really cumbersome
// // and unpractical when we use many loops
// // for doing many operations.
// // So these methods that we've been studying,
// // they completely avoid this extra variable
// // and they simply return the variable
// // or the value actually right away.

// const balance2 = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balance2);

// // Maximum value

// // So this time, what I want to do is to get the maximum value
// // of the movements array here.
// // Okay, so in this case,
// // the result we're looking for is this 3,000.
// // Okay. And so for that, we can also use reduce,
// // because remember reduce is for boiling down the array
// // into just one single value,
// // but that value can be whatever we want.

// // So it doesn't have to be a sum.
// // It could be a multiplication
// // or even something completely different,
// // like a string or an object,
// // but here we will keep working with numbers,
// // but this time we want the maximum number.

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov; // And so now we return to movement as the new accumulator in the next iteration.
// }, movements[0]); // always just go with the first value of the array.

// // Now we could have used zero here,
// // but that would not be correct
// // because imagine that the first value
// // would be like a negative,
// // then this might not work as expected.
// // Maybe it might work with the maximum,
// // but not with a minimum, for example.
// // So don't just put zero here
// // when you're trying to find a maximum or a minimum value,
// // always just go with the first value of the array.

// console.log(max);

// const max2 = movements.reduce(
//   (acc, mov) => (acc > mov ? acc : mov),
//   movements[0]
// );
// console.log('max2', max2);

///////////////////////////////////////////////////////////////
// Coding Challenge #2
///////////////////////////////////////////////////////////////

// // Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// // dog ages to human ages and calculate the average age of the dogs in their study.

// // Your tasks:

// // Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// // ages ('ages'), and does the following things in order:

// // 1. Calculate the dog age in human years using the following formula: if the dog is
// // <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// // humanAge = 16 + dogAge * 4

// // 2. Exclude all dogs that are less than 18 human years old (which is the same as
// // keeping dogs that are at least 18 years old)

// // 3. Calculate the average human age of all adult dogs (you should already know
// // from other challenges how we calculate averages �)

// // 4. Run the function for both test datasets

// // Test data:

// // § Data 1: [5, 2, 4, 1, 15, 8, 3]
// // § Data 2: [16, 6, 10, 5, 6, 1, 4]

// // GOOD LUCK �

// const calcAverageHumanAge = function (ages) {
//   console.log(ages);
//   // 1
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(humanAges);

//   // 2
//   const addults = humanAges.filter(age => age >= 18);
//   console.log(addults);

//   //3
//   // const average = addults.reduce((acc, curr) => acc + curr, 0) / addults.length;

//   //   Now, I just wanted to let that we could have done
//   // this average calculation here in a different way.
//   // So in a bit more complex way.

//   //2 3 ->  (2+3)/2 = 2.5 === 2/2+3/2 = 2.5
//   const average = addults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   return average;
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1);
// console.log(avg2);

//////////////////////////////////////////////////////////////////////
// The Magic of Chaining Methods
//////////////////////////////////////////////////////////////////////

// // So up until now,
// // we have been using the map filter
// // and reduce methods kind of in isolation.
// // However, we can take this one step further
// // by chaining all these methods one after another.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // For example, let's say that we wanted to take
// // all the movement deposits then convert them
// // from euros to dollars and finally add them all up,
// // so that we know exactly how much was deposited
// // into the account in US dollars.

// // So as I said, we want to take all of the deposits.
// const eurToUsd = 1.1;

// //PIPELINE
// const totalDepositUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// // and on this result, we can also call a reduce.
// // And of course we could also call more filters or more maps,

// console.log(totalDepositUSD);

// // And as I mentioned we could of course
// // chain many other methods here as well,
// // as long as they return new arrays.
// // So filter returns a new array.
// // So we could have added something else here
// // or the same goes for map, but reduce,
// // for example, will return a value.
// // So only this number in this case.
// // And so of course here we could now not have chained
// // a map or a filter after this.
// // So we can only chain a method after another one,
// // if the first one returns an array.

// // Now, when we chain all these methods together here,
// // it can be a little bit hard to debug
// // if one of the results is not what we expect.

// // For example,
// // if this result here would be something really weird,
// // we wouldn't really know from which step of this pipeline
// // it would come from, right?
// // And to solve this,
// // it would be good to check out the array
// // in each of these different steps.

// console.log(movements);

// //PIPELINE
// const totalDepositUSD2 = movements
//   .filter(mov => mov < 0)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * eurToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositUSD2);

// // And so this was just to show you that we can
// // inspect the current array at any stage of the pipeline
// // using the third parameter of the callback function.

// // And now just to finish this lecture,
// // let me just give you a couple of remarks about chaining.
// // So first we should not overuse chaining,
// // so we should try to optimize it
// // because chaining tons of methods one after the other
// // can cause a real performance issues
// // if we have really huge arrays.

// // So if we have a huge chain of methods,
// // chained one after the other,
// // we should try to compress all the functionality
// // that they do into as little methods as possible.

// // For example, sometimes we create way more
// // map methods then we actually need,
// // where we could just do it all in just one map call.

// // So when you chain methods like this,
// // keep looking for opportunities of
// // keeping up your codes performance.

// // And second, it is a bad practice in JavaScript
// // to chain methods that mutate the underlying original array.
// // And an example of that is the splice method.
// // So again, you should not chain a method
// // like the splice or the reverse method.

// // I mean, you can do that,
// // and for a small application like this one,
// // it's not a big deal and it's not going to cause problems,
// // but in a large scale application,
// // it's usually always a good practice
// // to avoid mutating arrays.

/////////////////////////////////////////////////////////////////
// Coding Challenge #3
/////////////////////////////////////////////////////////////////
// // Rewrite the 'calcAverageHumanAge' function from Challenge #2,
// //  but this time as an arrow function, and using chaining!

// // Test data:

// // § Data 1: [5, 2, 4, 1, 15, 8, 3]
// // § Data 2: [16, 6, 10, 5, 6, 1, 4]

// // GOOD LUCK �

// // from Challenge #2
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

//   const addults = humanAges.filter(age => age >= 18);

//   const average = addults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   return average;
// };

// // Coding Challenge #3 solution
// const calcAverageHumanAge2 = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1);
// console.log(avg2);

///////////////////////////////////////////////////////////////
// The find Method
///////////////////////////////////////////////////////////////

// // After the very important map, filter
// // and reduce methods,
// // we still have some more methods to learn
// // which are also super important and used all the time.
// // So in this lecture,
// // we're gonna talk about the Find method.

// // we can use the Find method to retrieve one element
// // of an array based on a condition.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // and so find and just like the other methods
// // that we've been talking about,
// // the Find method also accepts a condition.
// // And just like the other array methods we've been talking
// // about the find method also accepts a callback function
// // which will then be called as the method loops
// // over the array, all right?

// // So Find is basically just another method
// // that loops over the array
// // but then it does something different.
// // And in this case
// // what the Find method does is
// // to retrieve an element of the array.
// // So as always the current element of the iteration

// const firstWithdrawal = movements.find(mov => mov < 0);

// // So you see that just like the Filter method,
// // the Find method also needs a callback function
// // that returns a Boolean.

// // So the result of this is of course,
// // is either true or false.

// // Now, unlike the Filter method,
// // the Find method will actually not return a new array
// // but it will only return the first element
// // in the array that satisfies this condition.
// // So basically in other words,
// // the first element in the array for which
// // this operation here becomes true.

// console.log(movements);
// console.log(firstWithdrawal);

// // So as you see, the Find method is a bit similar
// // to the Filter method,

// // but there are two fundamental differences.

// // First Filter returns all the elements
// // that match the condition

// // while the Find method
// // only returns the first one and second
// // and even more important,
// // a new array

// // while Find only returns the element itself
// // and not an array,

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

///////////////////////////////////////////////////////////
// Implementing Login
///////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// The findIndex Method
////////////////////////////////////////////////////////////

// And the the findIndex method works
// almost the same way as find.
// But as the name says, findIndex returns the index
// of the found element and not the element itself.

// both the find and findIndex methods
// get access to also the current index,
// and the current entire array.
// So as always, besides the current element,
// these other two values are also available.
// But in practice, I never found these useful.

// And second, the both the find and findIndex methods
// were added to JavaScript in ES6.
// And so they will not work in like super old browsers.
// But don't worry, there is going to be a lecture
// a little bit later on how to support
// all of these old browsers.

////////////////////////////////////////////////////////
// some and every
////////////////////////////////////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements);

// //EQUALITY

// // So basically includes here returns true
// // if any value in the array is exactly equal to -130, right?
// // And so again, this is essentially testing for equality
// console.log(movements.includes(-130));

// // but what if we wanted to test for a condition instead?
// // And so that's where this some method comes into play.

// //SOME: CONDITION
// console.log(movements.some(mov => mov === -130));

// // So let's say that we would like to know
// // if there has been any deposits on this account.
// // So in other words, we want to know
// // if there is any positive movement in this array.
// // So any number above zero.

// // And so if there is any value
// // for which this condition is true,
// // then the some method will return true.
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// //EVERY

// // So again, the every method is pretty similar
// // to the some method
// // but as you might guess, the difference between them
// // is that every only returns true
// // if all of the elements in the array satisfy the condition
// // that we pass in.
// // So in other words, if every element passes the test
// // in our callback function,
// // only then the every method returns true
// // and that's why the method is called every
// // in the first place.

// //EVERY
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // And now to finish, there is now more cool thing
// // that I want to show you.
// // So up until this point,
// // we have always written the callback function directly
// // as an argument into our array methods, right?
// // However, we could also write this function separately
// // and then pass the function as a callback.

// //SEPERATE CALLBACK
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// // So let's say
// // separate callback
// // and so we could do this.
// // So let's call deposit to this function.
// // All right?

// // And so this function here is exactly the same as these ones
// // but as I just said,
// // there is no reason for them to being directly written here
// // in all of these array methods.

// // We could simply write them like this
// // and then all we would have to do
// // is to call movements.some, for example,
// // and then deposits or deposit.
// // And now we could reuse the same function
// // for all kinds of different methods
// // that require callbacks with a true/false condition.
// // So that could be every or filter as well.
// // Okay?

// // And so here is the result of these three operations
// // and so here we get the expected results.
// // And all by reusing the same function.
// // Then if we wanted to change the function,
// // all we would have to do is to change it here in one place
// // and then all the results
// // would become different according to that.

// // So in practice, that's something that we do sometimes
// // because this is, of course, better for the DRY principle.
// // So don't repeat yourself.
// // That's always important and it is important here as well.

/////////////////////////////////////////////////////////////////
// flat and flatMap
/////////////////////////////////////////////////////////////////

// // The next two array methods
// // that we're gonna learn,
// // are the flat and flat map methods.
// // And thankfully, these are very easy to understand.

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// // flat and also flat map
// // were introduced in ES2019.
// // So they are pretty recent,

// // So no callback function, adjust like this,
// // and we get indeed,
// // or full array from one to eight.
// // So (indistinct) removed the nested arrays
// // and flattened the array,
// // which is why the method is called flat.
// console.log(arr.flat());

// // which still contains the two inner arrays. All right.
// // So this means that the flat method,
// // only goes one level deep,
// // when flattening the array.
// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat());

// // So we can fortunately fix that,
// // by using the depth argument.
// // So right now, basically flat,
// // is running with the,
// // one here as the depth.
// // And so if we run it with one,
// // which is the default,
// // then we get this,

// // but we can go two levels deep.
// // And so now we get the same result as before.
// // And that's because it now goes,
// // even into the second level of nesting
// // and also takes the element out of depth array. All right.
// // So that's how flat works,
// // but this example is not really that useful.
// console.log(arrDeep.flat(2));

// //FLAT

// // And so let's go back
// // to the bank accounts.
// // So let's say that the bank itself,
// // wants to calculate the overall balance
// // of all the movements
// // of all the accounts.
// // So how would we go about solving this problem?
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// // And of course we can make this here,
// // a lot more beautiful.
// // So instead of doing all of this separately,
// // as you already know,
// // we can use chaining.
// const overallBalance2 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance2);

// // Now it turns out that, using a map first
// // and then flattening the result,
// // and it's a pretty common operation.

// // FLAT MAP

// // And so to solve this,
// // there is another method
// // that was also introduced
// // at the same time, which is flat map.

// // And so flat map essentially combines,
// // a map and a flat method,
// // into just one method,
// // which is better for performance.

// const overallBalance3 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance3);

// // Now just notice that, flat map here,
// // only goes one level deep
// // and we cannot change it.
// // So if you do need to go deeper than just one level,
// // you still need to use the flat method.

// // So anyway, keep these two in mind.
// // Whenever you find yourself in a situation
// // where you have nested the race
// // and need to work with them.

// // And believe me,
// // that happens more often than you think,
// // and I believe that,
// // even in the course of this course,
// // there is gonna be another situation.

//////////////////////////////////////////////////////////////////
// Sorting Arrays
//////////////////////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // And so in this lecture, let's talk about sorting arrays.
// // Now, sorting is a much-discussed topic in computer science
// // and there are countless algorithms and methods
// // of sorting values
// // and we might actually talk about this a little bit later
// // in the course.
// // For now though,
// // we're simple gonna use JavaScript's built-in sort method.

// // STRINGS
// const owners = ['Jonas', 'Zach', 'Adam', 'Matha'];
// console.log(owners.sort());

// // And so indeed, we now get our array here nicely sorted.
// // So alphabetically from A to Z.
// // So this works indeed just as expected, right?
// // Now, this actually mutates the original array.
// console.log(owners);

// // And so we have to be very careful with this method.

// // Numbers
// console.log(movements);
// console.log(movements.sort());

// // this time, the result
// // is not really what we are expecting, right?
// // These numbers are not at all ordered in any way, are they?
// // And the reason for this
// // is that the sort method
// // does the sorting based on strings, all right?

// // So that might sound weird
// // but that is just how it works by default.

// // So basically, what it does
// // is to convert everything to strings
// // and then it does the sorting itself.
// // And if we look at the result as if they were strings,

// // So again, if they were strings,
// // then this result would make sense.

// // But they are not strings
// // and so we have to fix this
// // and in fact, we can fix this
// // by passing in a compare callback function
// // into the sort method.

// // Ascending
// movements.sort((a, b) => {
//   //  return < 0 , A, B -> (Keep order)
//   //  return > 0 , B, A -> (switch order)
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// // and so let's write movements.sort
// // and we need to give it a callback function,
// // and this callback function is called with two arguments
// // and let's simply call them a and b.
// // Okay?

// // And these two parameters here
// // are essentially the current value and the next value
// // if we imagine the sort method looping over the array.
// // However, in order to understand
// // how the compare function works,
// // so how this callback function here works
// // and how we have to write it,
// // let's just think of a and b
// // as simply being two consecutive numbers in the array.
// // And it doesn't matter which ones.
// // So let's simply take these two.
// // So 450 and 400.

// // Now, in our callback function here,
// // if we return less than zero,
// // then the value a will be sorted before value b.
// // And the opposite, if we return a positive value,
// // then a will be put before b
// // in the sorted output array,

// // So if a is greater than b,
// // return, and let's say one.
// // And the number here doesn't really matter
// // as long as it's greater than zero.
// // And else, or actually let's write it like this,
// // so if b is greater than a,
// // then return something negative.
// // So just -1, okay?

// console.log(movements);

// // descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

// console.log(movements);

// // Now, if we are working with numbers,
// // then we can actually simplify this a lot
// // by simply using some simple math.
// // So let's take a look again here at our condition.
// // So we already know that if a is greater than b,
// // then a minus b would always be something positive, right?
// // And the same here with a less than b.
// // So if a is less than b,
// // then we know that a minus b
// // is always something negative
// // and something negative is exactly what we want
// // to return here, isn't it?

// // Ascending
// movements.sort((a, b) => a - b);
// console.log(movements);

// // So let's recap what we did here.
// // So again, we already know that if a is greater than b,
// // then this will be a positive number
// // and so here we then return that positive number.
// // It doesn't have to be exactly one.
// // Just something greater than zero.

// // Now, if it's the other way around,
// // if a is less than b, then this operation
// // will always be a negative number.
// // And so therefore, then something negative
// // is returned just as -1.
// // But again, it can be any number.
// // And by the way, if we return zero here,
// // so in case these two values are the same,
// // then their position simply remains unchanged.

// // descending
// movements.sort((a, b) => b - a);
// console.log(movements);

// // Now, if you have a mixed array,
// // like with strings and numbers together,
// // then this is not gonna work and I advise you
// // to simply not to use the sort method
// // in these cases anyway.
// // And that's because there's not really a point
// // in doing so.

///////////////////////////////////////////////////////////
// More Ways of Creating and Filling Arrays
//////////////////////////////////////////////////////////////

// // he last thing that we're gonna learn in this section
// // is how to programmatically create and fill arrays.

// // So far we have always simply created arrays like this.
// // Right?
// // So basically writing them out by hand, literally.
// // So just like this,
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log([1, 2, 3, 4, 5, 6, 7]);

// // or maybe we might've done it also like this.
// // So using a new Array, a constructor,
// // and then passing in all the numbers here as arguments,
// // and then that also creates this array.
// // Now in this cases we basically already have all data.
// // So for example, one, two, three, four, all the way to seven.
// // So that's the data that we already have.
// // And so therefore we could then manually create these arrays.
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // However, we can actually also generate
// // arrays programmatically,
// // so without having to define all the items manually.
// // And there are many situations in which this is necessary
// // and there are also multiple ways of doing it.
// // And the easiest one is to again,
// // use the Array() constructor function.

// //Empty array + fill method
// const x = new Array(7);
// // instead it creates a new array with seven empty elements
// // in there and it simply contains nothing.
// // So this output is very weird indeed.
// // And the reason for that
// // is this weird behavior of this Array() function
// // which does it so that whenever we only pass in one argument,
// // then it creates a new empty argument with that length.
// // So if we don't know about this special particularity
// // of the Array() constructor function
// // then this can lead to weird errors.
// console.log(x);

// // Now also we cannot really use this X array for anything.
// // For example, we cannot call the map() method on it
// // to now fill it up.
// // For example, we might want to do this map().
// console.log(x.map(() => 5));

// // So this is not really useful except for one thing,
// // because there is one method that we can call
// // on this empty array and that is the fill() method.
// // So that's a new method that we haven't studied yet,
// // but it's very straight forward.
// // So let me show it to you.
// // So that's x.fill() and then all we need to do
// // is to pass in a value and it will then fill up
// // the entire array with this specific value.

// // And this does actually mutate the underlying array.
// // so we can just change it there

// // x.fill(1);
// console.log(x);

// // So besides this value that we want to fill the array with,
// // we can also specify where we want it to start to fill.
// x.fill(1, 3, 5); //fill array with 1 value in position 3 to 5
// console.log(x);

// arr.fill(23, 4, 6); //fill with 23 in position 4 and 6
// console.log(arr);

// // the array from our first example?
// // So what if he wanted to create this arr array
// // programmatically?
// // Well, for that, we could use the Array.from() function.
// // So that's Array.from(),

// // And indeed we get here the exact same result
// // that we had before.
// // But in my opinion,
// // this is a lot cleaner than using this a weird new array
// // behavior than and together with the fill() method.
// // So in my opinion, this is way nicer.
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// // So again, this callback function here
// // is exactly like the one in a map() method.
// // So you can simply imagine that you're using this
// // as a callback function in calling the map() method
// // on an empty array.
// // And so as always, we get access to the current element
// // and the index.
// // And so adding one to the index will then give us values
// // from one to seven.
// // So Z meant...

// // because we do not need this current value at all.
// // But we still of course have to define something
// // as the first parameter because the index that we need
// // is only the second parameter.
// // But to denote that we are not using this current element,
// // we simply write an underscore.
// // And then other programmers
// // will also understand this convention
// // and automatically know that we don't use this parameter.
// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// // let's now move on and see a more real use case
// // of the Array.from() function.
// // Now, this Array.from() function
// // was initially introduced into JavaScript
// // in order to create arrays from array like structures.
// // So remember how I talked about so-called Iterables before,
// // so things like Strings, Maps or Sets,
// // they are all Iterables in JavaScript.
// // And so they can be converted to real arrays
// // using Array.from().
// // And that's the reason also for the name of the function,
// // because we can create arrays from other things.
// // All right.

// // Now, besides these obvious Iterables that I just mentioned,
// // like Maps or Sets another great example
// // of an array like structure
// // is the result of using querySelectorAll().
// // So maybe you remember that querySelectorAll() returns,
// // something called a NodeList,
// // which is something like an array,
// // which contains all the selected elements.
// // But it's not a real array,
// // and so it doesn't have methods like map(), for example.
// // But it's not a real array,
// // and so it doesn't have most of the array methods
// // like map() or reduce().

// // So if we actually wanted to use
// // a real array method like that on a NodeList,
// // we would first need to convert the NodeList to an array.
// // And for that Array.from() is perfect.
// // So let's do something here now.

// // And let's say that we do not have the movements
// // or for application here stored in an array.
// // So let me show that real quick.
// // So again, let's pretend that we only have these values,
// // so all of these movements only stored here
// // in the user interface,

// // but we do not have them somewhere in our code.
// // So we don't have an array containing these values.
// // But now let's say we want to calculate their sum.
// // And so therefore we need to somehow get them first
// // from the user interface and then do the calculation
// // based on that.
// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));

// // So let's just start by checking it out, movementsUI,
// // but now we only get two elements here,
// // and so that's the one that by the time we load
// // this script here are already in the user interface.
// console.log(movementsUI);

// // So if we wanted to actually select exactly these elements,
// // we would have to do this code here on some event handler.
// // So let's do that, actually.
// // Let's simply perform this action
// // when we click somewhere here.
// // Let's say here on this BalanceLabel.
// // So it doesn't matter where we click,
// // So that is called the Label Balance.
// // So we can attach a EventListeners to every object.
// // It doesn't have to be a button.
// // So I think we never did this actually.
// // But let's see what happens now.
// labelBalance.addEventListener('click', function () {
//   //   And again, remember that we are doing this
//   // so that we can now read these seven movements
//   // from the user interface as we click here.
//   // And indeed now it worked.
//   // So now we get these eight movements here.
//   // and you see that indeed,
//   // it is these values that we see now on the screen.
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     //     And then as a second step,
//     // we even included a mapping function,
//     // which then forms that initial array
//     // to an array exactly as we want it.
//     // So basically converting the raw element to its text content
//     // and replacing the Euro sign with nothing.
//     el => Number(el.textContent.replace('€', ''))
//   );

//   console.log(movementsUI);

//   //   But now let me also show you that we cannot
//   // call the map() method on it
//   // because the map() method would be useful to now actually get
//   // to adjust the number,
//   // because you'll see that here we also have
//   // this C or sign and so we need to get rid of that.
//   // And so the map() method would be perfect for that.
//   // console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
//   // console.log(movementsUI.map());
//   console.log(movementsUI);

//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
//   //   And by the way, I'm not sure if I mentioned it earlier,
//   // but there is another way of converting
//   // this here to an array,
//   // so let me grab it here.

//   // So movementsUI2, and then we can actually
//   // spread the results of this querySelectorAll()
//   // into a new array as well.
//   // So this also creates the array,

//   // but then we would have to do the mapping separately.
//   // And so actually I prefer this.

//   //  const movementsUI;

//   // So to me, the Array.from() function was a great addition
//   // to JavaScript in ES6.
//   // And that's actually all I had to tell you
//   // here in this video.
//   // So that was the last couple of methods and functions

//   // that we learned about a arrays.
//   // And indeed, we learned a lot of methods in the section.
//   // Now, keeping all of them in your mind
//   // to solve different tasks is of course,
//   // a very hard thing to do.
//   // And so to make sense of all this mess,
//   // in the next video, I will help you decide which array method
//   // you should use in each situation
//   // to solve different problems.
// });

//////////////////////////////////////////////////////////////////////
// Summary: Which Array Method to Use?
//////////////////////////////////////////////////////////////////////

// So, I did the math,
// and since the beginning of the course,
// we have studied, exactly 23 different array methods.
// And that's really amazing.
// And not just because,
// 23 is my favorite number,
// but because that means,
// that you cannot do everything you can imagine, with arrays.
// Now, the problem is that,
// choosing between 23 different methods,
// is not always easy.
// And especially when you just started learning about them.
// Right?

//see PDF lecture

// So probably, in your mind right now,
// there is a big confusion,
// between all these methods,
// and about which one to use, when.
// So, to help you out with that,

// I created this summary lecture,
// with all the 23 array methods.
// And I believe, that the best way to figure out,
// which method to use,
// in each situation,
// is by starting to ask the question,

// what do I actually want from this method?
// So do I want to mutate the original array,
// or do I want a new array?
// Do I maybe want an array index,
// or do I want to retrieve an entire array element?
// Or do I want to know,
// if an array includes, a certain element,
// or maybe I just want to get a new string,
// to transform the array to a new value,
// or simply to loop over the array?

////////////////////////////////////////////////////////////////////
// Array Methods Practice
////////////////////////////////////////////////////////////////////

// // 1

// // And the first exercise I wanna do here
// // is actually a very simple one
// // in which all we want to do is to calculate
// // how much has been deposited in total in the bank.
// // So in all the accounts across the bank.

// const bankDepositSum2 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);

// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum2);
// console.log(bankDepositSum);

// // 2

// // And now in exercise number two,
// // I want to count how many deposits there have been
// // in the bank with at least $1,000.

// //simple solution
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

// //solution using reduce
// // because as I mentioned before,
// // I actually want to show you
// // how we could do the same thing using reduce.
// const numDeposits1000_2 = accounts
//   .flatMap(acc => acc.movements)
//   // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
//   // .reduce((count, cur) => (cur >= 1000 ? count++ : count), 0);
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// console.log(numDeposits1000_2);

// let a = 10;
// console.log(a++);
// console.log(a);

// // Or at least we think so, because now as I reload,
// // we are back to this being zero.

// // So why do you think that is?
// // Well, there is actually something that I didn't tell you
// // about the plus plus operator.
// // And so I thought that this was a good opportunity
// // to maybe clear that up.
// // And for that,

// // let's simply do a very simple example down here.
// // Let's say, let a equal 10,
// // then let's log to the console a plus plus.
// // And so again, you see that a is actually still 10
// // even though we used this plus plus here.
// // So why is that?
// // Well, the plus plus operator
// // does actually increment the value
// // but it still returns the previous value.

// // So if we now log the a again here, you will see that now
// // it is indeed 11.
// // So the plus plus operator did its job here.
// // But the thing is that when we use it like this,
// // it will still return the all to value, which here was 10.

// // And so the same thing happened here.
// // So we did count plus plus
// // which then increased the value from zero to one.
// // But the result of this expression here is still zero.
// // And so zero was returned here to the next iteration.
// // And therefore in the end we will always have zero.
// // So like this, it's impossible to increase the value
// // to one, two, three, four, five, and six.
// // So this is actually something really important to understand
// // about the plus plus operator
// // and which I didn't make really clear before.

// //============
// // Now fortunately for us, there is an easy solution
// // because we can simply use the so-called
// // prefixed plus plus operator.
// // So we can write it before the operand.
// // So plus plus a, and so now the result of this here
// // should already be 11.
// // So both of these should now be 11.
// // And indeed they are.

// //Prefixed ++ operator
// let b = 10;
// console.log(++b);
// console.log(b);

// // 3

// // And now let's go to exercise number three
// // which will be an even more advanced case
// // of the reduce method.
// // And in this one what we're gonna do
// // is to create a new object instead of just a number
// // or just a string,

// // because why not?
// // So we already know that reduce boils down a array
// // to just one value.
// // And so that value might very well be an object.
// // It could even be a new array as well.
// // And in fact, we could use reduce to replace many
// // of the other methods that we have.
// // So reduce really is like the Swiss knife of array methods.
// // We could use it for everything.

// // on this exercise of which the goal is to create an object
// // which contains the sum of the deposits
// // and of the withdrawals.
// // So basically we want to calculate these two sums
// // all at the same time, all in one go using the reduce method.

// // the goal of this exercise is to create an object.
// // And so our starting point then of course also needs
// // to be an object.
// // And this could be an empty object

// const sums = accounts
//   // const { deposits, withdrawals } = accounts // commented to preserve my notes
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);

//       //       Now, usually that happens implicitly like here
//       // but you already know that this here has an implicit return.
//       // But this is easy to forget in these cases.
//       // So that's why I'm emphasizing it here.
//       // So again, we always need to return in the end,
//       // the accumulator.

//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// //   And this could be an empty object just like this
// // or we could of course also already start filling it.
// // So let's say that we want to start with deposits of zero
// // and withdrawals at zero as well.

// console.log(sums);

// // And let's actually distract this object immediately
// // so we can do this.
// // So we need to now use the exact same names as here.
// // So deposits and withdrawals.
// // And so here we can now log these two to the console.
// // And indeed, we now get these two values here.

// //with distraction
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       //       but I don't really like this part here so much.
//       // So let me just show you another way in which we could do it.
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);

//       // And so we can actually do this.
//       // So here we can now conditionally say
//       // that we want to select either deposits
//       // or withdrawals based on this condition.

//       //       and yeah so we get the same result.
//       // But I think that this way here is just a little bit cleaner
//       // but in any way, what matters here is that we were able
//       // to create a brand new object based on the reduced methods.
//       // And this can be really helpful in many situations.
//       //       And so please take some time to review this exercise
//       // because this was really a great use case
//       // on how to use something other than a primitive value
//       // as the accumulator of the reduced method.
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits, withdrawals);

// // And I would even challenge you to do this with arrays.
// // So as a challenge would challenge you to recreate
// // any of the examples that we did previously
// // in the section with map filter and reduce
// // to use only the reduce method.
// // And that is totally possible.
// // And so, yeah, you can try that out.
// // You don't have to, and I will certainly not do that now
// // but as an exercise and to get an even better understanding
// // of the reduced method, you could totally do that.

// //challenge - solve using reduce the first exercise

// // And the first exercise I wanna do here
// // is actually a very simple one
// // in which all we want to do is to calculate
// // how much has been deposited in total in the bank.
// // So in all the accounts across the bank.

// // original solution

// // const bankDepositSum = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov > 0)
// //   .reduce((sum, cur) => sum + cur, 0);
// // console.log(bankDepositSum);

// //challenge solution
// const bankDepositSum3 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((sum, cur) => {
//     cur > 0 ? (sum += cur) : sum;

//     return sum;
//   }, 0);

// console.log(bankDepositSum3);

// // 4

// // what I want to do now
// // is to create a simple function to convert any string
// // to a title case.
// // So title case basically means that all the words
// // in a sentence are capitalized except for some of them.
// // So there are some exceptions.
// // Let me try an example here.

// // this is a nice title -> This Is a Nice Title

// // nd so this is gonna be a nice exercise combining string
// // and array methods, all in one function.

// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');

//   return capitalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

//////////////////////////////////////////////////////////////////
// Coding Challenge #4
//////////////////////////////////////////////////////////////////

// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).

// Your tasks:

// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)

// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) �

// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').

// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"

// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)

// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)

// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects �)

// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them �

// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.

// Test data:

//  const dogs = [
//  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//  { weight: 8, curFood: 200, owners: ['Matilda'] },
//  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//  { weight: 32, curFood: 340, owners: ['Michael'] },
//  ];

// GOOD LUCK

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1

dogs.forEach((dog, i, arr) => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

// 2

const sarahDog = dogs.find(
  (dog, i) => dog.owners.find(owner => owner === 'Sarah') //dog.owners.includes('Sarah') is the other solution
);

console.log(sarahDog);

console.log(
  `Sarah's dog is eating too ${
    sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'
  }`
);

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooLittle);

// 4

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

//6

const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7

const okayDogs = dogs.filter(checkEatingOkay);
console.log(okayDogs);

//8
const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);
