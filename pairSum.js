
//Naive Approach 
//O(n2) Time 

// function solution(a, k) {
//     let solutionCounter = 0;

//     for (let i = 0; i < a.length - 1; i++) {
//         for (let j = i + 1; j < a.length; j++) {
//             if ((a[i] + a[j]) % k === 0) {
//                 solutionCounter++;
//             }
//         }
//     }
//     return solutionCounter
// }


Efficient approach  Utilizing a  hashmap
function solution(a, k) {
  // Create a frequency array to count
  // occurrences of all remainders when
  // divided by K
  let freq = new Array(K);
    freq.fill(0);
    // console.log(A.length)

  // Count occurrences of all remainders
  for (let i = 0; i < A.length; i++) ++freq[A[i] % K];

  // If both pairs are divisible by 'K'
  let sum = freq[0] * parseInt((freq[0] - 1) / 2, 10);

  // count for all i and (k-i)
  // freq pairs
  for (let i = 1; i <= K / 2 && i != K - i; i++) sum += freq[i] * freq[K - i];

  // If K is even
  if (K % 2 == 0)
    sum += parseInt(
      (freq[parseInt(K / 2, 10)] * (freq[parseInt(K / 2, 10)] - 1)) / 2,
      10
    );
  return sum;
}

// let A = [2, 2, 1, 7, 5, 3];

// let K = 4;

let A = [1,2,3,4,5];
let K = 3;

console.log(solution(A, K));
