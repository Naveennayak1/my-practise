function onloded() {
  // Get references to the form and table body elements
  let form = document.getElementById("studentForm");
  let tbody = document.getElementById("tbody");

  // Load students data from localStorage or initialize with an empty array
  let students = JSON.parse(localStorage.getItem("students")) || [];

  /**
   * Function to validate input fields
  
   */
  function validateInputs(namee, id, email, phone) {
    // Regular expressions for validation
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation format
    const idRegex = /^\d+$/; // Allows only numeric values
    const phoneRegex = /^\d{10}$/; // Requires exactly 10 numeric digits

    // Validate student name
    if (!nameRegex.test(namee)) {
      alert("Student name should contain only letters.");
      return false;
    }

    // Validate student ID
    if (!idRegex.test(id)) {
      alert("Student ID should contain only numbers.");
      return false;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Validate contact number
    if (!phoneRegex.test(phone)) {
      alert("Contact number should contain exactly 10 digits.");
      return false;
    }

    return true; // All inputs are valid
  }

  /**
   * Function to render the table body with student records
   * Dynamically creates rows for each student in the `students` array
   */
  function renderbody() {
    tbody.innerHTML = ""; // Clear existing table rows

    // Loop through the `students` array and create a row for each record
    students.forEach((student, index) => {
      const row = `
        <tr>
          <td>${student.namee}</td>
          <td>${student.id}</td>
          <td>${student.email}</td>
          <td>${student.phone}</td>
          <td>
            <!-- Buttons for editing and deleting records -->
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
          </td>
        </tr>
        `;
      tbody.innerHTML += row; // Append the row to the table body
    });
  }

  /**
   * Event listener for form submission
   * Adds a new student record to the table and localStorage
   */
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get input values from the form
    const namee = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentID").value.trim();
    const email = document.getElementById("emailID").value.trim();
    const phone = document.getElementById("contactNo").value.trim();

    // Validate inputs before adding to the `students` array
    if (validateInputs(namee, id, email, phone)) {
      // Add new student record to the array
      students.push({ namee, id, email, phone });

      // Save the updated array to localStorage
      localStorage.setItem("students", JSON.stringify(students));

      // Re-render the table with updated data
      renderbody();

      // Reset the form inputs
      form.reset();
    }
  });

  // Initial rendering of the table on page load
  renderbody();

  /**
   * Function to edit an existing student record
  
   */
  window.editStudent = (index) => {
    // Get the student record to be edited
    const student = students[index];

    // Populate form fields with the student's existing data
    document.getElementById("studentName").value = student.namee;
    document.getElementById("studentID").value = student.id;
    document.getElementById("emailID").value = student.email;
    document.getElementById("contactNo").value = student.phone;

    // Remove the student record from the array for updating
    students.splice(index, 1);
  };

  /**
   * Function to delete an existing student record
   * @param {number} index - Index of the student in the `students` array
   */
  window.deleteStudent = (index) => {
    // Remove the student record from the array
    students.splice(index, 1);

    // Update localStorage with the modified array
    localStorage.setItem("students", JSON.stringify(students));

    // Re-render the table with updated data
    renderbody();
  };
}

// Call the `onloded` function when the script is loaded
onloded();
