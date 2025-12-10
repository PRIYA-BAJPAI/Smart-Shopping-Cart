// ---------------- PRODUCT DATA ----------------
const products = {
    1: { name: "Sun Glasses", price: 20 ,img:"./images/sunglasses.png"},
    2: { name: "Face Mask", price: 10 ,img:"./images/facemask.png"},
    3: { name: "Sun Screen", price: 100 ,img:"./images/sunscreen.png"},
    4: { name: "Hat", price: 50 ,img:"./images/hat.png"}
};

let cart = {}; // store items in cart

// Getting button elements
document.getElementById("AddToCart1").onclick = () => addToCart(1);
document.getElementById("AddToCart2").onclick = () => addToCart(2);
document.getElementById("AddToCart3").onclick = () => addToCart(3);
document.getElementById("AddToCart4").onclick = () => addToCart(4);


// ---------------- ADD TO CART ----------------
function addToCart(id) {
    if (!cart[id]) {
        cart[id] = { ...products[id], qty: 1 };
    }

    // Disable button
    let btn = document.getElementById("AddToCart" + id);
    btn.textContent = "Already Added";
    btn.disabled = true;

    updateCart();
}


// ---------------- UPDATE CART DISPLAY ----------------
function updateCart() {
    let cartSection = document.querySelector("body");
    let oldDiv = document.getElementById("cartDisplay");
    if (oldDiv) oldDiv.remove(); // remove previous display

    let div = document.createElement("div");
    div.id = "cartDisplay";
    div.style.padding = "20px";

    div.innerHTML = `<h2>Your Cart</h2>`;

    const ids = Object.keys(cart);

    // If empty
    if (ids.length === 0) {
        div.innerHTML += "<h3>Your cart is empty</h3>";
        cartSection.appendChild(div);
        return;
    }

    // Display each cart item
    ids.forEach(id => {
        let item = cart[id];

        div.innerHTML += `
            <div style="background:white; margin:10px; padding:15px; border:2px solid black; border-radius:10px; display:flex;gap:20px;">
            <img src="${item.img}"width="120" height="120" style="border:1px solid black;padding:5px;border-radius:5px;">
            <div style="flex:1;">
                <h3>${item.name} - $${item.price}
                    <button style="float:right; background:red; padding:5px 10px;"
                        onclick="removeItem(${id})">X</button>
                </h3>

                <button onclick="changeQty(${id}, -1)" ${item.qty === 1 ? "disabled" : ""}>-</button>
                <span style="margin:0 10px;">${item.qty}</span>
                <button onclick="changeQty(${id}, 1)">+</button>

                ${item.qty >= 5 ? `<span style="background:orange; padding:3px 6px; margin-left:10px; border-radius:5px; color:white;">Bulk!</span>` : ""}

                <p><b>Line Total:</b> $${(item.qty * item.price).toFixed(2)}</p>
            </div>
            </div>
        `;
    });

    // Add Summary Box
    div.innerHTML += summaryHTML();

    cartSection.appendChild(div);
}


// ---------------- CHANGE QUANTITY ----------------
function changeQty(id, value) {
    cart[id].qty += value;
    if (cart[id].qty < 1) cart[id].qty = 1;

    updateCart();
}


// ---------------- REMOVE ITEM ----------------
function removeItem(id) {
    delete cart[id];

    // Re-enable button
    let btn = document.getElementById("AddToCart" + id);
    btn.textContent = "Add to Cart";
    btn.disabled = false;

    updateCart();
}


// ---------------- SUMMARY HTML ----------------
function summaryHTML() {
    let itemCount = 0;
    let subtotal = 0;

    Object.values(cart).forEach(it => {
        itemCount += it.qty;
        subtotal += it.qty * it.price;
    });

    let discount = 0;
    let discountMsg = "No discount applied";

    if (subtotal >= 100) {
        discount = subtotal * 0.15;
        discountMsg = "15% discount active!";
    } else if (subtotal >= 50) {
        discount = subtotal * 0.10;
        discountMsg = "10% discount active!";
    }

    let finalTotal = subtotal - discount;

    return `
        <div style="background:white; margin-top:20px; padding:15px; border:2px solid black; border-radius:10px;">
            <h2>Cart Summary</h2>
            <p><b>Items in cart:</b> ${itemCount}</p>
            <p><b>Subtotal:</b> $${subtotal.toFixed(2)}</p>
            <p><b>Discount:</b> -$${discount.toFixed(2)}</p>
            <p><b>Final Total:</b> $${finalTotal.toFixed(2)}</p>
            <p><i>${discountMsg}</i></p>

            <button onclick="emptyCart()" style="background:red; padding:8px 15px; margin-top:10px;">
                Empty Cart
            </button>
        </div>
    `;
}


// ---------------- EMPTY CART ----------------
function emptyCart() {
    cart = {};

    // Enable all buttons again
    for (let i = 1; i <= 4; i++) {
        let btn = document.getElementById("AddToCart" + i);
        btn.textContent = "Add to Cart";
        btn.disabled = false;
    }

    updateCart();
}
