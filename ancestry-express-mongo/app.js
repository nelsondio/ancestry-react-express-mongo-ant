import express from 'express';
//import fs from 'fs';
import mongoose, { models } from 'mongoose';
import 'dotenv/config';
const { once } = require('node:events');
const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');
import crypto from 'crypto';
import { createWriteStream, fs } from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// *** Db Setup
mongoose.connect('mongodb://localhost/goat-ancestry', //alligator, bee, cat, dove, eel, fox, goat
//mongoose.connect('mongodb://localhost/hawk-ancestry', //alligator, bee, cat, dove, eel, fox, goat
    { useNewUrlParser: true });

const schemaAncestry = new mongoose.Schema({
    hashSeq: String,
    seq: String,
    labelHash: String,
    variant: { type: [] },
    etnia: { type: [] },
    source: String,
    refs: String,
    label: String,
    fecha: { type: Date, default: new Date() }
});
const modelAncestry = mongoose.model("ItemAncestry", schemaAncestry);

//   **** Routes
app.get('/', (request, response) => {
    response.send("<h1>Hello World!!!!</h1>")
});
app.get('/api/v1', (request, response) => {

    modelAncestry.find().limit(100)
        .then(function (itemArray) {
            //console.log(itemArray.fecha)
            response.json(itemArray);
        })
        .catch(function (error) {
            response.send(error);
        })
});
app.get('/api/v1/:id', (request, response) => {
    console.log(request.params.id)
    modelAncestry.findById(request.params.id)
        .then((item) => {
            response.json(item);
        })
        .catch(function (error) {
            response.send(error);
        })
});
app.post('/api/v1', (request, response) => {
    //console.log(request.body)
    modelAncestry.create({
        ...request.body
    })
        .then(function (newItem) {
            response.status(201).json(newItem);
        })
        .catch(function (error) {
            response.send(error);
        });
});


async function processLineByLine() {
    try {
        const rl = createInterface({
            //input: createReadStream('./test'), //Homo_sapiens.GRCh38.cdna.all
            //input: createReadStream('../Homo_sapiens.GRCh38.cdna.all.fa'), //
            output: createWriteStream('./myOutput.out'),
            crlfDelay: Infinity
        });


        let result = "";
        let my = new Map();
        let index = 0;
        let prevLine = ">nothing"
        let buildItem = {
            hashSeq: "", seq: "", labelHash: "", variant: [], etnia: [], source: "", refs: "", label: ""
        }
        rl.on('line', (line) => {

            // Process the line.
            if (line.startsWith('>')) {
                //console.log('>');
                // console.log(result);
                // console.log(crypto.createHash('md5').update(result).digest('hex'));
                let hashSeq = crypto.createHash('md5').update(result).digest('hex');
                let labelHash = crypto.createHash('md5').update(prevLine).digest('hex');
                buildItem.hashSeq = hashSeq;
                buildItem.seq = result;
                buildItem.labelHash = labelHash;
                buildItem.label = prevLine;
                createAncestryRecord(buildItem);
                //console.log(buildItem)
                result = "";
                prevLine = line;
            } else {
                //console.log('.');
                result += line;

            }
        }).on('close', (line) => {
            //console.log(result);
            //console.log(crypto.createHash('md5').update(result).digest('hex'));
            let hashSeq = crypto.createHash('md5').update(result).digest('hex');
            let labelHash = crypto.createHash('md5').update(prevLine).digest('hex');
            buildItem.hashSeq = hashSeq;
            buildItem.seq = result;
            buildItem.labelHash = labelHash;
            buildItem.label = prevLine;
            createAncestryRecord(buildItem);
            //console.log(buildItem)
            result = "";
            prevLine = line; console.log('File processed.');

        })

        //https://stackoverflow.com/questions/36749599/how-to-read-line-by-line-and-detect-eof-end-of-file

        //await once(rl, 'close');

    } catch (err) {
        console.error(err);
    }
};


const createAncestryRecord = async (item) => {
    //console.log(item);
    const newItem =  modelAncestry.create({   // with new it is not a constructor
        ...item                  //witn no new it is not a function
    })
    
}

//processLineByLine();

app.listen(3333, () => console.log(`Listening on port 3333`));

/**
 // *** ssh -N -L 27017:localhost:27017 -i ~/.ssh/web
// stu@ec2-34-216-78-89.us-west-2.compute.amazonaws.com

 db.itemancestries.find({ "fecha":{$gte: new Date('2022-05-15T14:21:40') }}, {_id:0,fecha:1}).length()
25683

 * 
 */
