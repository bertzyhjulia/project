function getCargs(result) {
  let cards = '';
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    cards +=
      `<div class="card border-primary mb-2">
          <div class="row">
            <div class="col-md-3 text  ">
              <img src="` +
      result[i].avatar +
      `" alt="" width="250" height="250">
            </div>
            
            <div class="col-md-3 mt-5">
              <div class="text-default text mt-4">` +
      result[i].name +
      ` ` +
      result[i].lastName +
      `</div>
              <div class="text-default text mt-3">` +
      result[i].date +
      `</div>
            </div>
            <div class="col-md-3 mt-5">
              <div class="text-default text mt-4">` +
      result[i].email +
      `</div>
              <div class="text-default text mt-3">` +
      result[i].tel +
      `</div>
            </div>
    <!-- кнопка редагувати -->
          <div class="col-md-3 mt-5">
              <button class="edit_button btn btn-outline-primary text mt-2"  data-bs-toggle="modal" data-bs-target="#editModal" id= {{id}}>   edit client  </button>
              <br><br>
    <!-- кнопка delete -->
              <button class="delete_button btn btn-outline-danger text " id="` +
      result[i].id +
      `" onclick="delete1(` +
      result[i].id +
      `)">  delete client  </button> 
            </div>
          </div>
        </div>`;
  }
  let l = document.getElementById('result');
  l.innerHTML = cards;
}
//SCRIPT PAGINATE
window.onload = function () {
  paginButtons();
};

function paginButtons() {
  let request = new XMLHttpRequest();
  let limit = getLimit();
  let test = `?page=1&limit=` + limit + `&sortBy=id:ASC`;
  request.open('GET', '/count', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(test);
  let button = '';
  request.onload = function () {
    console.log(request.response);
    let count = $.parseJSON(request.response);
    console.log(count.count);
    for (let i = 1; i <= Math.ceil(count.count / limit); i++) {
      button +=
        `<li class="page-item col-md-1"><a class="page-link" id="` +
        i +
        `"  onclick = getPagin(` +
        i +
        `) href="#">` +
        i +
        `</a></li>`;
    }
    let l = document.getElementById('pagin');
    l.innerHTML = button;
  };
}

function getLimit() {
  let limit = document.getElementById('limit');
  return limit.value;
}

function getPagin(i) {
  let client = JSON.stringify({ id: i });
  let request = new XMLHttpRequest();
  let test = `?page=` + i + `&limit=` + getLimit() + `&sortBy=id:ASC&`;
  sendPagin(test);
}

function sendPagin(test) {
  request.open('GET', '/', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(client);
  request.onload = function () {
    console.log(request.response);
    let res = $.parseJSON(request.response);
    console.log(res.result);
    let cards = '';
    getCargs(res.result.data);
  };
}

document.getElementById('limit').addEventListener('change', function (e) {
  e.preventDefault();
  paginButtons();
});

// SCRIPT DELETE
var del = document.getElementsByClassName('delete_button');
for (var i = 0; i < del.length; i++)
  del[i].onclick = function () {
    alert('Do you want to delete this client?');
    let client = JSON.stringify({ id: this.id });
    let request = new XMLHttpRequest();
    request.open('DELETE', '/delete' + this.id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(client);
    request.onload = function () {
      console.log(request.response);
      filtering();
    };
  };

function filtering() {
  let registerForm = document.forms['filterClient'];
  let name = registerForm.elements['name'].value;
  let lastName = registerForm.elements['lastName'].value;
  let tel = registerForm.elements['tel'].value;
  let email = registerForm.elements['email'].value;
  let date = registerForm.elements['date'].value;
  let client = JSON.stringify({
    name: name,
    lastName: lastName,
    tel: tel,
    email: email,
    date: date,
  });
  console.log(i);
  let path;
  if (name != '')
    path = `?name=` + name + `&page=` + i + `&limit=` + getLimit();
  if (lastName != '')
    path = `&lastName=` + lastName + `&page=` + i + `&limit=` + getLimit();
  if (email != '')
    path = `&email=` + email + `&page=` + i + `&limit=` + getLimit();
  if (tel != '') path = `&tel=` + tel + `&page=` + i + `&limit=` + getLimit();
  if (date != '')
    path = `&date=` + date + `&page=` + i + `&limit=` + getLimit();
  let request = new XMLHttpRequest();
  request.open('GET', '/filter' + path, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(client);
  request.onload = function a() {
    console.log(request.response);
    let res = $.parseJSON(request.response);
    console.log(res.result);
    getCargs(res.result);
  };
}

function delete1(id1) {
  alert('Do you want to delete this client?');
  let client = JSON.stringify({ id: id1 });
  let request = new XMLHttpRequest();
  request.open('DELETE', '/delete' + id1, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(client);
  request.onload = function () {
    console.log(request.response);
  };
}

//SCRIPT GET FOR EDIT
var get = document.getElementsByClassName('edit_button');
for (var i = 0; i < get.length; i++)
  get[i].onclick = function () {
    let client = JSON.stringify({ id: this.id });
    let request = new XMLHttpRequest();
  };

document.getElementById('submit').addEventListener('click', function (e) {
  e.preventDefault();
  let registerForm = document.forms['addClient'];
  let name = registerForm.elements['name'].value;
  let lastName = registerForm.elements['lastName'].value;
  let tel = registerForm.elements['tel'].value;
  let email = registerForm.elements['email'].value;
  let date = registerForm.elements['date'].value;
  let avatar = registerForm.elements['avatar'].value;
  let data = new FormData();
  data.append('name', name);
  data.append('lastName', lastName);
  data.append('tel', tel);
  data.append('email', email);
  data.append('date', date);
  data.append('avatar', avatar);
  let data_body =
    '&name=' +
    name +
    '&lastName=' +
    lastName +
    '&tel=' +
    tel +
    '&email=' +
    email +
    '&date=' +
    date +
    '&avatar=' +
    avatar;
  fetch('clientAdd', {
    method: 'POST',
    body: data_body,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject();
      }
      return response.text();
    })
    .then((i) => console.log(i))
    .catch(() => filtering());
  var inputs = document.querySelectorAll('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
});
