function addCart(item) {
    console.log(2)
    //let products = JSON.parse(localStorage.getItem("products")) || [];
    //let alreadyAdded = products.find(x => x.itemId === bt.dataset.itemId)
    /*if (alreadyAdded){
      console.log(bt.dataset)
      alreadyAdded.itemCount = bt.dataset.itemCount++
      console.log(bt.dataset)

    }
    else {
        addProduct(bt.dataset)
    }
    */

    let span = document.createElement('span');
    span.setAttribute('class','badge badge-primary badge-pill');
    let li = document.createElement('li');
    li.innerText = item['itemName'];
    li.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');
    li.appendChild(span);
    cartList.appendChild(li);

};

counter = document.getElementsByClassName("snipcart-items-count")[0];
let cartList = document.getElementById("cartList");
el = document.getElementsByClassName("snipcart-add-item")[0];
el.addEventListener("click", function(){addProduct(this.dataset)}, false);

function addProduct(item){
    console.log(1)
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
        while (cartList.firstChild) {
            cartList.firstChild.remove()
        }
        for (var i = 0; i < products.length; i++){
            addCart(products[i])
        }
        
    }
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    console.log(products)
    addCart(item)
    counter.innerText = products.length;

}
function removeProduct(productId){

    // Your logic for your app.

    // strore products in local storage

    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.productId !== productId );
    localStorage.setItem('products', JSON.stringify(products));
}