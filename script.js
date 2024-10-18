'use strict';
const showData = (users, element) => {
  element.innerHTML = '';
  const tableEl = document.createElement('table');
  tableEl.innerHTML = `
    <thead>
      <th>Avatar</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>E-mail</th>
    </thead>
  `;
  const tbodyEl = document.createElement('tbody');
  users.forEach((user) => {
    const rowEl = document.createElement('tr');
    rowEl.id = user.id;
    rowEl.innerHTML = `
      <td><img src="${user.avatar}" /></td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td><a href="#mailto:${user.email}">${user.email}</a></td>
    `;
    tbodyEl.insertAdjacentElement('beforeend', rowEl);
  });
  tableEl.insertAdjacentElement('beforeend', tbodyEl);
  element.insertAdjacentElement('beforeend', tableEl);
};
const fetchData = async (url) => {
  const element = document.querySelector('#data');
  if (!element) return;
  element.innerHTML = 'Loading...';
  try {
    const res = await fetch(url);
    const { data } = await res.json();
    showData(data, element);
  } catch (error) {
    console.error(error);
    element.innerHTML = 'Something went wrong...';
  }
};

fetchData('https://reqres.in/api/users/');
