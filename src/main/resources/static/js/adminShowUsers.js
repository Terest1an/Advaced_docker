const urlAdmin = "/api/admin"

async function adminGetAllUsers() {
    let page = await fetch(urlAdmin);

    if (page.ok) {
        let listUsers = await page.json();
        adminDisplayAllUser(listUsers);
    } else {
        alert(`Error, ${page.status}`)
    }
    console.log();
}

function adminDisplayAllUser(listUsers) {
    const showAllUsers = document.getElementById('show-all-users');
    for (let user of listUsers) {
        let rolesSting = [];
        for (let role of user.roles) {
            rolesSting.push(" " + role.role.toString().substring(5))
        }
        showAllUsers.insertAdjacentHTML('beforeend',
            `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${rolesSting.join(", ")}</td>
            <td>
            <button class="btn btn-info text-white" data-bs-toggle="modal" 
            data-bs-target="#editModal" id="edit-admin-button"" >Edit</button>
            
</td>
            <td>
            <button class="btn btn-danger text-white" data-bs-toggle="modal" 
            data-bs-target="#deleteModal" id="delete-admin-button" >Delete</button>
</td>
        </tr>`
        );
    }
}

adminGetAllUsers();