class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("products")
            ? JSON.parse(localStorage.getItem("products"))
            : {};
    }
}
function addCart(item) {
  //  console.log(item,i)
    //var products = JSON.parse(localStorage.getItem("products")) || [];
    //var alreadyAdded = products.find(x => x.itemId === bt.dataset.itemId)
    /*if (alreadyAdded){
      console.log(bt.dataset)
      alreadyAdded.itemCount = bt.dataset.itemCount++
      console.log(bt.dataset)

    }
    else {
        addProduct(bt.dataset)
    }
    */

    var li = document.createElement('li');
    li.innerText = item['itemName'];
    li.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');
    var img = document.createElement('img');
    img.src= item['itemImage']; 
    img.style.width = "25%";
    li.appendChild(img)
    var div = document.createElement('div');
    var span = document.createElement('span');
    span.setAttribute('class','badge badge-primary badge-pill');
    span.innerText = item.itemCount;
    div.appendChild(span);
    var trashIt = document.createElement('i');
    trashIt.setAttribute('class','ti-trash');
    trashIt.setAttribute("onclick", "removeProduct(\""+item['itemId']+"\")");
    div.appendChild(trashIt);
    li.appendChild(div);
    cartList.appendChild(li);
};

counter = document.getElementsByClassName("snipcart-items-count")[0];
var cartList = document.getElementById("cartList");
el = document.getElementsByClassName("snipcart-add-item")[0];
el.addEventListener("click", function(){addProduct(this.dataset)}, false);
eq = document.getElementsByClassName("equaring")[0];
eq.addEventListener("click", function(){redirectPay()}, false);

function addProduct(item){
    var products = {};
    if(localStorage.getItem('products')){
        products = Storage.getCart();
    }
    if (item.itemId in products){
        item.itemCount++
    }
    products[item.itemId]=item;
    Storage.saveProducts(products);
    console.log(products)
    renewCart(products)
    counter.innerText = Object.keys('products').length;
}
function renewCart(){
    let products = Storage.getCart();
    while (cartList.firstChild) {
        cartList.firstChild.remove()
    }
    for (const [key, value] of Object.entries(products)) {
        console.log(`${key}: ${value}`);
        addCart(value)
    }
    
}
function removeProduct(id){

    
    var products = Storage.getCart();
    console.log(products[id]["itemCount"])

    if (products[id]["itemCount"] <= 1){
        delete products[id];
    }
    else{
        products[id]["itemCount"]--
        el.dataset.itemCount--
    }
    
    Storage.saveProducts(products);
    /*
    if (number === 0 ) {
        
        localStorage.setItem('products', []);
    } else {
        var storageProducts = JSON.parse(localStorage.getItem('products'));
        console.log(storageProducts[number])
        var products = storageProducts.splice(number,1);//filter(product => product.productId !== productId );
        console.log(products)
        console.log(storageProducts)
        localStorage.setItem('products', JSON.stringify(products));
    }
*/

    renewCart()
}
function redirectPay(){
    let amount = "6000"
    let orderId = "232"
    let url = "https://grad-masterov.ru/sber.php?orderId="+orderId+"&amount="+amount

    window.location.href = url;

}
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };