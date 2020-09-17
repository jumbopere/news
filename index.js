const express = require('express');
const bodyParser = require('body-parser');
const {articles} = require('./articles')
const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res)=> {
   res.json({
    message: 'Welcome home'
})
})

app.get('/api/articles', (req, res)=> {
    res.json(articles)
    
})

app.get(`/api/articles/:id`, (req,res)=> {
    const articleId = Number(req.params.id)
    const article = articles.find((article)=> article.id === articleId)
    if(!article){
        res.status(400).json({
            error: 'Article not found'
        })
    }
    res.json(article)
})

app.post('/api/articles', (req, res)=> {
    const { id, article, author, } = req.body;
    if((id == '' || id == undefined) || (article == '' || article == undefined) || (author == '' || author == undefined)) {
        return res.status(400).json({
            message: 'field can\'t be empty' 
        })
    }
    
    
    const incomingArticle = req.body
articles.push(incomingArticle)
res.json(articles)
})

app.delete('/api/articles/:id', (req, res)=> {
    const articleId = Number(req.params.id)
    const newArticles = articles.filter((article)=> article.id != articleId)
    if(!newArticles){
        res.status(400).send(`Article not found`)
} articles = newArticles
res.send(articles)}
)

app.put('/api/articles/:id', (req, res)=> { 
    const articlesId = Number(req.params.id)
    const body = req.body
    const article = articles.find((article)=> articles.id === articlesId)
    const index = articles.indexOf(articles)
    if(!article){
        res.status(500).send(`Article not found`)
} const updateArticle = {...article, ...body}
articles[index] = updateArticle
res.send(updateArticle)}
)


app.listen(PORT, (err)=> {
    if (err) {
        console.log('An error occured')
    }
    console.log(`Server is running on port ${PORT}`)
})