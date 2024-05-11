async function fillEditedUserPage(id) {
    const url = "api/admin/" + id
    let page = await fetch(url);

    if (page.ok) {
        let user = await page.json();
        showEditedUser(user);
    } else {
        alert(`Error, ${page.status}`)
    }
    console.log();
}

function showEditedUser(user) {
    const editIdInput = document.getElementById('editId');
    const editFirstNameInput = document.getElementById('editFirstName');
    const editLastNameInput = document.getElementById('editLastName');
    const editAgeInput = document.getElementById('editAge');
    const editEmailInput = document.getElementById('editEmail');
    const editRoleSelect = document.getElementById('editRole');
    editIdInput.value = user.id;
    editFirstNameInput.value = user.firstName;
    editLastNameInput.value = user.lastName;
    editAgeInput.value = user.age;
    editEmailInput.value = user.username;
    editRoleSelect.innerHTML = '';

    // Добавляем опции для ROLE_USER и ROLE_ADMIN

    const adminOption = document.createElement('option');
    adminOption.value = 'ROLE_ADMIN';
    adminOption.textContent = 'ADMIN';
    editRoleSelect.appendChild(adminOption);

    const userOption = document.createElement('option');
    userOption.value = 'ROLE_USER';
    userOption.textContent = 'USER';
    editRoleSelect.appendChild(userOption);

    user.roles.forEach(role => {
        if (role.authority === 'ROLE_USER') {
            userOption.selected = true;
        }
        if (role.authority === 'ROLE_ADMIN') {
            adminOption.selected = true;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const userEditButton = document.getElementById('userEditButton');
    userEditButton.addEventListener('click', function () {
        saveEditedUser();
    });
});

async function saveEditedUser() {
    const editIdInput = document.getElementById('editId');
    const editFirstNameInput = document.getElementById('editFirstName');
    const editLastNameInput = document.getElementById('editLastName');
    const editAgeInput = document.getElementById('editAge');
    const editEmailInput = document.getElementById('editEmail');
    const editPassword = document.getElementById('editPassword');
    const editRolesSelected = document.getElementById("editRole");
    const roles = Array.from(editRolesSelected.selectedOptions)
        .filter(option => option.selected)
        .map(option => option.value);

    const editedUser = {
        id: editIdInput.value,
        firstName: editFirstNameInput.value,
        lastName: editLastNameInput.value,
        age: editAgeInput.value,
        username: editEmailInput.value,
        password: editPassword.value,
        roles: roles
    };
    console.log(editedUser)


    const url = "api/admin/update";
    const options = {
        method: 'PUT', // Метод запроса
        headers: {
            'Content-Type': 'application/json' // Указываем тип контента как JSON
        },
        body: JSON.stringify(editedUser) // Преобразуем объект editedUser в JSON
    };

    const response = await fetch(url, options); // Отправляем запрос на сервер

    if (!response.ok) {
        alert(`Ошибка при сохранении данных: ${response.status}`);
    }
}
