import React from 'react';

// TODO: Expose save/load functionality to a "store"

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: [{
                canvasImg: new Image(),
            }],
            currentPage: 0,
        };
    }

    componentDidMount() {
        var canvas = document.getElementById('drawpass-canvas'),
            canvasContext = canvas.getContext('2d');

        this.canvasContext = canvasContext;
        this.canvas = canvas;
        this.isPenDown = false;
    }

    startPath() {
        this.canvasContext.beginPath();
        this.isPenDown = true;
    }

    relativeMousePos(e) {
        let rect = this.canvas.getBoundingClientRect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    drawPath(e) {
        if (this.isPenDown) {
            let mousePos = this.relativeMousePos(e);

            this.canvasContext.lineTo(mousePos.x, mousePos.y);
            this.canvasContext.stroke();
        }
    }

    endPath() {
        this.isPenDown = false;
    }

    saveCanvas() {
        const pagesCopy = JSON.parse(JSON.stringify(this.state.pages));
        const canvas = this.canvas.toDataURL();

        this.cloneHTML(pagesCopy);

        pagesCopy[this.state.currentPage].canvasImg = canvas;

        const savePromise = new Promise((resolve) => {
            this.setState({
                pages: pagesCopy
            }, () => {
                resolve();
            });
        });

        return savePromise;
    }

    loadCanvas(page) {
        const canvasImage = this.state.pages[page].canvasImg;
        let img = new Image();
        img.src = canvasImage;

        this.canvasContext.drawImage(img, 0, 0);
    }

    clearCanvas() {
        this.canvasContext.clearRect(0, 0, this.canvas.height, this.canvas.width);
    }

    render() {
        let pageNumber = this.state.currentPage + 1;

        return (
            <div>
                <h2>{pageNumber}</h2>
                <canvas
                    onMouseDown={() => this.startPath()}
                    onMouseMove={(e) => this.drawPath(e)}
                    onMouseUp={() => this.endPath()}
                    width="600"
                    height="600"
                    id="drawpass-canvas"
                ></canvas>

                <button
                    onClick={() => this.saveCanvas()}
                >save</button>

                <button
                    onClick={() => this.clearCanvas()}
                >clear</button>
            </div>
        );
    }
}

export default Canvas;