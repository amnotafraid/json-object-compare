// Write ES2015 code and import modules from npm
// and then press "Execute" to run your program.

/*
  Please write a function that checks if two objects have the same content.
*/
/* NOTES:
  1. Ignore _id.
  2. Keys in the objects are unknown to this function.
      Please don't do:
                  offerA.rate equals offerB.rate and
                  offerA.offerType equals offerB.offerType
                ...etc
  3. Write smaller functions if necessary and name them well.
  4. Write comments if necessary.
  5. Below are the two objects we want you to compare and the result should be true.
  6. WHEN COMPLETE, ACTIONS -> SAVE PRIVATE GIST, AND INCLUDE THE LINK IN THE WRITTEN INTERVIEW.
*/

// Optional: Checkout Ramda. It has already been imported in this module for you.
const R = require('ramda');

const offerA = {
    rate: "freeOfCharge",
    bookingCode: "FREELOCAL",
    allowCombination: false,
    offerName: "Bring a Local for FREE! Promotion",
    specialConditions: "Please note, this special offer can be booked today, and is valid for travel at any time during the year except for December 24th through January 6th.",
    offerType: "Per person",
    _id: "57f7019e18f4fc0300a9e6d1",
    discountType: "percentage",
    validDatesOfTravel: [ 
        {
            fromDate: "2017-04-01T00:00:00.000Z",
            toDate: "2017-12-24T00:00:00.000Z",
            _id: "123",
            updatedAt: "2016-06-28T21:20:21.754Z",
            createdAt: "2016-06-28T21:20:21.754Z"
        }, 
        {
            _id: "57f7019e18f4fc0300a9e6d3",
            fromDate: "2018-01-06T00:00:00.000Z",
            toDate: "2018-03-31T00:00:00.000Z",
            updatedAt: "2016-08-17T20:21:08.723Z",
            createdAt: new Date("2016-08-17T20:21:08.723Z")
        }
    ],
    tags: ['free', 'multi'],
    rates: [{nett: 2, commission: '20%'}]
};
const offerB = {
    _id: "57f7019e18f4fc0300a9e6d1",
    rate: "freeOfCharge",
    bookingCode: "FREELOCAL",
    allowCombination: false,
    offerName: "Bring a Local for FREE! Promotion",
    specialConditions: "Please note, this special offer can be booked today, and is valid for travel at any time during the year except for December 24th through January 6th.",
    offerType: "Per person",
    discountType: "percentage",
    validDatesOfTravel: [
        {
            fromDate: "2018-01-06T00:00:00.000Z",
            _id: "57f7019e18f4fc0300a9e6d3",
            toDate: "2018-03-31T00:00:00.000Z",
            updatedAt: new Date("2016-08-17T20:21:08.723Z"),
            createdAt: "2016-08-17T20:21:08.723Z"
        },
        {
            fromDate: "2017-04-01T00:00:00.000Z",
            toDate: "2017-12-24T00:00:00.000Z",
            updatedAt: "2016-06-28T21:20:21.754Z",
            createdAt: "2016-06-28T21:20:21.754Z",
        }
        
    ],
    tags: ['multi', 'free'],
    rates: [{commission: '20%', nett: 2}]
};

// YOUR CODE STARTS HERE.

logError = (message, bLog) => {
	if (bLog) {
		console.log(message);
	}
}

equals = (a, b, bLog=true) => {
  /*
   * arrayEquals 		- evaluates whether two arrays are the same.
   *
   * NOTE:  This is interior to equals because I don't want everyone
   * calling it.  The error checking happens exterior to this function.
   *
   * Input:
   *
   *		a, b 			- an array
   *
   * Output:
   *
   *		true  	a = b
   *    false  	a != b
   */
  arrayEquals = (a,b,bLog=true) => {
		if (R.length(a) != R.length(b)) {
			logError(`array lengths don't match`, bLog);
			return false;
		}

		let b1 = R.clone(b);
		// The idea is to remove the matching values from b1.
		// If you get R.length(b1) == 0 in the end, you win!
		for (let i = 0; i < R.length(a); i++) {
			for (let j = 0; j < R.length(b1); j++) {
				let xA = JSON.stringify(a[i], null, 2);
				let xB = JSON.stringify(b[j], null, 2);
				if (propertyEquals(a[i], b[j], false)) {
					b1.splice(j, 1);
					// go to the outer loop and try the next value in a
					break;
				}

				if ((R.length(b1) - 1) === j) {
					// you never found a match for a[i]
					let strA = a[i];
					if (a[i] instanceof Object) {
						strA = JSON.stringify(a[i], null, 2);
					}
					logError(`NOTE:  _id not compared`, bLog);
					logError(`There wasn't a match for this item: ${strA}`, bLog);
					return false;
				}
			}
		}

		if (R.length(b1) != 0) {
			logError(`Arrays don't match`, bLog);
			return false;
		}
		return true;
  }

  /*
   * propertyEquals - evaluates whether two arrays, objects, numbers, or
   *    							strings are the same.
   *
   * Input:
   *
   *		a, b 			- an array, an object, a number, a string
   *
   * Output:
   *
   *		true  	a = b
   *    false  	a != b
   */
  propertyEquals = (a,b,bLog=true) => {
		if (a === null || b === null) {
			logError(`propertyEquals - a property is null`, bLog);
			return false;
		}

		let typeA = typeof a;
		let typeB = typeof b;

		if (typeA !== typeB) {
			// It fails right here with these guys
      //    updatedAt: "2016-08-17T20:21:08.723Z",
      //    updatedAt: new Date("2016-08-17T20:21:08.723Z"),
			logError(`propertyEquals - type mismatch ${typeA} != ${typeB}`, bLog);
			logError(`a = ${a}; b = ${b}`, bLog);
			return false;
		}

		switch(typeA) {
				case "undefined":
				case "symbol":
				case "function":
					logError(`propertyEquals - bad type: ${typeA}`, bLog);
					return false;
					break;

				case "boolean":
				case "number":
				case "string":
					return a == b;
					break;

				case "object":
					if (Array.isArray(a) && Array.isArray(b)) {
						return arrayEquals(a, b, bLog);	
					}
					// over-zealous checking here.  What if one is an
					// object and the other is an array?  typeA and typeB
					// will both be "object"
					if (a instanceof Object && b instanceof Object) {
						return objectEquals(a, b, bLog);
					}

					logError(`propertyEquals - mismatch: ${a} and ${b}`, bLog);
					return false;
					break; 

				default:
					logError(`propertyEquals - What?! type = {$typeA}?`, bLog);
					return false;
					break;

		}
		

		logError(`propertyEquals - how did you get here?!`, bLog);
		return false;
  }

  /*
   * objectEquals 		- evaluates whether two objects are the same.
   *
   *
   * Input:
   *
   *		a, b 			- an object
   *
   * Output:
   *
   *		true  	a = b
   *    false  	a != b
   */
  objectEquals = (a,b,bLog=true) => {
    let aKeys = R.difference(R.keys(a), ['_id']);
    let bKeys = R.difference(R.keys(b), ['_id']);

    if (R.length(aKeys) != R.length(bKeys)) {
      logError('lengths not equal', bLog);
      return false;
    }

    for (let i = 0; i < R.length(aKeys); i++) {
      if (!propertyEquals(a[aKeys[i]], b[aKeys[i]], bLog)) {
				let strA = a[aKeys[i]], strB = b[bKeys[i]];
				if (a[aKeys[i]] instanceof Object) {
					strA = JSON.stringify(a[aKeys[i]], null, 2);
				}
				if (b[bKeys[i]] instanceof Object) {
					strB = JSON.stringify(b[aKeys[i]], null, 2);
				}
				logError(`NOTE:  _id not compared`, bLog);
        logError(`These don't match: ${aKeys[i]}: ${strA} != ${strB}`, bLog);
        return false;
      }
    }

    return true;
  }


  if (typeof(a) !== 'object') {
    logError(`first parameter ${a} is not an object`, bLog);
    return false;
  }

  if (typeof(b) !== 'object') {
    logError(`first parameter ${b} is not an object`, bLog);
    return false;
  }

  if (a === b) {
    return true;
  }

  return objectEquals(a, b, bLog); 
}

var result = equals (offerA, offerB, false);

if (result) {
	logError('objects are equal', true);
}
else {
	logError('objects are not equal', true);
}

// WHEN COMPLETE SAVE AS PRIVATE GIST AND INCLUDE THE LINK IN THE WRITTEN INTERVIEW.
