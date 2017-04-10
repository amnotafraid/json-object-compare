# JSON Object Compare

This has a recursive routine to do a deep compare on a JSON object.  Comparing arrays within the object is order non-specific.  For example, these two arrays will match:
```
    aNums: [1,2,3]
    aNums: [3,1,2]
```
These will match. Also, if a date object is compared to a string, the string will be converted to a date to see if it matches.  These two fields will match:
```
    updatedAt: "2016-08-17T20:21:08.723Z"
    updatedAt: new Date("2016-08-17T20:21:08.723Z")
```

To get going after cloning the repository:
```
npm install
npm run watch
```
This is designed to run in the command line and uses hard-coded objects.  The code to use is the equals() function which calls the logError() function.
