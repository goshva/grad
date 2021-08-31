function addCart(bt) {
    console.info(bt.dataset)
    
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let alreadyAdded = products.find(x => x.itemId === bt.dataset.itemId)
    if (alreadyAdded){
      console.log(bt.dataset)
      alreadyAdded.itemCount = bt.dataset.itemCount++
      console.log(bt.dataset)

    }
    else {
        addProduct(bt.dataset)
    }
    counter.innerText = products.length;
    for (var i = 0; i < products.length; i++){
        var span = document.createElement('span');
        span.setAttribute('class','badge badge-primary badge-pill');
        var li = document.createElement('li');
        li.innerText = products[i]['itemName'];
        li.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');
        li.appendChild(span);
        cartList.appendChild(li);
    }
};

counter = document.getElementsByClassName("snipcart-items-count")[0];
let cartList = document.getElementById("cartList");
el = document.getElementsByClassName("snipcart-add-item")[0];
el.addEventListener("click", function(){addCart(this)}, false);

function addProduct(item){
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
}
function removeProduct(productId){

    // Your logic for your app.

    // strore products in local storage

    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.productId !== productId );
    localStorage.setItem('products', JSON.stringify(products));
}