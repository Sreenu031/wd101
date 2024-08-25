let form = document.getElementById("user-data");

let retrieveItems = () => {
  let items = localStorage.getItem("user-entries");
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }
  return items;
};

let userEntries = retrieveItems();
const displayEntries = () => {
  let entries = retrieveItems();

  const tableEntries = entries
    .map((entry) => {
      let nameCell = `<td class="px-6 py-4">${entry.name} </td>`;
      let emailCell = `<td>${entry.email} </td>`;
      let passwordCell = `<td>${entry.password} </td>`;
      let dobCell = `<td>${entry.dob} </td>`;
      let conditionsCell = `<td>${entry.acceptConditions}</td>`;

      const row = `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"> ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${conditionsCell} </tr>`;

      return row;
    })
    .join("\n");

  let table = `<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" > <tr class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
    <th class="p-2">Name</th> <th>Email</th> <th>Password</th> <th>Dob</th> <th>Accepted terms?</th> </tr>
    ${tableEntries}</table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

function saveUserForm(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let dob = document.getElementById("dob").value;
  let acceptConditions = document.getElementById("acceptTerms").checked;

  const entiry = {
    name: name,
    password: password,
    email: email,
    dob: dob,
    acceptConditions: acceptConditions,
  };

  userEntries.push(entiry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
}

form.addEventListener("submit", saveUserForm);

displayEntries();

document.addEventListener("DOMContentLoaded", function () {
  const dobInput = document.getElementById("dob");

  const today = new Date();

  const minDate = new Date(
    today.getFullYear() - 55,
    today.getMonth(),
    today.getDate()
  );

  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const minDateString = minDate.toISOString().split("T")[0];
  const maxDateString = maxDate.toISOString().split("T")[0];

  dobInput.setAttribute("min", minDateString);
  dobInput.setAttribute("max", maxDateString);

  dobInput.addEventListener("input", function () {
    const selectedDate = new Date(dobInput.value);

    if (selectedDate < minDate || selectedDate > maxDate) {
      dobInput.setCustomValidity("Age must be above 18 and below 55.");
    } else {
      dobInput.setCustomValidity("");
    }
  });
});
