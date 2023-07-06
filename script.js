// Array of employee photo file names
const employeePhotos = [
  'John Doe.jpg',
  'Jane Smith.jpg',
  // Add more employee photo file names as needed
];

let employeeImages = [];
let employeeData = [];

// Function to load employee images from a folder
function loadEmployeeImages() {
  employeeData = employeePhotos.map(photo => {
    const nameParts = photo.split('.jpg')[0].split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    return { firstName, lastName };
  });

  for (let i = 0; i < employeeData.length; i++) {
    const employee = employeeData[i];
    const image = new Image();
    image.src = `employee-photos/${employeePhotos[i]}`; // Assuming the images are stored in "employee-photos" folder
    employeeImages.push(image);
  }
}

// Function to shuffle the employee images array
function shuffleEmployeeImages() {
  for (let i = employeeImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [employeeImages[i], employeeImages[j]] = [employeeImages[j], employeeImages[i]];
  }
}

// Function to display the current employee
function displayEmployee() {
  const employee = employeeData[currentEmployeeIndex];
  const imageElement = document.getElementById('employee-image');
  imageElement.src = employeeImages[currentEmployeeIndex].src;
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
    shuffleEmployeeImages(); // Reshuffle the images for the next session
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

// Load employee images and shuffle them
loadEmployeeImages();
shuffleEmployeeImages();

// Initial display
displayEmployee();
