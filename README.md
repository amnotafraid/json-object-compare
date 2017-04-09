# JSON Object Compare

This has a recursive routine to do a deep compare on a JSON object.  Comparing arrays within the object is order non-specific.  For example, if there are two arrays:
```
var arrayA=[1,2,3]
var arrayB=[3,1,2]
```
These will match.

To get going after cloning:
```
npm install
npm run watch
```
This is designed to run in the command line and uses hard-coded objects.  The code to use is the equals() function which calls the logError() function.
