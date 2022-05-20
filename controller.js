const ShortUrl = require('./model')

const getHome = async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find().exec()
    res.render('index', { shortUrls })
  } catch (error) {
    console.error(error)
  }
}

const getShortUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl
  try {
    console.log(shortUrl)
    if (!checkShortUrl(shortUrl)) return res.status(400).json({ "error": "Wrong format" })
    const url = await ShortUrl.findOne({ shortUrl }).exec()
    if (!url) return res.status(404).json({ "error": "No short URL found for the given input" })

    res.redirect(url.fullUrl)

  } catch (error) {
    console.error(error)
  }
}

const postShortUrl = async (req, res) => {
  const fullUrl = req.body.url
  try {
    if (!checkUrl(fullUrl)) return res.json({ error: 'invalid url' })

    const allurls = await ShortUrl.find().exec()
    const newShortUrl = {
      fullUrl,
      short: allurls.length + 1,
      name: getUrlName(fullUrl)
    }

    const newshort = await ShortUrl.create(newShortUrl)
    if (newshort) res.json({ original_url: newshort.fullUrl, short_url: newshort.short })

  } catch (error) {
    console.error(error)
  }
}

const removeUrl = async (req, res) => {
  const urlId = req.params.id
  try {
    const url = await ShortUrl.findById(urlId)
    if (!url) res.redirect('/')

    await ShortUrl.findByIdAndDelete(urlId)
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
}

const checkShortUrl = (url) => (url.match(/\d/))
const checkUrl = (url) => (url.match(/^http|^https/))
const getUrlName = (url) => url.split('/')[2]

module.exports = {
  getHome,
  getShortUrl,
  postShortUrl,
  removeUrl
}