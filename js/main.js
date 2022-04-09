if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCarItemButtoms = document.getElementsByClassName('btn-danger')

  for (var i = 0; i < removeCarItemButtoms.length; i++) {
    button = removeCarItemButtoms[i]
    button.addEventListener('click', removeCartItem)

  }

  var quantityInputs_Up = document.getElementsByClassName('up')
  for (var i = 0; i < quantityInputs_Up.length; i++) {
    var input_Up = quantityInputs_Up[i]
    input_Up.addEventListener('click', quantityChanged)
  }

  var quantityInputs_Down = document.getElementsByClassName('down')
  for (var i = 0; i < quantityInputs_Down.length; i++) {
    var input_Down = quantityInputs_Down[i]
    input_Down.addEventListener('click', quantityChanged)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  var addtoCartButtons = document.getElementsByClassName('cart')
  for (var i = 0; i < addtoCartButtons.length; i++) {
    var button = addtoCartButtons[i]
    button.addEventListener('click', addtoCartClicked)
  }
  var purchaseButton = document.getElementsByClassName('btn-purchase')[0].addEventListener('click', PurchaseClicked)

  var LikeButton = document.getElementsByClassName('liked')
  for (var i = 0; i < LikeButton.length; i++) {
    button = LikeButton[i]
    button.addEventListener('click', Like)
  }



}
function Like(event) {
  alert('You Have Like this Product!')
}

function PurchaseClicked(event) {
  var cartItems = document.getElementsByClassName('cart-items')[0]
  if (cartItems.firstChild == null) {
    alert('Please add Items to the Cart to Purchase')

  }
  else {
    alert('Thank you For your Purchase :) ')
  }

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }

  UpdateCartTotal()
}
function addtoCartClicked(event) {
  var button = event.target
  var product = button.parentElement.parentElement
  var title = product.getElementsByClassName('product-title')[0].innerText
  var price = product.getElementsByClassName('product-price')[0].innerText
  var image = product.getElementsByClassName('product-image')[0].src
  addItemtoCart(title, price, image)
  UpdateCartTotal()
}

function addItemtoCart(title, price, image) {
  var cartrow = document.createElement('div')
  cartrow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemsNames = document.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('This item is already added to the cart!')
      return
    }

  }
  var cartrowContents = `
   <div class="cart-item cart-column">
       <img class="cart-item-image" src="${image}" width="100"
           height="100">
       <span class="cart-item-title">${title}</span>
   </div>
   <span class="cart-price cart-column">${price} TND</span>
   <div class="cart-quantity cart-column">
       <span class="down" onClick='decreaseCount(event, this)'>-</span>
       <input class="cart-quantity-input" type="text" value="1">
       <span class="up" onClick='increaseCount(event, this)'>+</span>
       <button class="btn btn-danger" type="button">REMOVE</button>
   </div>`
  cartrow.innerHTML = cartrowContents

  cartItems.append(cartrow)
  cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartrow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
  cartrow.getElementsByClassName('up')[0].addEventListener('click', quantityChanged)
  cartrow.getElementsByClassName('down')[0].addEventListener('click', quantityChanged)


}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  UpdateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  UpdateCartTotal()
}


function UpdateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartrows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartrows.length; i++) {
    var cartrow = cartrows[i]
    var priceElement = cartrow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartrow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('TND', ''))
    var quantity = quantityElement.value
    total = total + (quantity * price)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = total + ' TND'

}

























/* add quantity */
function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}