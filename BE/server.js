// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const multer = require('multer');
const path = require('path');
const { PDFDocument } = require("pdf-lib")
const fs = require('fs');
const cors = require("cors")
const Pdf = require('./model/PdfUploder');
const { readFile, writeFile } = require("fs/promises")
const mongoose = require('mongoose');
require("dotenv").config()
// Multer configuration


app.use(cors())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// File upload endpoint
app.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    const inputFile = path.join(__dirname, 'uploads', req.file.filename);
    const outputFile = path.join(__dirname, 'uploads', 'result.pdf');
    try {
        const { filename, path } = req.file;

        // Create a new Pdf document
        const newPdf = new Pdf({
            filename,
            path
        });

        // Save the Pdf document to the database
        await newPdf.save();
        await createPdf(inputFile, outputFile);
        res.send('File uploaded and processed successfully.');
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).send('Server Error');
    }
});

app.get("/getpdf",async(req,res)=>{
    try {
        //let data=await Pdf.find({})
        let path="/uploads/result.pdf"
        res.send(path)
    } catch (error) {
        res.send(error)
    }
})
app.get("/getallpdf",async(req,res)=>{
    try {
        let data=await Pdf.find({})
        // let path="/uploads/result.pdf"
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

async function createPdf(input, output) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));
        // console.log(pdfDoc)
        let fieldNames = pdfDoc.getForm().getFields();
        fieldNames = fieldNames.map((el) => el.getName());
        console.log(fieldNames);

        const form = pdfDoc.getForm();

        form.getTextField(fieldNames[0]).setText("Aniket Ghormare 123");
        form.getTextField(fieldNames[1]).setText("Nagpur");
         form.getTextField(fieldNames[2]).setText("9340877390");
        form.getTextField(fieldNames[3]).setText("House No 12");
        form.getTextField(fieldNames[4]).setText("aniket@gmail.com");
        // form.getTextField(fieldNames[5]).setText("aniket@gmail.com");
        // form.getTextField(fieldNames[6]).setText("aniket@gmail.com");
        // form.getTextField(fieldNames[7]).setText("aniket@gmail.com");
        const pdfBytes = await pdfDoc.save();
        await writeFile(output, pdfBytes);
        console.log('PDF processed successfully.');
    } catch (error) {
        console.log('Error processing PDF:', error);
        throw error;
    }
}
// async function createPdf(input, output) {
//     try {
//         const pdfDoc = await PDFDocument.load(await readFile(input))
//         // console.log(pdfDoc)
//         let fieldNames=pdfDoc.getForm().getFields()
//         fieldNames=fieldNames.map((el)=>el.getName())
//         console.log(fieldNames)

//         const form=pdfDoc.getForm()

//         form.getTextField(fieldNames[0]).setText("Aniket")

//         const pdfBytes=await pdfDoc.save()
//         await writeFile(output,pdfBytes)
//     } catch (error) {
//         console.log(error)
//     }
// }
// createPdf("uploads/1706614958134-pdf-conversion-services.pdf", "result.pdf")

mongoose.connect(process.env.MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
