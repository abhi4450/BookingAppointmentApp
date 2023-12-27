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

    async function storeDataToBackend(callbck) {
      let res = await axios.post(
        "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData",
        submittedData
        // { headers }
      );
      displayData();
      console.log("Stored Data :", res.data);
    }
    storeDataToBackend(displayData);
  });

async function displayData() {
  //get data from the back-end(crudcrud.com)
  let res = await axios.get(
    "https://crudcrud.com/api/8ef90ec50afb4d04bfcd67a3636243cd/appointmentData"
  );

  console.log("received data: ", res.data);

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
    // Append the <li> element to the <ul>
    items.appendChild(listItem);
  });
}
