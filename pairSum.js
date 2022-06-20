
//Naive Approach 
//O(n2) Time 

function solution(a, k) {
    let solutionCounter = 0;

    for (let i = 0; i < a.length - 1; i++) {
        for (let j = i + 1; j < a.length; j++) {
            if ((a[i] + a[j]) % k === 0) {
                solutionCounter++;
            }
        }
    }
    return solutionCounter
}


// Efficient approach  Utilizing a  hashmap
function solution(a, k) {

  let moduloArr = new Array(k);
    moduloArr.fill(0);

    for (let i = 0; i < a.length; i++) {
        ++moduloArr[a[i] % k];
    }

  let sum = moduloArr[0] * parseInt((moduloArr[0] - 1) / 2, 10);

    for (let i = 1; (i <= k / 2 && i != k - i); i++) {
        sum += moduloArr[i] * moduloArr[k - i];
    }

    if (k % 2 == 0) {
        sum += parseInt(
            (moduloArr[parseInt(k / 2, 10)] * (moduloArr[parseInt(k / 2, 10)] - 1)) / 2,
            10
        );
    }
  return sum;
}


let A = [1,2,3,4,5];
let k = 3;

console.log(solution(A, k));
