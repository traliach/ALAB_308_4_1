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

//output:
//  node main.js 
// Rows array from CSV: [
//   [ 'ID', 'Name', 'Occupation', 'Age' ],
//   [ '42', 'Bruce', 'Knight', '41' ],
//   [ '57', 'Bob', 'Fry Cook', '19' ],
//   [ '63', 'Blaine', 'Quiz Master', '58' ],
//   [ '98', 'Bill', "Doctor's Assistant", '26' ]

// ------------------------
// Part 2: Build 2D table with dynamic columns
// ------------------------

const headers = rows[0];
const COLS = headers.length;
const table = [];

for (let r = 0; r < rows.length; r++) {
  const row = rows[r];

  if (row.length === COLS) {
    table.push(row);
  } else {
    console.log("Skipping row with wrong number of columns:", row);
  }
}

console.log("Table with headers and consistent columns:", table);
// output:
// [
//   [ 'ID', 'Name', 'Occupation', 'Age' ],
//   [ '42', 'Bruce', 'Knight', '41' ],
//   [ '57', 'Bob', 'Fry Cook', '19' ],
//   [ '63', 'Blaine', 'Quiz Master', '58' ],
//   [ '98', 'Bill', "Doctor's Assistant", '26' ]
// ]

// ------------------------
// Part 3: Transform rows into array of objects
// ------------------------

// Make a lowercase version of the headers to use as object keys
const lowerCaseHeaders = [];
for (let i = 0; i < headers.length; i++) {
  lowerCaseHeaders.push(headers[i].toLowerCase());
}

// Build an array of objects, one per data row
const people = [];

for (let r = 1; r < table.length; r++) {
  const row = table[r];
  const person = {};

  for (let c = 0; c < lowerCaseHeaders.length; c++) {
    const key = lowerCaseHeaders[c];
    person[key] = row[c];
  }

  people.push(person);
}

console.log("Array of objects built from table:", people);
//  output:

// ]
// Array of objects built from table: [
//   { id: '42', name: 'Bruce', occupation: 'Knight', age: '41' },
//   { id: '57', name: 'Bob', occupation: 'Fry Cook', age: '19' },
//   { id: '63', name: 'Blaine', occupation: 'Quiz Master', age: '58' },
//   {
//     id: '98',
//     name: 'Bill',
//     occupation: "Doctor's Assistant",
//     age: '26'
//   }
// ]

// ------------------------
// Part 4: Manipulate array of objects and compute average age
// ------------------------

// 1) Remove the last element
people.pop();

// 2) Insert Barry at index 1
people.splice(1, 0, {
  id: "48",
  name: "Barry",
  occupation: "Runner",
  age: "25",
});

// 3) Append Bilbo at the end
people.push({
  id: "7",
  name: "Bilbo",
  occupation: "None",
  age: "111",
});

console.log("People after pop, splice, and push:", people);

// 4) Compute average age using a loop (no reduce)
let totalAge = 0;

for (let i = 0; i < people.length; i++) {
  const person = people[i];
  totalAge += Number(person.age);
}

const averageAge = totalAge / people.length;
console.log("Average age:", averageAge);

// output
// People after pop, splice, and push: [
//   { id: '42', name: 'Bruce', occupation: 'Knight', age: '41' },
//   { id: '48', name: 'Barry', occupation: 'Runner', age: '25' },
//   { id: '57', name: 'Bob', occupation: 'Fry Cook', age: '19' },
//   { id: '63', name: 'Blaine', occupation: 'Quiz Master', age: '58' },
//   { id: '98', name: 'Bill', occupation: "Doctor's Assistant", age: '26' },
//   { id: '7', name: 'Bilbo', occupation: 'None', age: '111' }
// ]
// Average age: 53.5

// ------------------------
// Part 5: Convert final array of objects back to CSV
// ------------------------

// Use the keys from the first object as the header row (already lowercase from Part 3)
const keys = Object.keys(people[0]);

// Start with the header line
const lines = [];
lines.push(keys.join(","));

// Add one CSV line per person
for (let i = 0; i < people.length; i++) {
  const personRow = [];

  for (let k = 0; k < keys.length; k++) {
    const key = keys[k];
    personRow.push(people[i][key]);
  }

  lines.push(personRow.join(","));
}

const csvOut = lines.join("\n");
console.log("Final CSV output:\n" + csvOut);

// output:
// Final CSV output:
// id,name,occupation,age
// 42,Bruce,Knight,41
// 48,Barry,Runner,25
// 57,Bob,Fry Cook,19
// 63,Blaine,Quiz Master,58
// 98,Bill,Doctor's Assistant,26
// 7,Bilbo,None,111