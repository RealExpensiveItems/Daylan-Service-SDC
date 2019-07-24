//inputs - given a string ('cat', 'hat')
//outputs - return given string in reverse order ('cat' -> 'tac', 'hat'-> 'tah')
//contraints - forbidden to use .reverse()

//strategy - create new string in function then iterate through each chararcter in given string and add character to the end of the string

//ex: 'cat'
//iteration | char | newString 
// 1		| 'c'  | 'c'
// 2		| 'a'  | 'ac'
// 3		| 't'  | 'tac'
var reverseString = function(string) {
	var str = '' //created string

	string.split('').forEach(function(char){ //split string and iterate each char
		str = char + str //add each char to end of created string
	});

	return str //return created string
};




