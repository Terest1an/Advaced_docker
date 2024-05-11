async function fillDeleteUserPage(id) {
    const url = "api/admin/" + id
    let page = await fetch(url);

    if (page.ok) {
        let user = await page.json();
        showDeletedUser(user);
        userDelete();
    } else {
        alert(`Error, ${page.status}`)
    }
    console.log();
}

function showDeletedUser(user) {
    const deleteIdInput = document.getElementById('deleteId');
    const deleteFirstNameInput = document.getElementById('deleteFirstName');
    const deleteLastNameInput = document.getElementById('deleteLastName');
    const deleteAgeInput = document.getElementById('deleteAge');
    const deleteEmailInput = document.getElementById('deleteEmail');
    const deleteRoleSelect = document.getElementById('deleteRole');
    deleteIdInput.value = user.id;
    deleteFirstNameInput.value = user.firstName;
    deleteLastNameInput.value = user.lastName;
    deleteAgeInput.value = user.age;
    deleteEmailInput.value = user.username;
    deleteRoleSelect.innerHTML = '';

    const adminOption = document.createElement('option');
    adminOption.value = 'ROLE_ADMIN';
    adminOption.textContent = 'ADMIN';
    deleteRoleSelect.appendChild(adminOption);

    const userOption = document.createElement('option');
    userOption.value = 'ROLE_USER';
    userOption.textContent = 'USER';
    deleteRoleSelect.appendChild(userOption);

    user.roles.forEach(role => {
        if (role.authority === 'ROLE_USER') {
            userOption.selected = true;
        }
        if (role.authority === 'ROLE_ADMIN') {
            adminOption.selected = true;
        }
    });


}


async function userDelete() {
    const deleteMod = document.getElementById("delete-form")
    deleteMod.addEventListener("submit", remove)

    function remove(addEvent) {
        addEvent.preventDefault()
        const deleteIdInput = document.getElementById('deleteId');
        let urlDel = "api/admin/" + deleteIdInput.value
        let method = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(urlDel, method).then(() => {
            document.getElementById("deleteClose").click();
            adminPage()
        })
    }
}


