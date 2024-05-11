async function showUserEmailOnNavbar(user) {
    const currentUserNavbar = document.getElementById("user-nav-bar")
    const userName = user.username;
    let userRoles = [];
    for (let role of user.roles) {
        userRoles.push(" " + role.role.toString().substring(5))
    }
    currentUserNavbar.innerHTML = userName + " with roles: " + userRoles.join(", ");
}