let AuthDataArr =[];
const redirectToanother = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let confirm_password = document.getElementById("confirm_password").value;
    window.location.href = "./login.html";
    let parsed_data = JSON.parse(localStorage.getItem("authData"));
    parsed_data.push({ 'name': name, 'email': email, 'confirm_password': confirm_password, })
    console.log(AuthDataArr);
    let stored_authData = localStorage.setItem("authData", JSON.stringify(parsed_data));
}
