const url = "/api/user"

async function adminGetAllUsers() {
    let page = await fetch(url);

    if (page.ok) {
        let user = await page.json();
        adminDisplayAllUser(user);
    } else {
        alert(`Error, ${page.status}`)
    }
    console.log();
}

function adminDisplayAllUser(user) {
    const currentUserList = document.getElementById('current-user');
    for (let user of listUsers) {

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
}

getCurrentUser();