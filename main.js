// ======================
// Part 1: Refactor old CSV parsing using arrays
// ======================

// Keep the same CSV data you used before
const csv = `ID,Name,Occupation,Age
42,Bruce,Knight,41
57,Bob,Fry Cook,19
63,Blaine,Quiz Master,58
98,Bill,Doctor's Assistant,26`;

// Goal for Part 1:
// - Parse this CSV string into a two-dimensional array called `rows`
// - Each element of `rows` is an array representing one row of data
// - Then log `rows` to verify the structure

const rows = [];
let currentRow = [];
let currentCell = "";

for (let i = 0; i < csv.length; i++) {
  const char = csv[i];

  if (char === ",") {
    currentRow.push(currentCell);
    currentCell = "";
  } else if (char === "\n") {
    currentRow.push(currentCell);
    rows.push(currentRow);
    currentRow = [];
    currentCell = "";
  } else {
    currentCell += char;
  }
}

if (currentCell !== "" || currentRow.length > 0) {
  currentRow.push(currentCell);
  rows.push(currentRow);
}

console.log("Rows array from CSV:", rows);

//result:
//  node main.js 
// Rows array from CSV: [
//   [ 'ID', 'Name', 'Occupation', 'Age' ],
//   [ '42', 'Bruce', 'Knight', '41' ],
//   [ '57', 'Bob', 'Fry Cook', '19' ],
//   [ '63', 'Blaine', 'Quiz Master', '58' ],
//   [ '98', 'Bill', "Doctor's Assistant", '26' ]

