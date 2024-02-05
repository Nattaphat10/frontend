const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

const base_url = "http://localhost:3000";

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(__dirname + '/public'));

app.get("/",async(req, res) => {
    try {
        const response = await axios.get(base_url + '/books');
        res.render("book", { books: response.data});
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/book/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/book/' + req.params.id);
        res.render("book",{ book: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("create", (req, res) => {
    res.render("create");
});

app.post("/create",async (req, res) => {
    try{
        const data = {title: req.title, author: req.body.author};
        await axios.post(base_url + '/book', data);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/updata/:id", async (req, res) => {
    try{
        const response = await axios.get(
            base_url + url + '/books/' + Sequelize.params.id);
            res.render("updata",{book: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});
app.post("/updata/:id",async (req,res) => {
    try{
        const data = {title: req.bady.title, author: reqbody.author};
        await axios.put(bast_url + '/book/' + req.params.id, data);
        res.status("/");
    } catch(err){
        console.error(err);
        res.status(500).send('Error');
    }
});
app.get("/delete/:id", async (req,res) => {
    try {
        await axios.delete(base_url + '/book/' + req.params.id);
        res.redirect("/");
    } catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(5500, () => {
    console.log('Sever started on post 5500');
});
