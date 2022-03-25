{{!-- request.open('GET', '/getEditCient' + this.id, true);
request.setRequestHeader('Content-Type', 'application/json');
request.responseType = 'json';
request.send(client);
request.onload = function(){
  console.log(request.response);
} --}}
$.ajax({
    url:     "/getEditCient"+this.id, //url страницы (action_ajax_form.php)
    type:     "GET", //метод отправки
    dataType: "html", //формат данных
    data: client,  // Сеарилизуем объект
    success: function(response) { //Данные отправлены успешно
    console.log(response);
      result = $.parseJSON(response);
  },
  error: function(response) { // Данные не отправлены
  }
});


// SCRIPT ADD
document.getElementById('submit').addEventListener('click', function (e) {
  e.preventDefault();
  let registerForm = document.forms['addClient'];
  let name = registerForm.elements['name'].value;
  let lastName = registerForm.elements['lastName'].value;
  let tel = registerForm.elements['tel'].value;
  let email = registerForm.elements['email'].value;
  let date = registerForm.elements['date'].value;
  let avatar = registerForm.elements['avatar'].value;
  let client = JSON.stringify({
    name: name,
    lastName: lastName,
    tel: tel,
    email: email,
    date: date,
    avatar: avatar,
  });
  let request = new XMLHttpRequest();
  request.open('POST', '/clientAdd', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(client);
  var inputs = document.querySelectorAll('input');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
});

let data_body = "&name=" + name + "&lastName="+ lastName+"&tel=" + tel + "&email="+ email+"&date="+ date;  

  
fetch("filter", { 
              method: "POST",
              body: data_body,   
              headers:{"content-type": "application/x-www-form-urlencoded"} 
              })
              
              .then( (response) => {
                      if (response.status !== 200) {           
                    return Promise.reject();
                      }   
              return response.text()
              })
              .then(i => console.log(i))
              .catch(() => console.log('ошибка')); 
            var inputs = document.querySelectorAll('input');

            for (var i = 0;  i < inputs.length; i++) {
              inputs[i].value = '';
            };
         });
         function filter1(){
  
          let registerForm = document.forms["filterClient"];
          let name = registerForm.elements["name"].value;
          let lastName = registerForm.elements["lastName"].value;
          let tel = registerForm.elements["tel"].value;
          let email = registerForm.elements["email"].value;
          let date = registerForm.elements["date"].value;
          let client = JSON.stringify({name: name, lastName: lastName, tel:tel, email:email, date:date});
                     let request = new XMLHttpRequest(); 
                      request.open("POST", "/filter", true);   
                      request.setRequestHeader("Content-Type", "application/json");
                      request.onload = function(){
                       console.log(request.response);
                       let res = $.parseJSON(request.response);
                       console.log(res.result)
                       let cards = "";
                       for(let i = 0; i<res.result.length;i++){
                         cards+=`<div class="card border-primary mb-2">
                             <div class="row">
                               <div class="col-md-3 text  ">
                                 <img src="myphoto" alt="" width="250" height="250">
                               </div>
                               
                               <div class="col-md-3 mt-5">
                                 <div class="text-default text mt-4">`+res.result[i].name + ` `+ res.result[i].lastName+`</div>
                                 <div class="text-default text mt-3">`+res.result[i].date+`</div>
                               </div>
                               <div class="col-md-3 mt-5">
                                 <div class="text-default text mt-4">`+res.result[i].email+`</div>
                                 <div class="text-default text mt-3">`+res.result[i].tel+`</div>
                               </div>
                       <!-- кнопка редагувати -->
                             <div class="col-md-3 mt-5">
                                 <button class="edit_button btn btn-outline-primary text mt-2"  data-bs-toggle="modal" data-bs-target="#editModal" id= {{id}}>   edit client  </button>
                                 <br><br>
                       <!-- кнопка delete -->
                                 <button class="delete_button btn btn-outline-danger text " id="`+res.result[i].id+`" onclick="delete1(`+res.result[i].id+`)">  delete client  </button> 
                               </div>
                             </div>
                           </div>`;
                       }
                   let l = document.getElementById("result");
                   l.innerHTML=cards;    
             console.log(result)
                       };
                      request.send(client);
         }
         
         
         
         //SCRIPT GET FOR EDIT
         var get = document.getElementsByClassName('edit_button');
         for (var i = 0; i < get.length; i++)
           get[i].onclick = function () {
             let client = JSON.stringify({ id: this.id });
             let request = new XMLHttpRequest();
           };
         
         
         
         
         
         document.getElementById("submit").addEventListener("click", function (e) {
                      e.preventDefault();
                     let registerForm = document.forms["addClient"];
                     let name = registerForm.elements["name"].value;
                     let lastName = registerForm.elements["lastName"].value;
                     let tel = registerForm.elements["tel"].value;
                     let email = registerForm.elements["email"].value;
                     let date = registerForm.elements["date"].value;
                     let avatar = registerForm.elements["avatar"].value;
                     let data = new FormData()
                       data.append('name', name)
                       data.append('lastName', lastName)
                       data.append('tel', tel)
                       data.append('email', email)
                       data.append('date', date)
                       data.append('avatar', avatar)
                      let data_body = "&name=" + name + "&lastName="+ lastName+"&tel=" + tel + "&email="+ email+"&date="+ date+"&avatar="+ avatar;  
                     fetch("clientAdd", { 
                       method: "POST",
                       body: data_body,   
                       headers:{"content-type": "application/x-www-form-urlencoded"} 
                       })
                       
                       .then( (response) => {
                               if (response.status !== 200) {           
                             return Promise.reject();
                               }   
                       return response.text()
                       })
                       .then(i => console.log(i))
                       .catch(() => console.log('ошибка')); 
                     var inputs = document.querySelectorAll('input');
         
                     for (var i = 0;  i < inputs.length; i++) {
                       inputs[i].value = '';
                     };
                  });



                  function paginButtons(){
                    let request = new XMLHttpRequest();
                    let limit = getLimit()
                    let test = `?page=1&limit=`+limit+`&sortBy=id:ASC`;
                      request.open('GET', '/count', true);
                      request.setRequestHeader('Content-Type', 'application/json');
                      request.send(test);
                      let button = "";
                      request.onload = function(){
                      console.log(request.response);
                      let count = $.parseJSON(request.response);
                      console.log(count.count)
                      for(let i = 1; i <= Math.ceil(count.count/limit); i++){
                       button+=`<li class="page-item col-md-1"><a class="page-link"  onclick = getPagin(`+i+`) href="#">`+i+`</a></li>`
                        }
                        let l = document.getElementById("pagin");
                        l.innerHTML = button;
                      }  
                  };
                  function getLimit(){
                    let limit = document.getElementById('limit');
                    return limit.value;
                  }
                  
                  function getPagin(i){
                    let client = JSON.stringify({ id: i });
                      let request = new XMLHttpRequest();
                      let test = `?page=`+i+`&limit=`+getLimit()+`&sortBy=id:ASC&`;
                      request.open('GET', '/paginate'+test, true);
                      request.setRequestHeader('Content-Type', 'application/json');
                      request.send(client);
                      request.onload = function(){
                      console.log(request.response);
                      let res = $.parseJSON(request.response);
                      console.log(res.result)
                      let cards = "";
                      getCargs(res.result.data)
                      };
                  }
                  
                  document.getElementById('limit').addEventListener("change", function (e) {
                    e.preventDefault();
                    paginButtons();
                  });
         