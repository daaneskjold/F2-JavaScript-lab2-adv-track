'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

function Blob() {
  this.consumptionRate = 1;
}

var blob = new Blob();
var downingtonPopulation = 1000;
var hoursSpentInDowington = 0;

for (hoursSpentInDowington = 0; downingtonPopulation > 0 ; hoursSpentInDowington++) {
  downingtonPopulation -= blob.consumptionRate;
  blob.consumptionRate++;
}

console.log('Time taken to consume Dowington: ' + hoursSpentInDowington + ' hours.'); //+ ' Population:' + downingtonPopulation + 'consumptionRate' + blob.consumptionRate);

// TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
  var timetoConsume = 0;

  if (population === 0) return timetoConsume; // Added a quick validation for the empty population scenario.

  // If this passes then we instanciate a new blob.

  var blob = new Blob();
  blob.consumptionRate = peoplePerHour;

  for (timetoConsume = 0; population > 0 ; timetoConsume++) {
    population -= blob.consumptionRate;
    blob.consumptionRate++;
  }

  return timetoConsume;
}

Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

assert(blob.hoursToOoze(1000, 1) === 45, 'Another validation for the method using a value we already know');
assert(blob.hoursToOoze(1000, 1) != 47, 'A negative testing scenario');
assert(blob.hoursToOoze(2, 2) === 1, 'Validating that it only takes 1 hour to clear a town with 2 guys');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(homePlanet, language) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.homeLanguage = language;
}

// sb is a SentientBeing object
function sayHello(sb) {
  // TODO: say hello prints out (console.log's) hello in the
  // language of the speaker, but returns it in the language
  // of the listener (the sb parameter above).
  // use the 'hello' object at the beginning of this exercise
  // to do the translating
  /*jshint validthis:true */
  console.log('Hello in the language of the speaker: ' + hello[this.homeLanguage]);
  return hello[sb.homeLanguage];
  //TODO: put this on the SentientBeing prototype
}

SentientBeing.prototype.sayHello = sayHello;

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

function Human() {}
Human.prototype = new SentientBeing('Earth', 'federation standard');

function Klingon() {}
Klingon.prototype = new SentientBeing('Qo\'noS', 'klingon');

function Romulan() {}
Romulan.prototype = new SentientBeing('Romulus', 'romulan');

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear Hello');

assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the human should hear hello');

assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    if (a.charAt(a.length - 1) < b.charAt(b.length - 1)) {
      return 1;
    }
    if (a.charAt(a.length - 1) > b.charAt(b.length - 1)) {
      return -1;
    }
    return 0;
  }
  stringArray.sort(byLastLetter);
  return stringArray;
}

var array1 = ['word1', 'word2', 'word3'];
assert(lastLetterSort(array1)[0] === 'word3', 'words not sorted property');
assert(lastLetterSort(array1)[2] === 'word1', 'words not sorted property');

function sumArray(numberArray) {
  var sum = 0;

  function sumArrayElements(element, index, array) {
    sum += array[index];
  }
  // TODO: implement me using forEach
  numberArray.forEach(sumArrayElements);

  return sum;
}

var array2 = [2, 4, 6, 8];
assert(sumArray(array2) === 20, 'sum is not done properly');
assert(sumArray(array2) !== 19, 'sum is not done properly');

var superArray = [[2,4,6,8,], [1,2,3,4], [10,20,30,40]];
var backupArray = superArray;

console.log(superArray);

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    if (sumArray(a) > sumArray(b)) {
      return 1;
    }
    if (sumArray(a) < sumArray(b)) {
      return -1;
    }
    return 0;
  });
  return arrayOfArrays;
}

var sortedSuperAray = sumSort(superArray);

console.log(superArray + ' superArray called after the sort function');
console.log(sortedSuperAray);


assert(sumArray(sortedSuperAray[0]) !== sumArray(backupArray[0]), 'Arrays were not sorted');
assert(sumArray(sortedSuperAray[1]) !== sumArray(backupArray[1]), 'Arrays were not sorted');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
