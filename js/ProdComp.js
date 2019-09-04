const product = {
    props: ['img', 'product'],
    template: `<div class="product-item">
                        <img :src="img" alt="Some img">
                        <div class="desc">
                            <h3>{{ product.product_name }}</h3>
                            <p>{{ product.price }} $</p>
                            <button class="buy-btn">Купить</button>
                        </div>
                    </div>`
}

const products = {
    components: {product},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            filtered: []
        }
    },
    mounted () {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
                console.log (this.filtered)
            });
    },
    methods: {
        filter() {
            
            searchVal = this.$root.$refs.userSearch.value

            console.log("Filter from child was called: " + searchVal);
            
            this.filtered = [];

            for (let prod of this.products){

                if (prod.product_name.includes(searchVal) || searchVal == "")
                    this.filtered.push(prod)
            }
            
            console.log(this.filtered);
        }
    },
    template: `
    <div class="products">
        <product 
        v-for="product of filtered" 
        :key="product.id_product"
        :img="imgCatalog"
        :product="product"></product>
    </div>
    `
}