// vikas was here!
const http = new XMLHttpRequest();

function updateTable() {
  const response = JSON.parse(http.responseText);
  const oldTable = document.querySelector('tbody');
  const newTable = document.createElement('tbody');

  if (!(response instanceof Array)) {
    const row = document.createElement('tr');

    Object.keys(response).forEach(attribute => {
      if (['_id', '__v'].includes(attribute)) { return; }

      const data = document.createElement('td');
      data.textContent = response[attribute];
      row.appendChild(data);
    });

    oldTable.appendChild(row);
    return;
  }

  response.forEach(review => {
    const row = document.createElement('tr');

    Object.keys(review).forEach(attribute => {
      if (['_id', '__v'].includes(attribute)) { return; }

      const data = document.createElement('td');
      data.textContent = review[attribute];
      row.appendChild(data);
    });

    newTable.appendChild(row);
  });

  oldTable.parentNode.replaceChild(newTable, oldTable);
}

function post(review = {}) {
  http.open('POST', '/api/review/create');
  http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  http.send(JSON.stringify(review));
}

function add(evt) {
  evt.preventDefault();
  const name = document.querySelector('#name').value;
  const semester = document.querySelector('#semester').value;
  const year = document.querySelector('#year').value;
  const review = document.querySelector('#review').value;

  post({
    name : name,
    semester : semester,
    year : year,
    review : review
  });
}

function request(query = '') {
  http.open('GET', `/api/reviews${query}`);
  http.send();
}

function filter(evt) {
  evt.preventDefault();
  const semester = document.querySelector('#filterSemester').value;
  const year = document.querySelector('#filterYear').value;
  request(`?semester=${semester}&year=${year}`);
}

function listen() {
  const filterButton = document.querySelector('#filterBtn');
  const addButton = document.querySelector('#addBtn');

  addButton.addEventListener('click', add);
  filterButton.addEventListener('click', filter);
  http.addEventListener('load', updateTable);
}

function main() {
  listen();
  request();
}

document.addEventListener("DOMContentLoaded", main);
