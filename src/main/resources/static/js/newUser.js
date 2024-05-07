const newUserForm = document.getElementById("new-user-form");

async function createNewUser(user) {
    await fetch(urlAdmin, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
}


async function addNewUserForm() {

    newUserForm.addEventListener('submit', async function (event) {

        event.preventDefault();

        const firstName = newUserForm.querySelector('[name="firstName"]').value.trim();
        const lastName = newUserForm.querySelector('[name="lastName"]').value.trim();
        const age = newUserForm.querySelector('[name="age"]').value.trim();
        const email = newUserForm.querySelector('[name="email"]').value.trim();
        const password = newUserForm.querySelector('[name="password"]').value.trim();
        const rolesSelected = document.getElementById("roles");
        const roles = Array.from(rolesSelected.selectedOptions)
            .filter(option => option.selected)
            .map(option => option.value);

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            username: email,
            password: password,
            roles: roles
        };
        console.log(newUser)
        await createNewUser(newUser);

    });
}
addNewUserForm();


