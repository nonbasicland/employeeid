// Array of employee data (replace with your own data)
const employeeData = [
  { firstName: 'John', lastName: 'Doe', imageUrl: 'john_doe.jpg' },
  { firstName: 'Jane', lastName: 'Smith', imageUrl: 'jane_smith.jpg' },
  // Add more employee data as needed
];

let currentEmployeeIndex = 0;
let correctGuesses = 0;
let totalGuesses = 0;

// Function to display the current employee
function displayEmployee() {
  const employee = employeeData[currentEmployeeIndex];
  const imageElement = document.getElementById('employee-image');
  imageElement.src = employee.imageUrl;
  imageElement.alt = `${employee.firstName} ${employee.lastName}`;
}

// Function to handle button click event
function submitGuess() {
  const firstNameInput = document.getElementById('first-name').value.trim();
  const lastNameInput = document.getElementById('last-name').value.trim();

  const employee = employeeData[currentEmployeeIndex];
  if (
    firstNameInput.toLowerCase() === employee.firstName.toLowerCase() &&
    lastNameInput.toLowerCase() === employee.lastName.toLowerCase()
  ) {
    correctGuesses++;
  }

  totalGuesses++;
  updateTally();
  clearInput();
  getNextEmployee();
}

// Function to update the tally list
function updateTally() {
  const tallyList = document.getElementById('tally-list');
  const listItem = document.createElement('li');
  listItem.textContent = `Guess ${totalGuesses}: ${correctGuesses} correct`;
  tallyList.appendChild(listItem);
}

// Function to clear input fields
function clearInput() {
  document.getElementById('first-name').value = '';
  document.getElementById('last-name').value = '';
}

// Function to get the next employee
function getNextEmployee() {
  currentEmployeeIndex++;
  if (currentEmployeeIndex >= employeeData.length) {
    // Display a message or perform any action when all employees have been shown
    alert('All employees have been shown.');
    currentEmployeeIndex = 0;
  }
  displayEmployee();
}

// Function to reset the tally and start a new session
function resetTally() {
  currentEmployeeIndex = 0;
  correctGuesses = 0;
  totalGuesses = 0;
  const tallyList = document.getElementById('tally-list');
  tallyList.innerHTML
