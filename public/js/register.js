var inputField = document.getElementById("phone");
var phoneInput = window.intlTelInput(inputField, {
    preferredCountries: ["ar", "co", "br", "cl", "ve"],
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

function register(e) {
    e.preventDefault();
    let formData = new FormData(document.getElementById("registerForm"));
    let phoneNumber = phoneInput.getNumber();
    formData.set('phone', phoneNumber);
    formData.append('imageProfile', document.getElementById("imageProfile").files[0])

    fetch('/api/session/register', {
        method: 'POST',
        body: formData
    })
        .then(result => {
            if (!result.ok)
                throw Error(result.status)
            result.json();
        })
        .then(json => {
            window.location.replace("/");
        }).catch(error => {
            console.log(error);
            if (error.message == 500) {
                swal("Register error", '', "error", { button: false, timer: 1000 });
            }
        });
}