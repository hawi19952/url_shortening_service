const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const nums = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];

function makeShortCode(n) {
  const strNumber = String(n);
  let keys = [];
  for (let i = 5; i >= 0; i--) {
    let digit = strNumber[i]
    let key;
    if (!digit) {
      digit = 0
    }

    if (i > 2) {
      key = letters[digit];
    } else {
      key = nums[digit]
    }
    keys.push(key);
  }
  let shortCode = keys.join('');
  return shortCode;
}


for (let index = 0; index < 100000; index++) {
  const element = makeShortCode(index)
  console.log(element)
  
}