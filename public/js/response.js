async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    const items = document.getElementById('item');
    items.textContent = Object.keys(data).length;
    for (item of data) {
        const list = document.getElementById('list-messages');
        const hr = document.createElement('hr');
        const card = document.createElement('div'); card.className = 'card';
        const body = document.createElement('div'); body.className = 'card-body text-justify';
        const title = document.createElement('div'); title.className = 'card-title';
        const email = document.createElement('div'); email.className = 'card-subtitle mb-2 text-muted';
        const message = document.createElement('div'); message.className = 'card-text';
        const date = document.createElement('div'); date.className = 'blockquote-footer mt-5';
        const i = document.createElement('i');
        const flag = document.createElement('img'); flag.setAttribute('src', item.flag);
        const dateString = new Date(item.timestamp).toLocaleString();

        title.textContent = `Message from : ${item.name}`;
        email.textContent = item.email;
        message.textContent = item.message;
        date.textContent = `At : ${dateString}`;

        list.append(card, hr); card.appendChild(body);
        title.appendChild(i); i.appendChild(flag);
        body.append(title, email, message, date);
    }
}
getData();