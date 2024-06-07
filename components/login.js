const redirectToanother = () => {
    // Get username and password
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const authData = JSON.parse(localStorage.getItem("authData"));
    //condition
    let filtered = [];
    authData.forEach((ele, i) => {
        if (email == ele.email && password == ele.confirm_password) {
            filtered.push(ele)
        }
    });
    let current_user = filtered;
    if (filtered.length) {
        window.location.href = "../index.html";
    } else {
        alert("Invalid email or password");
    }
}