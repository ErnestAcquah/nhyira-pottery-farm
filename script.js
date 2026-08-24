const PRODUCTS = {
  eggs: {name:"Fresh Eggs", unit:"tray of 30", price:60},
  chicken: {name:"Chicken", unit:"1 chicken", price:80},
  "live-chicken": {name:"Live Chicken", unit:"1 chicken", price:100}
};

let cart = {};
try {
  cart = JSON.parse(localStorage.getItem("nhyiraCart") || "{}");
} catch (e) {
  cart = {};
  localStorage.removeItem("nhyiraCart");
}

const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function money(n){ return `GH₵${n.toFixed(2)}`; }
function save(){ localStorage.setItem("nhyiraCart", JSON.stringify(cart)); renderCart(); }
function add(key){
  cart[key] = (cart[key] || 0) + 1;
  save();
  openCart();
}
function remove(key){
  delete cart[key];
  save();
}
function change(key, delta){
  cart[key] = (cart[key] || 0) + delta;
  if(cart[key] <= 0) delete cart[key];
  save();
}
function renderCart(){
  cartItems.innerHTML = "";
  let total = 0, count = 0;
  Object.entries(cart).forEach(([key, qty])=>{
    const p = PRODUCTS[key];
    total += p.price * qty; count += qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `<div><b>${p.name}</b><small>${p.unit}</small></div>
      <div class="qty-controls">
        <button data-minus="${key}">−</button><span>${qty}</span><button data-plus="${key}">+</button>
        <b>${money(p.price*qty)}</b>
      </div>`;
    cartItems.appendChild(row);
  });
  if(!Object.keys(cart).length) cartItems.innerHTML = "<p>Your cart is empty.</p>";
  cartTotal.textContent = money(total);
  cartCount.textContent = count;
}
function openCart(){ cartDrawer.classList.add("open"); overlay.classList.add("open"); cartDrawer.setAttribute("aria-hidden","false"); }
function closeCart(){ cartDrawer.classList.remove("open"); overlay.classList.remove("open"); cartDrawer.setAttribute("aria-hidden","true"); }

document.addEventListener("click", e=>{
  const addBtn = e.target.closest("[data-add]");
  if(addBtn) add(addBtn.dataset.add);
  const plus = e.target.closest("[data-plus]");
  if(plus) change(plus.dataset.plus, 1);
  const minus = e.target.closest("[data-minus]");
  if(minus) change(minus.dataset.minus, -1);
});
document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.querySelector(".menu-toggle").addEventListener("click", ()=>{
  document.querySelector(".nav-links").classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click", ()=>{
  document.querySelector(".nav-links").classList.remove("open");
}));

document.getElementById("whatsappOrder").addEventListener("click", ()=>{
  if(!Object.keys(cart).length){ alert("Your cart is empty."); return; }
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const location = document.getElementById("customerLocation").value.trim();
  if(!name || !phone || !location){ alert("Please enter your name, phone number and delivery location."); return; }
  let total = 0;
  const lines = Object.entries(cart).map(([key,qty])=>{
    const p=PRODUCTS[key]; total += p.price*qty;
    return `- ${p.name} (${p.unit}) x ${qty} = ${money(p.price*qty)}`;
  });
  const msg = `Hello Nhyira Pottery Farm Company. I would like to place an order.%0A%0ACustomer: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ADelivery location: ${encodeURIComponent(location)}%0A%0AOrder:%0A${encodeURIComponent(lines.join("\n"))}%0A%0AProduct total: ${money(total)}%0A%0APlease confirm availability, delivery fee and payment details.`;
  window.open(`https://wa.me/233530801719?text=${msg}`, "_blank");
});

document.getElementById("bookingForm").addEventListener("submit", e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Hello Nhyira Pottery Farm Company. I want to book chicken.%0A%0AName: ${encodeURIComponent(f.get("name"))}%0APhone: ${encodeURIComponent(f.get("phone"))}%0AQuantity: ${encodeURIComponent(f.get("quantity"))}%0APreferred date: ${encodeURIComponent(f.get("date"))}%0ADelivery location: ${encodeURIComponent(f.get("location"))}%0ANote: ${encodeURIComponent(f.get("note") || "None")}`;
  window.open(`https://wa.me/233530801719?text=${msg}`, "_blank");
});
document.getElementById("year").textContent = new Date().getFullYear();
renderCart();
