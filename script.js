let employeePhotos = [];

let currentEmployeeIndex = 0;
let correctGuesses = 0;
let totalGuesses = 0;
let isDisplayingAnswer = false;

// Function to fetch employee photos from a folder
async function fetchEmployeePhotos() {
  const response = await fetch('employee-photos/');
  const fileNames = await response.json();
  employeePhotos = fileNames;
}

// Function to extract the first name and last name from the photo file name
function extractEmployeeName(photoFileName) {
  const fileNameWithoutExtension = photoFileName.split('.jpg')[0];
  const nameParts = fileNameWithoutExtension.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  return { firstName, lastName };
}

// Function to shuffle the employee photos array
function shuffleEmployeePhotos() {
  for (let i = employeePhotos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [employeePhotos[i], employeePhotos[j]] = [employeePhotos[j], employeePhotos[i]];
  }
}

// Function to display the current employee
function displayEmployee() {
  const employeePhoto = employeePhotos[currentEmployeeIndex];
  const employeeName = extractEmployeeName(employeePhoto);
  const imageElement = document.getElementById('employee-image');
  imageElement.src = `employee-photos/${employeePhoto}`;
  imageElement.alt = `${employeeName.firstName} ${employeeName.lastName}`;
}

// Function to handle button click event
function submitGuess() {
  if (isDisplayingAnswer) return;

  const firstNameInput = document.getElementById('first-name').value.trim();
  const lastNameInput = document.getElementById('last-name').value.trim();

  const employeePhoto = employeePhotos[currentEmployeeIndex];
  const employeeName = extractEmployeeName(employeePhoto);

  if (
    firstNameInput.toLowerCase() === employeeName.firstName.toLowerCase() &&
    lastNameInput.toLowerCase() === employeeName.lastName.toLowerCase()
  ) {
    correctGuesses++;
  }

  totalGuesses++;
  updateTally();
  clearInput();
  displayAnswer(employeeName);
}

// Function to display the correct employee name for 10 seconds
function displayAnswer(employeeName) {
  isDisplayingAnswer = true;

  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const answerElement = document.getElementById('answer');

  firstNameInput.classList.add('hidden');
  lastNameInput.classList.add('hidden');
  answerElement.textContent = `${employeeName.firstName} ${employeeName.lastName}`;
  answerElement.classList.remove('hidden');

  setTimeout(() => {
    isDisplayingAnswer = false;
    answerElement.textContent = '';
    answerElement.classList.add('hidden');
    firstNameInput.classList.remove('hidden');
    lastNameInput.classList.remove('hidden');
    getNextEmployee();
  }, 10000);
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
  if (currentEmployeeIndex >= employeePhotos.length) {
    // Display a message or perform any action when all employees have been shown
    alert('All employees have been shown.');
    currentEmployeeIndex = 0;
    shuffleEmployeePhotos(); // Reshuffle the photos for the next session
  }
  displayEmployee();
}

// Function to reset the tally and start a new session
function resetTally() {
  currentEmployeeIndex = 0;
  correctGuesses = 0;
  totalGuesses = 0;
  const tallyList = document.getElementById('tally-list');
  tallyList.innerHTML = '';
}

// Event listeners for button clicks
document.getElementById('submit-btn').addEventListener('click', submitGuess);
document.getElementById('reset-btn').addEventListener('click', resetTally);

// Fetch employee photos, shuffle them, and display the initial employee
fetchEmployeePhotos()
  .then(() => {
    shuffleEmployeePhotos();
    displayEmployee();
  })
  .catch(error => {
    console.error('Error fetching employee photos:', error);
  });
