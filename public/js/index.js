const btnLogout = document.getElementById('btnLogout')

btnLogout.addEventListener('click', evt => {
    fetch('/api/session/logout')
    .then(result => {
        if(!result.ok)
            throw Error(result.status)
    })
    .catch(error => {
        console.log(error);
        if(error.message == 500) {
            swal("Logout error", '', "error", {button: false, timer: 1000});
        }
    });
})