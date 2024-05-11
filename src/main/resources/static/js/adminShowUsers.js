const urlAdmin = "/api/admin"

async function adminPage() {
    let page = await fetch(urlAdmin);

    if (page.ok) {
        let listUsers = await page.json();
        adminDisplayAllUser(listUsers);
    } else {
        alert(`Error, ${page.status}`)
    }
}

function adminDisplayAllUser(listUsers) {
    const showAllUsers = document.getElementById('show-all-users');
    let HTMLData = ""
    for (let user of listUsers) {
        let rolesSting = [];
        for (let role of user.roles) {
            rolesSting.push(" " + role.role.toString().substring(5))
        }
        HTMLData += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${rolesSting.join(", ")}</td>
            <td>
            <button class="btn btn-info text-white" data-bs-toggle="modal" 
            data-bs-target="#editModal" id="edit-admin-button" onClick="fillEditedUserPage(${user.id})">Edit</button>
            
</td>
            <td>
            <button class="btn btn-danger text-white" data-bs-toggle="modal" 
            data-bs-target="#deleteModal" id="delete-admin-button" onClick="fillDeleteUserPage(${user.id})">Delete</button>
</td>
        </tr>`

    }
    showAllUsers.innerHTML = HTMLData
}

adminPage();