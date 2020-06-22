let body = document.body;
let urlParam = window.location.search.substring(1);

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
      console.log(json.avatar_url);
      console.log(json.name);
      console.log(json.bio);
      console.log(json.html_url);
   
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
    
    .catch(error => alert('Пользователь не найден'));