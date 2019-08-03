import '@babel/polyfill'
import 'whatwg-fetch'
import appMain from '.\\js\\main.js'
import '.\\css\\normalize.css'
import '.\\css\\style.css'

const app = new Vue(appMain);


if (module.hot) {
	console.log('HMR detected');
	module.hot.accept('.\\js\\main.js', function() {
		console.log('Accepting the updated module!');
	})
}