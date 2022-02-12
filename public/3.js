function addCart(item,i) {
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

    var span = document.createElement('span');
    span.setAttribute('class','badge badge-primary badge-pill');
    var li = document.createElement('li');
    li.innerText = item['itemName']+i;
    li.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');
    li.appendChild(span);
    var trashIt = document.createElement('i');
    trashIt.setAttribute('class','ti-trash');
    trashIt.setAttribute('id','i'+i);
    trashIt.setAttribute("onclick", "removeProduct("+i+")");
    li.appendChild(trashIt);


    cartList.appendChild(li);

};

counter = document.getElementsByClassName("snipcart-items-count")[0];
var cartList = document.getElementById("cartList");
el = document.getElementsByClassName("snipcart-add-item")[0];
el.addEventListener("click", function(){addProduct(this.dataset)}, false);

function addProduct(item){
    var products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
        //var unicProducts = products.filter((v,i,a)=>a.findIndex(t=>(t.itemId === v.itemId))===i)

 
    }
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    console.log(products)
    renewCart(products)
    counter.innerText = products.length;
}
function renewCart(products){
    while (cartList.firstChild) {
        cartList.firstChild.remove()
    }
    for (var index = 1; index < products.length; index++){
        addCart(products[index],index)
    }
}
function removeProduct(number){
    console.log("remove "+number)
    var products = JSON.parse(localStorage.getItem("products"));
    var indexToRemove = number;
    products.slice(indexToRemove, 1);
    console.log(products.length)
   localStorage.setItem('products', JSON.stringify(products));
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

    renewCart(products)
}