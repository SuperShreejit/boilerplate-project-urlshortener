require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')

const {
  getHome,
  getShortUrl,
  postShortUrl,
  removeUrl
} = require('./controller')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/public', express.static(`${process.cwd()}/public`));
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', getHome);
app.post('/api/shorturl',postShortUrl)
app.get('/api/shorturl/:shortUrl',getShortUrl)
app.delete('api/shorturl/:urlId', removeUrl)

const port = process.env.PORT || 3000;
const start = async () => {
  try{
    const db = await mongoose.connect(process.env.MONGO_URI)
    if(db) console.log('mongoDb connected!')
    app.listen(port, () => console.log(`Listening on port ${port}`));    
  }
  catch(error) {
    console.error(error)
  }
}
start()