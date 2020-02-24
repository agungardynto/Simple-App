const inputType = document.querySelectorAll('input');
const form = document.querySelectorAll('.form');

const firstForm = form[0];
firstForm.classList.add('active');

inputType.forEach((element, index) => {
    element.addEventListener('keyup', key => {
        if (key.keyCode === 13) {
            const getParent = element.parentElement;
            const nextParent = getParent.nextElementSibling;

            if (element.type === 'text' && element.value === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Field is Required',
                });
            } else if (element.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Enter a Valid Email',
                });
            } else {
                getParent.classList.remove('active');
                nextParent.classList.add('active');

                if (form.length - 1 === index + 1) {
                    sendData();
                    setInterval(() => {
                        window.location.reload();
                    }, 10000);
                }
            }
        }
    });
});

function sendData() {
    $.get("https://api.ipdata.co?api-key=ac4e68bbc350f124312274fbb72468340161ca254cfd39184eea6ebd", async (res, req) => {
        if (req === 'success') {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const country = res.country_name;
            const flag = res.flag;
            const data = { name, email, message, country, flag };

            const options = {
                method: 'post',
                headers: { 'Content-Type': 'application/JSON' },
                body: JSON.stringify(data)
            }

            const response = await fetch('/api', options);
            await response.json();
        }
    }, "jsonp");
}