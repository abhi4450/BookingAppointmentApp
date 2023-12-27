document
  .getElementById("submitButton")
  .addEventListener("click", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Fetch input values
    var nameValue = document.getElementById("name").value;
    var emailValue = document.getElementById("email").value;

    // Create an object to represent the submitted data
    var submittedData = {
      name: nameValue,
      email: emailValue,
    };

    const headers = {
      "Content-Type": "application/json", // Set the content type based on your needs
    };
    axios
      .post(
        "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData",
        submittedData,
        { headers }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  });
