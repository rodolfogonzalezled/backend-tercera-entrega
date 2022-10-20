const email = document.getElementById("email");
const password = document.getElementById("password");

function login(e) {
    e.preventDefault();

    let user = {
        email: email.value,
        password: password.value
    };

    fetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(result => {
        if(!result.ok)
            throw Error(result.status)

        result.json();
    })
    .then(json => {
        window.location.replace("/");
    }).catch(error => {
        console.log(error);
        if(error.message == 500) {
            swal("Login error", '', "error", {button: true, timer: 5000});
        }
    });
}