export function decode(romanNumeralString) {
    let result = 0;
    let uRoman = String(romanNumeralString).toUpperCase(); //case-insensitive
    for (let i = 0; i < uRoman.length - 1; i++) { //loop over all but the last character
      //if this character has a lower value than the next character
      if (decodeSingle(uRoman.charAt(i)) < decodeSingle(uRoman.charAt(i + 1))) {
        //subtract it
        result -= decodeSingle(uRoman.charAt(i));
      } else {
        //add it
        result += decodeSingle(uRoman.charAt(i));
      }
    }
    //decode the last character, which is always added
    result += decodeSingle(uRoman.charAt(uRoman.length - 1));
    return result;
  }

  function decodeSingle(romanNumeralChar) {
    switch (romanNumeralChar) {
      case 'M': return 1000;
      case 'D': return 500;
      case 'C': return 100;
      case 'L': return 50;
      case 'X': return 10;
      case 'V': return 5;
      case 'I': return 1;
      default: return 0;
    }
  }

