axios.defaults.headers.post["Content-Type"] = "application/json";

window.addEventListener("DOMContentLoaded", function () {
  // Add an event listener for the initial form submission
  document
    .getElementById("submitButton")
    .addEventListener("click", submitHandler);

  // Event delegation for delete and edit buttons
  document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("delete")) {
      event.preventDefault();
      deleteAppointment(target);
    } else if (target.classList.contains("edit")) {
      event.preventDefault();
      editAppointment(target);
    }
  });

  // Function to submit the form data
  function submitHandler(event) {
    event.preventDefault();
    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const submittedData = {
      name: nameValue,
      email: emailValue,
    };
    storeDataToBackend(submittedData);
  }

  // Function to store data to the backend
  async function storeDataToBackend(data) {
    try {
      const res = await axios.post(
        "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData",
        data
      );
      console.log("Stored Data :", res.data);
      displayData();
    } catch (error) {
      console.error("Error storing data:", error);
    }
  }

  // Function to display data on the UI
  async function displayData() {
    try {
      const res = await axios.get(
        "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData"
      );

      console.log("Received data: ", res.data);

      const items = document.getElementById("items");
      items.innerHTML = ""; // Clear existing items

      res.data.forEach((ele) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = `Name: ${ele.name}, Email: ${ele.email}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm float-end delete";
        deleteBtn.appendChild(document.createTextNode("delete"));

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-primary btn-sm float-end me-1 edit";
        editBtn.appendChild(document.createTextNode("edit"));

        listItem.appendChild(deleteBtn);
        listItem.appendChild(editBtn);
        items.appendChild(listItem);

        listItem.dataset.appointmentId = ele._id;
        listItem.dataset.name = ele.name;
        listItem.dataset.email = ele.email;
      });
    } catch (error) {
      console.error("Error displaying data:", error);
    }
  }

  // Function to delete an appointment
  async function deleteAppointment(deleteButton) {
    try {
      const listItem = deleteButton.closest(".list-group-item");
      const appointmentId = listItem.dataset.appointmentId;

      await axios.delete(
        `https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData/${appointmentId}`
      );

      listItem.remove();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  }

  // Function to edit an appointment
  function editAppointment(editButton) {
    const listItem = editButton.closest(".list-group-item");
    const appointmentId = listItem.dataset.appointmentId;
    const name = listItem.dataset.name;
    const email = listItem.dataset.email;

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;

    const submitButton = document.getElementById("submitButton");
    submitButton.textContent = "Update";
    submitButton.removeEventListener("click", submitHandler);
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();
      updateAppointment(appointmentId);
    });
  }

  // Function to update an appointment
  async function updateAppointment(appointmentId) {
    try {
      const newName = document.getElementById("name").value;
      const newEmail = document.getElementById("email").value;

      const res = await axios.put(
        `https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData/${appointmentId}`,
        {
          name: newName,
          email: newEmail,
        }
      );

      console.log("Updated Data:", res.data);
      displayData();
    } catch (error) {
      console.error("Error updating data:", error);
    }

    // Reset the form and submit button after updating
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("submitButton").textContent = "Submit";
    document
      .getElementById("submitButton")
      .addEventListener("click", submitHandler);
  }

  // Load initial data
  displayData();
});

// axios.defaults.headers.post["Content-Type"] = "application/json";

// document
//   .getElementById("submitButton")
//   .addEventListener("click", function (event) {
//     // Prevent the default form submission behavior
//     event.preventDefault();

//     // Fetch input values
//     var nameValue = document.getElementById("name").value;
//     var emailValue = document.getElementById("email").value;

//     // Create an object to represent the submitted data
//     var submittedData = {
//       name: nameValue,
//       email: emailValue,
//     };

//     // const headers = {
//     //   "Content-Type": "application/json", // Set the content type based on your needs
//     // };

//     async function storeDataToBackend() {
//       let res = await axios.post(
//         "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData",
//         submittedData
//         // { headers }
//       );
//       //   displayData();
//       console.log("Stored Data :", res.data);
//     }
//     storeDataToBackend();
//   });

// window.addEventListener("DOMContentLoaded", async function displayData() {
//   //get data from the back-end(crudcrud.com)
//   let res = await axios.get(
//     "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData"
//   );

//   console.log("received data: ", res.data);

//   document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("delete")) {
//       // If the clicked element has the "delete" class, handle the deletion
//       event.preventDefault();
//       deleteAppointment(event.target);
//     } else if (event.target.classList.contains("edit")) {
//       // If the clicked element has the "edit" class, handle the edit
//       event.preventDefault();
//       editAppointment(event.target);
//     }
//   });

//   res.data.forEach((ele) => {
//     // Create a new <li> element
//     var listItem = document.createElement("li");
//     listItem.className = "list-group-item";
//     listItem.textContent = `Name: ${ele.name}, Email: ${ele.email}`;

//     // Create a delete button
//     let deleteBtn = document.createElement("button");
//     deleteBtn.className = "btn btn-danger btn-sm float-end delete";
//     deleteBtn.appendChild(document.createTextNode("delete"));

//     // Create a Edit Button
//     let editBtn = document.createElement("button");
//     editBtn.className = "btn btn-primary btn-sm float-end me-1 edit";
//     editBtn.appendChild(document.createTextNode("edit"));

//     // Append the delete button to the <li> element
//     listItem.appendChild(deleteBtn);
//     //Append the Edit button to the <li> element
//     listItem.appendChild(editBtn);

//     listItem.dataset.appointmentId = ele._id;
//     // Append the <li> element to the <ul>
//     items.appendChild(listItem);
//   });
// });

// // Function to delete an appointment
// async function deleteAppointment(deleteButton) {
//   try {
//     // Assuming your delete button is within a list item, find the closest list item
//     const listItem = deleteButton.parentElement;
//     // Extract the appointment ID from the list item
//     const appointmentId = listItem.dataset.appointmentId;

//     // Make a DELETE request using Axios
//     await axios.delete(
//       `https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData/${appointmentId}`
//     );

//     // Remove the deleted item from the UI
//     listItem.remove();
//   } catch (error) {
//     console.error("Error deleting appointment:", error);
//   }
// }

// function editAppointment(editButton) {
//   const listItem = editButton.parentElement;
//   const appointmentId = listItem.dataset.appointmentId;
//   const name = listItem.dataset.name;
//   const email = listItem.dataset.email;

//   // Populate the form for editing
//   document.getElementById("name").value = name;
//   document.getElementById("email").value = email;

//   // Change the submit button to an update button
//   const submitButton = document.getElementById("submitButton");
//   submitButton.textContent = "Update";
//   submitButton.removeEventListener("click", submitHandler); // Remove the old click event listener
//   submitButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     updateAppointment(appointmentId);
//   });
// }
// // Function to update an appointment
// async function updateAppointment(appointmentId) {
//   try {
//     const newName = document.getElementById("name").value;
//     const newEmail = document.getElementById("email").value;

//     // Update the appointment using Axios
//     let res = await axios.patch(
//       `https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData/${appointmentId}`,
//       {
//         name: newName,
//         email: newEmail,
//       }
//     );

//     displayData();
//   } catch (error) {
//     console.error("Error updating data:", error);
//   }

//   // Reset the form and submit button after updating
//   document.getElementById("name").value = "";
//   document.getElementById("email").value = "";
//   document.getElementById("submitButton").textContent = "Submit";
//   document
//     .getElementById("submitButton")
//     .addEventListener("click", submitHandler);
// }
