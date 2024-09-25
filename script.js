let cart = [];

async function fetchData() {
    let resp = await fetch('https://fakestoreapi.com/products');
    let products = await resp.json();
    display(products);
}

function display(products) {
    const productList = document.querySelector('.flex');
    /* creating prod card */
    products.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src=${product.image} loading="lazy" alt=${product.title}>
            <h2>${product.title}</h2>
            <div class="price" style="display:flex">
                <h3>Price: </h3>
                <h3>$ ${product.price}</h3>
            </div>
            <div class="Rating" style="display:flex, align-items:center">
                <span style="color:#000; font-size:1rem">Rating: </span>
                <span style="color:#929292; font-size:1rem">★ </span>
                <span>${product.rating.rate}</span>
            </div>
            <a href='#cart'>
                <button class="addToCart">Add to Cart</button>
            </a>`;
        productList.appendChild(card);
        card.querySelector('button').addEventListener('click', () => handleAddToCart(product));
    });
}


function handleAddToCart(product) {
    cart.push(product);
    updateCart(); 
}

function handleRemoveFromCart(productId) {
    cart = cart.filter((item) => item.id != productId);
    updateCart();
}


function updateCart() {
    const cartDiv = document.querySelector('.gridProduct');
    cartDiv.innerHTML = '';
    let totalMrp = 0;

    if (cart.length == 0) {
        console.log(`${cart.length} hi`);
        const EmptyCart = document.createElement('h2');
        EmptyCart.innerHTML = 'Cart is Empty!! Add Products to Cart!!';
        cartDiv.appendChild(EmptyCart);
    }

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cartItem';

        cartItem.innerHTML = `
        <button class="closeButton">X </button>
        <img src=${item.image} loading="lazy" alt=${item.title}>
        <div class="product_name">
            <span class="title">${item.title}</span>
            <span>Price:$ ${item.price}</span>
        </div>`;

        cartDiv.appendChild(cartItem);

        cartItem.querySelector('button').addEventListener('click', () => { handleRemoveFromCart(item.id) });

        totalMrp += item.price;
    })


    const priceDiv = document.querySelector('.priceDetails');

    if (cart.length == 0) {
        priceDiv.style.height="50px";
        priceDiv.innerHTML = '';    
    }
    else {
        priceDiv.style.height="300px";
        priceDiv.innerHTML = `
        <table>
             <thead>
                <th colspan="2">Price Details</th>
            </thead>
            <tbody>
                <tr>
                    <td class="col1">Total MRP</td>
                    <td class="col2">$ ${totalMrp.toFixed(2)}</td>
                </tr>
                <tr>
                    <td class="col1">Coupon Discount</td>
                    <td class="col2">$ 50</td>
                </tr>
                <tr>
                    <td class="col1">Platform Fee</td>
                    <td class="col2">$ 10</td>
                </tr>
                <tr>
                    <td class="col1">Shipping Charges</td>
                    <td class="col2">$ 20</td>
                </tr>
                <tr>
                    <td class="col1">Total Amount</td>
                    <td class="col2">$ ${(totalMrp+20).toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
        <button class='placeButton'>Place Order</button>`
        priceDiv.querySelector('.placeButton').addEventListener('click', () => { alert('Placed Order Successfully');});
    }
};


fetchData();
updateCart();