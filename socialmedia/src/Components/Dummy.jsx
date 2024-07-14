import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

const DownloadableDivAsImage = () => {
    const divRef = useRef(null);

    const downloadDivAsImage = async () => {
        const element = divRef.current;
        if (!element) {
            console.error('Element not found.');
            return;
        }

        const imgElement = element.querySelector('img');

        // Ensure the image is loaded before creating the canvas
        if (imgElement.complete) {
            createCanvasAndDownload();
        } else {
            imgElement.onload = createCanvasAndDownload;
        }
    };

    const createCanvasAndDownload = () => {
        const element = divRef.current;
        const imgElement = element.querySelector('img');

        const canvas = document.createElement('canvas');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        const context = canvas.getContext('2d');

        context.drawImage(imgElement, 0, 0);

        const link = document.createElement('a');
        link.download = 'div_image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div>
            <div ref={divRef} id="myDiv">
                <img src="https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </div>
            <button onClick={downloadDivAsImage}>Download as Image</button>
        </div>
    );
};

export default DownloadableDivAsImage;
