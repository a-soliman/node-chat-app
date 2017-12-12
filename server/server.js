const path		= require('path');
const express	= require('express');


const publicPath = path.join(__dirname,'../public');
const app = express();
app.use(express.static(publicPath))

app.get('/', ( req, res ) => {
	res.send('working');
});


app.listen(3000, () => {
	console.log('Server is working on port 3000')
})




