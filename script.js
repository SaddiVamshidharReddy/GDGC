function getPostData(){
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(post=>{
        console.log(post)
        let products=document.querySelectorAll('.card');
        products.forEach((product,index) => {
            if (index < post.length) {
                product.querySelector('.img').src=post[index].image;
                product.querySelector('.name').innerHTML=post[index].title;
                product.querySelector('.gender').innerHTML=post[index].category;
                product.querySelector('.price').innerHTML=`$ ${post[index].price}`;
            }
        });
    })
    .catch(err=>console.log(err))
}

getPostData();

let btn = document.querySelectorAll('.cart');

document.querySelectorAll('.cart').forEach(btn => {
    btn.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        const cartItems = document.querySelector('.addCart .gridProduct');

        const cartItem = document.createElement('div');
        cartItem.className = 'product';
        cartItem.innerHTML = `
            <img class="cartImg" src="${card.querySelector('.img').src}" alt="Cart Image">
            <div class="details">
                <p class="product_name">${card.querySelector('.name').innerHTML}</p>
                <p class="product_price">${card.querySelector('.price').innerHTML}</p>
            </div>
            <div class="addbtn">
                <button class="sub">-</button>
                <span class="quantity">1</span>
                <button class="add">+</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
});

document.querySelector('.addCart .gridProduct').addEventListener('click', (event) => {
    if (event.target.classList.contains('add')) {
        const quantityElement = event.target.previousElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        
    }

    if (event.target.classList.contains('sub')) {
        const quantityElement = event.target.nextElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
        }
    }
});

let refresh=document.querySelector('.Order');
refresh.addEventListener('click',()=>{
    location.reload();
})










