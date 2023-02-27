// Реализовать весь функционал CRUD на json-server:
// ---Create (Создание контакта)
// ---Read (Вывести список контактов)
// ---Update (Сделать редактирование)
// ---Delete (Сделать удаление)
// CRUD-операции включают в себя 4 функции: Create (создание), Read (чтение), Update (редактирование) и Delete (удаление). Это основные методы работы с базами данных. Операции CRUD предназначены для редактирования данных программы.

const API = "http://localhost:8001/Contacts";

const list = document.querySelector("#contact-list");

const addFrom = document.querySelector("#add-form");
const nameInp = document.querySelector("#name");
const surInp = document.querySelector("#surname");
const numInp = document.querySelector("#phoneNumber");

const editNameInp = document.querySelector("#edit-name");
const editSurnameInp = document.querySelector("#edit-surname");
const editNumberInp = document.querySelector("#edit-number");
const editSaveBtn = document.querySelector("#btn-save-edit");

searchInput = document.querySelector("#search");
searchVal = "";

getContacts();

async function getContacts() {
  const res = await fetch(`${API}?name_like=${searchVal}`);
  const data = await res.json();
  render(data);
}

async function addContact(contact) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getContacts();
}

async function deleteBtn(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  getContacts();
}

async function getOneContact(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  return data;
}

async function editContact(id, editedContact) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedContact),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getContacts();
}

function render(arr) {
  list.innerHTML = "";
  arr.forEach((item) => {
    list.innerHTML += `<div class="card  m-5" style="width: 18rem">
    <div class="card-body">
    <h5 class='card-title>Information</h5>'
      <p class="card-name">Name: ${item.name}</p>
      <p class="card-surname">Surname: ${item.surname}</p> 
      <p class="card-contact">Contact:  ${item.number}</p>
      <button id='${item.id}'  class="btn btn-danger btn-delete">DELETE</button>
      <button data-bs-toggle='modal' data-bs-target='#exampleModal'id='${item.id}'   class="btn btn-dark btn-edit">EDIT</button>
    </div>
  </div>
   `;
  });
}

addFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!nameInp.value.trim() || !surInp.value.trim() || !numInp.value.trim()) {
    alert("Заполните поля");
    return;
  }
  const contact = {
    name: nameInp.value,
    surname: surInp.value,
    number: numInp.value,
  };
  addContact(contact);
  nameInp.value = "";
  surInp.value = "";
  numInp.value = "";
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    deleteBtn(e.target.id);
  }
});
let id = null;
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-edit")) {
    id = e.target.id;
    const contact = await getOneContact(e.target.id);
    editNameInp.value = contact.name;
    editSurnameInp.value = contact.surname;
    editNumberInp.value = contact.number;
  }
});

editSaveBtn.addEventListener("click", (e) => {
  if (
    !editNameInp.value.trim() ||
    !editSurnameInp.value.trim() ||
    !editNumberInp.value.trim()
  ) {
    alert("Заполните поле");
    return;
  }

  const editedContact = {
    name: editNameInp.value,
    surname: editSurnameInp.value,
    number: editNumberInp.value,
  };
  editContact(id, editedContact);
});

searchInput.addEventListener("input", () => {
  searchVal = searchInput.value;
  getContacts();
});
