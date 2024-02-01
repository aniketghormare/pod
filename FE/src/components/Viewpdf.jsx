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
            const response = await axios.get("http://localhost:5000/getallpdf");
            if (response.data.length > 0) {
                setPdf(response.data[response.data.length - 1]);
            } else {
                console.log("No PDFs available.");
            }
        } catch (error) {
            console.error("Error fetching PDF data:", error);
        }
    };

    const handleLoad = async (e) => {
        console.log("PDF loaded successfully");
        // You can add more functionality here if needed
    }

    return (
        <div>
            {pdf ? (
                <div style={{ width: "100vw", height: "100vh" }}>
                    <iframe title="PDF Viewer" src={`http://localhost:5000/uploads/${pdf.filename}`} style={{ width: "100%", height: "100%" }} onChange={(e) => handleLoad(e)} />
                </div>
            ) : (
                <p>No PDF available.</p>
            )}
        </div>
    );
};

export default Viewpdf;
