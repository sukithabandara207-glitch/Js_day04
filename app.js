let products = [];

let cart = [];


// ================= LOAD PRODUCTS =================

fetch("products.json")

    .then(response => response.json())

    .then(data => {

        products = data;

        displayProducts(products);

    })

    .catch(error => {

        console.log("Error loading products:", error);

    });


// ================= DISPLAY PRODUCTS =================

function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";


    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <p class="price">
                Rs. ${product.price.toLocaleString()}
            </p>

            <button
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

        `;


        container.appendChild(card);

    });

}


// ================= ADD TO CART =================

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    cart.push(product);


    updateCart();


    alert(product.name + " added to cart!");
}


// ================= UPDATE CART =================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    const cartCount =
        document.getElementById("cartCount");


    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-item-info">

                <h4>${product.name}</h4>

                <p>
                    Rs. ${product.price.toLocaleString()}
                </p>

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartCount.textContent = cart.length;


    cartTotal.textContent =
        total.toLocaleString();


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }

}


// ================= REMOVE FROM CART =================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================= OPEN CART =================

document
    .getElementById("cartBtn")
    .addEventListener("click", function () {

        const cartBox =
            document.getElementById("cartBox");


        cartBox.style.display = "block";

    });


// ================= CLOSE CART =================

function closeCart() {

    document.getElementById("cartBox")
        .style.display = "none";

}


// ================= SHOP NOW =================

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let total = cart.reduce(
        (sum, product) =>
            sum + product.price,
        0
    );


    alert(
        "Order placed successfully!\n\n" +
        "Total: Rs. " +
        total.toLocaleString()
    );


    cart = [];

    updateCart();

    closeCart();

}