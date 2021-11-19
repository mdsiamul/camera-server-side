const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { response } = require('express');
const port = process.env.PORT || 5000

app.use(cors());
// app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.42cjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {

        await client.connect();
        const appdatabase = client.db('camera_shop');
        const appCollection = appdatabase.collection('appoint');

        app.get('/appoint', async (req, res) => {
            const cursor = appCollection.find({});
            const appoint = await cursor.toArray();
            res.send(appoint);

        })
        const prodatabase = client.db('camera_product');
        const proCollection = prodatabase.collection('product');

        app.get('/product', async (req, res) => {
            const cursor = proCollection.find({});
            const product = await cursor.toArray();
            res.send(product);

        })
    }
    finally {

        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(` listening at ${port}`)
})