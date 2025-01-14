const urlUser = "/api/user"

async function getCurrentUser() {
    let page = await fetch(urlUser);

    if (page.ok) {
        let user = await page.json();
        displayCurrentUser(user);
        await showUserEmailOnNavbar(user)
    } else {
        alert(`Error, ${page.status}`)
    }
    console.log();
}

function displayCurrentUser(user) {
    const currentUserList = document.getElementById('current-user');
    let rolesSting = [];
    for (let role of user.roles) {
        rolesSting.push(" " + role.role.toString().substring(5))
    }
    currentUserList.insertAdjacentHTML('beforeend',
        `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${rolesSting.join(", ")}</td>
        </tr>`
    );
}

getCurrentUser();