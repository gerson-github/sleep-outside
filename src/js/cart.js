import { getLocalStorage, setLocalStorage } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addRemoveListeners();

}




function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  
<button class="remove-btn" data-id="${item.Id}"> Remove </button>

</li>`;

  //localStorage.removeItem("so-cart");
  return newItem;
}

function addRemoveListeners() {
  const buttons = document.querySelectorAll(".remove-btn");
  buttons.forEach((button) => { 
    button.addEventListener("click", function () {
      const itemId = button.dataset.id;
      let cart = getLocalStorage("so-cart") || [];
      cart = cart.filter((item) => item.Id != itemId);
      setLocalStorage("so-cart", cart);
      renderCartContents();

    });
  });


}


renderCartContents();
