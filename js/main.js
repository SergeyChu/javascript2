//ФЭЙК ЭПИ
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';



function makeGETPromRequest(url){
	return new Promise(function (resolve, reject) {
		let xhr;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		  } else if (window.ActiveXObject) { 
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		  }

		xhr.onreadystatechange = function() {
			// Only run if the request is complete
			if (this.readyState !== 4) return;
			
			// Process the response
			if (this.status >= 200 && this.status < 300) {
				// If successful
				resolve(xhr.responseText);
			} else {
				// If failed
				reject(
					console.log("The request was failed with status: " 
						+ this.status + " with the following text: " + this.statusText)
					);
			}
		} 

		xhr.open('GET', url, true);
		xhr.send();
	});

}


/*function makeGETRequest(url, callback) {
	let xhr;

	if (window.XMLHttpRequest) {
	  xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) { 
	  xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.onreadystatechange = function () {
	  if (xhr.readyState === 4) {
		callback(xhr.responseText);
	  }
	}

	xhr.open('GET', url, true);
	xhr.send();
  }*/

//Глобальные сущности 
var userCart = [];

class GoodsList {
	constructor () {
		this.goods = []
	}
	
	fetchGoods (cb) {
		makeGETPromRequest(`${API_URL}/catalogData.json`)
		  .then( (goods) => {
				this.goods = JSON.parse(goods);
				console.log(this.fetchGoodsList())
				this.addProduct({
					id_product: 4,
					price: 66,
					product_name: "Trash"
					})
				console.log(this.fetchGoodsList())
				this.removeProduct(this.goods[1].id_product)
				console.log(this.fetchGoodsList())
				cb ()
			  }
		  )
	}
	addProduct(good){
		this.goods.push ({
			id_product: good.id_product,
			price: good.price,
			product_name: good.product_name,
		});
	}
	removeProduct(id){
		for( var i = 0; i < this.goods.length; i++){ 
			if ( this.goods[i].id_product == id) {
				this.goods.splice(i, 1);
				return 
			}
		 }
	}
	fetchGoodsList(){
		let result = []

		for( var i = 0; i < this.goods.length; i++)
			result.push(this.goods[i].product_name)

		return result
	}
	render () {
		const block = document.querySelector ('.products')
		this.goods.forEach (product => {
			const prod = new Product (product)
			block.insertAdjacentHTML ('beforeend', prod.render ())
		})
	}
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render()
})


class Product {
	constructor (product) {
		this.id = product.id_product
		this.title = product.product_name
		this.price = product.price
		this.img = image
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
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
	}
}
