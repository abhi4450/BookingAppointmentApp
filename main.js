axios.defaults.headers.post["Content-Type"] = "application/json";

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

    // const headers = {
    //   "Content-Type": "application/json", // Set the content type based on your needs
    // };

    async function storeDataToBackend() {
      let res = await axios.post(
        "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData",
        submittedData
        // { headers }
      );
      //   displayData();
      console.log("Stored Data :", res.data);
    }
    storeDataToBackend();
  });

window.addEventListener("DOMContentLoaded", async function displayData() {
  //get data from the back-end(crudcrud.com)
  let res = await axios.get(
    "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData"
  );

  console.log("received data: ", res.data);

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      // If the clicked element has the "delete" class, handle the deletion
      event.preventDefault();
      deleteAppointment(event.target);
    }
  });

  res.data.forEach((ele) => {
    // Create a new <li> element
    var listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `Name: ${ele.name}, Email: ${ele.email}`;

    // Create a delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-end delete";
    deleteBtn.appendChild(document.createTextNode("delete"));

    // Create a Edit Button
    let editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary btn-sm float-end me-1 edit";
    editBtn.appendChild(document.createTextNode("edit"));

    // Append the delete button to the <li> element
    listItem.appendChild(deleteBtn);
    //Append the Edit button to the <li> element
    listItem.appendChild(editBtn);

    listItem.dataset.appointmentId = ele._id;
    // Append the <li> element to the <ul>
    items.appendChild(listItem);
  });
});

// Function to delete an appointment
async function deleteAppointment(deleteButton) {
  try {
    // Assuming your delete button is within a list item, find the closest list item
    const listItem = deleteButton.parentElement;
    // Extract the appointment ID from the list item
    const appointmentId = listItem.dataset.appointmentId;

    // Make a DELETE request using Axios
    await axios.delete(
      `https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData/${appointmentId}`
    );

    // Remove the deleted item from the UI
    listItem.remove();
  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
}
