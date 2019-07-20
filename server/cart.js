let add = (cart, req) => {
    cart.contents.push (req.body)
    return JSON.stringify (cart, null, 4)
}

let remove = (cart, req) => {
    
    console.log("Removing a good: " + req.params.id)

    for (var i = 0; i < cart.contents.length; i++){ 
        
        if (cart.contents[i].id_product == req.params.id){
            if (cart.contents[i].quantity > 1)
                cart.contents[i].quantity--
            else
                cart.contents.splice(i, 1) 
        }        
    }

    return JSON.stringify (cart, null, 4)

}

let change = (cart, req) => {
    let find = cart.contents.find (el => el.id_product === +req.params.id)
    find.quantity += req.body.quantity
    return JSON.stringify (cart, null, 4)
}

let stat = (cart, req, action) => {
 
    log_entry = {
        good_name: "",
        log_action: action,
        time:""
    }

    for (var i = 0; i < cart.contents.length; i++){ 

        if (cart.contents[i].id_product == req.params.id)
            log_entry.good_name = cart.contents[i].product_name

    }

    let today = new Date();
    log_entry.time = today;

    return JSON.stringify (log_entry, null, 4)
}

module.exports = {add, change, remove, stat}
