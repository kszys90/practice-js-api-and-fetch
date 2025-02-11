const apiUrl = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', init);

function init() {
    addUsers()
}

function loadUsers() {
    const promise = fetchGet(apiUrl);

    promise
        .then(data => console.log(data))
        .then(data => insertUsers(data))
        .catch(err => console.error(err));
}

function fetchGet(url) {
    return fetch(url)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            return Promise.reject(resp);
        })
        .catch(err => console.log(err))
}

function insertUsers(usersList) {
    const ulElement = document.querySelector('.users');
    ulElement.innerHTML = '';
    usersList.forEach(user => {
        const liElement = document.createElement('li');
        liElement.innerText = `${user.firstName} ${user.lastName}`;

        ulElement.appendChild(liElement);
    });
}

function addUsers() {
    const form = document.querySelector('.form')
    form.addEventListener('submit', event => {
        event.preventDefault()
        console.log(event.target.elements)
        const { firstName, lastName } = event.target.elements
        const data = {
            firstName: firstName.value, lastName: lastName.value
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(apiUrl, options)
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
            .finally(loadUsers)

    })
}
