const body = document.body;

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('username');
let login = myParam;

let url = 'https://api.github.com/users/Alina1317';
  if(urlParam != '') {
    url = `https://api.github.com/users/${login}`;
  }

fetch(url)
  .then(response => {
    if (response.status != 404) {
      return response.json();
    }
    else {
      return null;
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
  
    .catch(error => document.body.innerHTML = 'Пользователь не найден');
    