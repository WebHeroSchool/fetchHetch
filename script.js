const body = document.body;

const urlParam = window.location.search.substring(1);
const login = (urlParam.split(('='))[1]);

let url = 'https://api.github.com/users/Alina1317';
  if(urlParam != '') {
    url = `https://api.github.com/users/${login}`
  }

let getDate = new Promise((resolve, reject) => {
let nowDate = new Date();
  setTimeout(() => {
    if(nowDate == true) {
      resolve(nowDate)
    }
    else{
      reject('Ошибка вычисления времени')
    }
  }, 3000);

// let container = document.querySelector('.container');

// function preLouder() {
//   container.classList.add('block');
// }

let getUser = fetch(url)

Promise.all([getUser, getDate])
  .then(([user, date]) => {
    userUrl = user;
    dateNow = date;
  })

  .then(response => {
    if (response.status != 404) {
      return response.json();
    }
    else {
      let err = new Error(response.statusText + ' ' + response.status);
      err.response = response;
      throw err
    }
  })
  
  .then(json => {
   let ava = new Image();  
   ava.src = json.avatar_url;
   body.append(ava);
   
   let name = document.createElement('p');
   name.classList.add('link');
   name.addEventListener("click", () => window.location = json.html_url);
    if (json.name != null) {
      name.innerHTML = json.name;    
    } else {
      name.innerHTML = 'Информация об имени пользователя недоступна';
    }
    body.append(name); 
    
   let bio = document.createElement('p');
    if (json.bio != null) {
      bio.innerHTML = json.bio;    
    } else {
       bio.innerHTML = 'Пользователь не заполнил это поле';
    }
    body.append(bio);  
    })
  
    .catch(error => document.body.innerHTML = `Пользователь не найден.<br> ${error}`);