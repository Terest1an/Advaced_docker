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

async function showEditedUser(user) {
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

    await fillRoles(); // Вызываем функцию fillRoles() для заполнения списка ролей

    user.roles.forEach(role => {
        editRoleSelect.querySelectorAll('option').forEach(option => {
            if (option.value === role.authority) {
                option.selected = true; // Выбираем текущую роль пользователя
            }
        });
    });

}
async function fillRoles() {
    const urlRoles = '/api/roles';
    let page = await fetch(urlRoles)
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('editRole');
            selectElement.innerHTML = '';
            data.forEach(role => {
                const option = document.createElement('option');
                option.value = role.role;
                option.text = role.role.substring(5);
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const userEditButton = document.getElementById('userEditButton');
    userEditButton.addEventListener('click', function (event) {
        saveEditedUser(event);
    });
});

async function saveEditedUser(event) {
    event.preventDefault();
    const editIdInput = document.getElementById('editId');
    const editFirstNameInput = document.getElementById('editFirstName');
    const editLastNameInput = document.getElementById('editLastName');
    const editAgeInput = document.getElementById('editAge');
    const editEmailInput = document.getElementById('editEmail');
    const editPassword = document.getElementById('editPassword');
    const editRolesSelected = document.getElementById("editRole");
    const editRoles = Array.from(editRolesSelected.selectedOptions)
        .filter(option => option.selected)
        .map(option => option.value);

    const editedUser = {
        id: editIdInput.value,
        firstName: editFirstNameInput.value,
        lastName: editLastNameInput.value,
        age: editAgeInput.value,
        username: editEmailInput.value,
        password: editPassword.value,
        roles: editRoles
    };
    const url = "api/admin/update";
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
    };

    const response = await fetch(url, options).then(() => {
        document.getElementById("editClose").click();
        adminPage();

    })

}
