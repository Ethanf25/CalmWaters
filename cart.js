const products = [
    { id: 1, name: "Crankbait", price: 9.99, image: "images/lure1.jpg" },
    { id: 2, name: "Spinnerbait", price: 7.49, image: "images/lure2.jpg" },
    { id: 3, name: "Worm Lure", price: 5.99, image: "images/lure3.jpg" }
  ];
  
  const cart = [];
  const productList = document.getElementById('product-list');
  const cartList = document.getElementById('cart');
  const totalDisplay = document.getElementById('total');
  
  function renderProducts() {
    products.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';
  
      col.innerHTML = `
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price.toFixed(2)}</p>
            <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      `;
      productList.appendChild(col);
    });
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.product.id === productId);
  
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }
  
    renderCart();
  }
  
  function removeFromCart(productId) {
    const index = cart.findIndex(item => item.product.id === productId);
    if (index > -1) {
      cart[index].quantity--;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }
    renderCart();
  }
  
  function renderCart() {
    cartList.innerHTML = '';
    let total = 0;
  
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${item.product.name} x${item.quantity}
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.product.id})">Remove</button>
      `;
      cartList.appendChild(li);
      total += item.product.price * item.quantity;
    });
  
    totalDisplay.textContent = total.toFixed(2);
  }
  
  renderProducts();
  