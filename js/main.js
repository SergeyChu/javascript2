//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

function fetchData () {
	let arr = [];
	for (let i = 0; i < items.length; i++) {
		arr.push ({
			title: items[i],
			price: prices[i],
			img: image,
			id: i+1,
		});
	}
	return arr
}

//Глобальные сущности 
var userCart = [];


class ProductList {
	constructor () {
		this.products = []
		this._init ()
	}
	_init () {
		this.fetchProducts ()
		this.render ()
	}
	fetchProducts () {
		this.products = fetchData ()
	}
	addProduct(product){
		this.products.push ({
			title: product.title,
			price: product.price,
			img: product.image,
			id: product.id,
		});
	}
	removeProduct(id){
		for( var i = 0; i < this.products.length; i++){ 
			if ( this.products[i].id == id) {
				this.products.splice(i, 1); 
			}
		 }
	}
	getAllGoodsCount(){
		let summ = 0;
		for( var i = 0; i < this.products.length; i++){ 
			summ += this.products[i].price
		}

		return summ;
	}
	//Just for test
	printGoodNames(){
		for( var i = 0; i < this.products.length; i++){
			console.log(i + " " + this.products[i].title)
		}
	}
	render () {
		const block = document.querySelector ('.products')
		this.products.forEach (product => {
			const prod = new Product (product)
			block.insertAdjacentHTML ('beforeend', prod.render ())
		})
	}
}

class Product {
	constructor (product) {
		this.title = product.title
		this.price = product.prices
		this.img = product.img
		this.id = product.id
	}
	render () {
		return `<div class="product-item">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.title}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-name="${this.title}"
                            data-image="${this.img}"
							data-price="${this.price}"
							data-id="${this.id}">Купить</button>
                        </div>
                    </div>`
	}
}



let productList = new ProductList ();
console.log("Summ of all the goods: " + productList.getAllGoodsCount())
console.log(productList.printGoodNames())


id = 3
console.log("Removing the product with id: " + id)
productList.removeProduct(id)
console.log(productList.printGoodNames())
console.log("Summ of all the goods: " + productList.getAllGoodsCount())


testProd = {
	title: "My trashy product",
	price: 666,
	img: 'https://placehold.it/200x150',
	id: 9,
}
console.log("Adding a product")
productList.addProduct(testProd)
console.log(productList.printGoodNames())
console.log("Summ of all the goods: " + productList.getAllGoodsCount())


// document.querySelector ('.btn-cart').addEventListener ('click', () => {
// 	document.querySelector ('.cart-block').classList.toggle ('invisible')
// })

// document.querySelector ('.products').addEventListener ('click', (evt) => {
// 	if (evt.target.classList.contains ('buy-btn')) {
// 		addProduct (evt.target);
// 	}
// })

// document.querySelector ('.cart-block').addEventListener ('click', (evt) => {
// 	if (evt.target.classList.contains ('del-btn')) {
// 		removeProduct (evt.target);
// 	}
// })




// function renderProducts () {
// 	let arr = [];
// 	for (item of list) {
// 		arr.push (item.createTemplate ())
// 	}
// 	document.querySelector ('.products').innerHTML = arr.join ();
// }

// renderProducts ();


// //CART
// function addProduct (product) {
// 	let productId = +product.dataset['id'];
// 	let find = userCart.find (element => element.id === productId)
// 	//либо find = userCart [?] (obj) || false

// 	if (!find) {
// 		userCart.push ({
// 			name: product.dataset['name'],
// 			id: productId,
// 			img: cartImage,
// 			price: +product.dataset['price'],
// 			quantity: 1
// 		})
// 	} else {
// 		find.quantity++
// 	}
// 	renderCart ();
// }	

// function removeProduct (product) {
// 	let productId = +product.dataset['id'];
// 	let find = userCart.find (element => element.id === productId)
// 	//либо find = userCart [?] (obj) || false

// 	if (find.quantity > 1) {
// 		find.quantity--
// 	} else {
// 		userCart.splice (userCart.indexOf(find), 1);
// 		document.querySelector (`.cart-item[data-id="${productId}"]`).remove ()
// 	}
// 	renderCart ();
// }

// function renderCart () {
// 	let allProducts = '';
// 	for (item of userCart) {
// 		allProducts += `<div class="cart-item" data-id="${item.id}">
//                             <div class="product-bio">
//                                 <img src="${item.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${item.name}</p>
//                                     <p class="product-quantity">Quantity: ${item.quantity}</p>
//                                     <p class="product-single-price">$${item.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${item.quantity * item.price}</p>
//                                 <button class="del-btn" data-id="${item.id}">&times;</button>
//                             </div>
//                         </div>`
// 	}
// 	document.querySelector ('.cart-block').innerHTML = allProducts;
// }

