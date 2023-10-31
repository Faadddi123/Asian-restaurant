// Get the form element
const form = document.getElementById("reservation-form");

// Function to validate the form
function validateForm(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get form input values
  const hour = form.hour.value.trim();
  const date = form.date.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const name = form.name.value.trim();
  const people = form.people.value.trim();

  // Check if any field is empty
  if (!hour || !date || !phone || !email || !name || !people) {
    alert("Please fill out all fields");
  } else {
    // If all fields are filled, submit the form
    form.submit();
  }
}

// Add event listener for form submission
form.addEventListener("submit", validateForm);
