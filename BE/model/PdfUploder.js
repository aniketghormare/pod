// models/pdfModel.js

const mongoose = require('mongoose');

// Define the schema for PDF documents
const pdfSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model using the schema
const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;
