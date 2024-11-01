const endpoint = 'https://retoolapi.dev/iOvhhb/data'; // API endpoint
const tbody = document.querySelector('tbody'); // tbody element
const btnAdd = document.querySelector('#add-btn'); // add button
const addContainer = document.querySelector('#add-container'); // add container
const btnCancelar = document.querySelector('#can-btn-forms'); // cancel button
const btnAgregar = document.querySelector('#add-btn-forms'); // add button


getArticulos = async () => {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        data.forEach((articulo) => {
            if (isNaN(articulo.image)&& isNaN(articulo.title) && isNaN(articulo.category) && isNaN(articulo.description)) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
            <tr>
                <td class="container-img"><img src="${articulo.image}" alt="${articulo.title}-img"></td>
                <td>${articulo.title}</td>
                <td>$${articulo.price}</td>
                <td>${articulo.category}</td>
                <td>${articulo.description}</td>
                <td class="container-img"><button id="btn-eliminar"><img src="https://w7.pngwing.com/pngs/999/436/png-transparent-delete-icon.png" alt="btn-eliminar"></button></td> 
            <tr>
            `;
                tbody.appendChild(tr);
            }   
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

btnAgregar.addEventListener('click', () => {
    let image = document.querySelector('#product-image').value
    let title = document.querySelector('#product-title').value
    let price = document.querySelector('#product-price').value
    let category = document.querySelector('#product-category').value
    let description = document.querySelector('#product-description').value
    if(isNaN(image) && isNaN(title) && isNaN(category) && isNaN(description)){
        const articulo = {
            image: image,
            title: title,
            price: price,
            category: category,
            description: description 
        }
        console.log(articulo);
        colocarArticulo(articulo);
        getArticulos();
        addContainer.classList.toggle('active');
    }
});

colocarArticulo = async (articulo) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulo)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error: ', error);
    }
}

btnAdd.addEventListener('click', () => {
    addContainer.classList.toggle('active');
});

btnCancelar.addEventListener('click', () => {
    addContainer.classList.toggle('active');
});

let articulos = getArticulos();

