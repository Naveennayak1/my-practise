function onloded() {
  let form = document.getElementById("studentForm");
  let tbody = document.getElementById("tbody");
  let students = JSON.parse(localStorage.getItem("students")) || [];

  // Function to validate input fields
  function validateInputs(namee, id, email, phone) {
    const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    const idRegex = /^\d+$/; // Only numbers
    const phoneRegex = /^\d{10}$/; // Exactly 10-digit numbers

    if (!nameRegex.test(namee)) {
      alert("Student name should contain only letters.");
      return false;
    }

    if (!idRegex.test(id)) {
      alert("Student ID should contain only numbers.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      alert("Contact number should contain exactly 10 digits.");
      return false;
    }

    return true;
  }

  function renderbody() {
    tbody.innerHTML = "";
    students.forEach((student, index) => {
      const row = `
        <tr>
          <td>${student.namee}</td>
          <td>${student.id}</td>
          <td>${student.email}</td>
          <td>${student.phone}</td>
          <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
          </td>
        </tr>
        `;
      tbody.innerHTML += row;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const namee = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentID").value.trim();
    const email = document.getElementById("emailID").value.trim();
    const phone = document.getElementById("contactNo").value.trim();

    // Validate inputs before proceeding
    if (validateInputs(namee, id, email, phone)) {
      students.push({ namee, id, email, phone });
      localStorage.setItem("students", JSON.stringify(students));

      renderbody();
      form.reset();
    }
  });

  renderbody();

  window.editStudent = (index) => {
    const student = students[index];
    document.getElementById("studentName").value = student.namee;
    document.getElementById("studentID").value = student.id;
    document.getElementById("emailID").value = student.email;
    document.getElementById("contactNo").value = student.phone;
    students.splice(index, 1);
  };

  window.deleteStudent = (index) => {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderbody();
  };
}

onloded();
