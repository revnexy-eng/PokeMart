// Utility functions
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to Cart functionality
document.querySelectorAll(".buyBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.getAttribute("data-product");
    const price = parseFloat(btn.getAttribute("data-price"));
    let cart = getCart();
    cart.push({ product, price });
    saveCart(cart);
    alert(product + " added to cart!");
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: "add_to_cart", product, price });
  });
});

// Sign Up button event
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    alert("Sign Up successful!");
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: "sign_up" });
  });
}

// Free Trial button event
const freeTrial = document.getElementById("freeTrial");
if (freeTrial) {
  freeTrial.addEventListener("click", () => {
    alert("Tangina mo! Bumili ka!.");
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: "free_trial" });
  });
}

// Cart page functionality
if (document.getElementById("cartItems")) {
  let cart = getCart();
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalSpan = document.getElementById("cartTotal");

  function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.innerHTML = `${item.product} - $${item.price} 
        <button class="removeBtn" data-index="${index}">Remove</button>`;
      cartItemsDiv.appendChild(div);
      total += item.price;
    });
    cartTotalSpan.textContent = total;

    document.querySelectorAll(".removeBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({ event: "remove_from_cart" });
      });
    });
  }

  renderCart();

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: "checkout_start", total: cartTotalSpan.textContent });
    saveCart([]);
    window.location.href = "thankyou.html";
  });
}

// Contact form submit event
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Form submitted!");
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: "form_submit" });
  });
}
