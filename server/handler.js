const cart = require ('./cart')
const fs = require ('fs')

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove,
}

const statsfile = "stats.json";


let handler = (req, res, action, file) => {

    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0, text: err}))
        } else {

            let newCart = actions [action] (JSON.parse (data), req)
            fs.writeFile (file, newCart, (err) => {
                if (err) {
                    res.sendStatus (404, JSON.stringify ({result: 0, text: err}))
                } else {
                    res.send ({result: 1, text: 'Success'})
                }
            })
            
            let stat = cart.stat(JSON.parse (data), req, action)
            console.log(stat)
        }
    })

    /*fs.readFile (statsfile, 'utf-8', (err, data) => {
        if (err) {
            console.log("Error upon reading of stats file: " + err);
        } else {

            let stat = cart.stat(JSON.parse (data), req, action)
            console.log(stat)

            fs.writeFile (statsfile, stat, (err) => {
                if (err) {
                    console.log("Error upon writing to stats file: " + err);
                } else {
                    console.log("Statistic was written")
                }
            })
        }
    }) */
}

module.exports = handler