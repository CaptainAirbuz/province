const loginForm = document.getElementById('login-form');
const formContainer = document.getElementById('form-container');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error');
const formMessage = document.getElementById('form-message');
const anketaForm = document.getElementById('anketa-form');
let users = [];

// Загрузка users.json из GitHub API
fetch('https://api.github.com/repos/<ваш_логин_гитхаба>/<ваш_репозиторий>/contents/data/users.json')
    .then(response => response.json())
    .then(data => {
       const content = atob(data.content);
        users = JSON.parse(content);
    });

loginButton.addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        loginForm.style.display = 'none';
        formContainer.style.display = 'block';
        loginError.style.display = 'none';
    } else {
        loginError.style.display = 'block';
    }
});

anketaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(anketaForm);
    const name = formData.get('name');
    const age = formData.get('age');
    const question1 = formData.get('question1');

    const csvRow = `"${name}","${age}","${question1}"\n`;

    fetch('https://api.github.com/repos/<ваш_логин_гитхаба>/<ваш_репозиторий>/contents/data/answers.csv', {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.v3.raw'
        }
    })
    .then(response => {
         if(response.status === 404){
            return "";
         } else{
            return response.text();
         }
    })
    .then(data => {
         const existingContent = data;
        fetch('https://api.github.com/repos/<ваш_логин_гитхаба>/<ваш_репозиторий>/contents/data/answers.csv',{
            method: 'PUT',
            headers: {
               'Authorization': 'Bearer <ваш_токен_гитхаба>',
               'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                 message: 'Add new row to csv',
                 content: btoa(existingContent + csvRow),
                 sha: data.sha,
                branch:'main',
            })
       })
       .then(response => {
             if (response.ok){
                 formMessage.style.display = "block";
                 anketaForm.reset();
                  setTimeout(() => formMessage.style.display = 'none', 3000);
             } else{
                  console.log(response)
             }
        })
    })
    .catch(err => console.log(err));
});