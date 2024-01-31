import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PDFDocument } from "pdf-lib";

const Viewpdf = () => {
    const [pdf, setPdf] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getpdf");
            if (response.data.length > 0) {
                // Set the first PDF element from the response data
                setPdf(response.data[response.data.length - 1]);
                console.log(response)
            } else {
                console.log("No PDFs available.");
            }
        } catch (error) {
            console.error("Error fetching PDF data:", error);
        }
    };

    // const createPdf = async (url) => {
    //     try {
    //         const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    //         const pdfDoc = await PDFDocument.load(existingPdfBytes);
    //         const form = pdfDoc.getForm();

    //         const fieldNames = form.getFields().map((field) => field.getName());
    //         console.log("Field names:", fieldNames);

    //         form.getTextField(fieldNames[0]).setText("Aniket");

    //         const pdfBytes = await pdfDoc.save();
    //         // Now you can use the `pdfBytes` to display/download the modified PDF
    //     } catch (error) {
    //         console.error("Error creating PDF:", error);
    //     }
    // }

    const handleClick = async() => {
        // if (pdf) {
        //    await createPdf(`http://localhost:5000/uploads/${pdf.filename}`);
        // }
        try {
            await axios.post("http://localhost:5000/upload",{
                
            }).then((res)=>{
                console.log(res)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {pdf ? (
                <div style={{ width: "100vw", height: "100vh" }}>
                    <iframe title="PDF Viewer" src={`http://localhost:5000/uploads/${pdf.filename}`} style={{ width: "100%", height: "100%" }} />
                </div>
            ) : (
                <p>No PDF available.</p>
            )}
            <button onClick={handleClick} style={{ padding: "15px", backgroundColor: "teal" }}>Submit</button>
        </div>
    );
};

export default Viewpdf;
