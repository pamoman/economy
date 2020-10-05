import React, { Component } from 'react';
import Tesseract from 'tesseract.js';
import './OCR.css';

class OCR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Start",
            uploads: [],
            patterns: [],
            documents: []
        };
    }

    handleChange = (event) => {
        if (event.target.files[0]) {
            var uploads = []
            for (var key in event.target.files) {
                if (!event.target.files.hasOwnProperty(key)) continue;
                let upload = event.target.files[key]
                uploads.push(URL.createObjectURL(upload))
            }
            this.setState({
                uploads: uploads
            })
        } else {
            this.setState({
                uploads: []
            })
        }
    }

    generateText = () => {
        let uploads = this.state.uploads

        for (var i = 0; i < uploads.length; i++) {
            Tesseract.recognize(uploads[i], 'swe', { logger: m => console.log(m) })
                .catch(err => {
                    console.error(err)
                })
                .then(result => {
                    let data = result.data;
                    console.log(data);

                    // Get Confidence score
                    let confidence = data.confidence

                    // Get full output
                    let text = data.text

                    // Get codes
                    let pattern = /\b\w{10,10}\b/g
                    let patterns = data.text.match(pattern);

                    // Update state
                    this.setState({
                        patterns: this.state.patterns.concat(patterns),
                        documents: this.state.documents.concat({
                            pattern: patterns,
                            text: text,
                            confidence: confidence
                        })
                    })
                })
        }
    }

    render() {
        return (
            <div className="app">
                <header className="header">
                    <h1>My OCR App</h1>
                </header>

                { /* File uploader */}
                <section className="hero">
                    <label className="fileUploaderContainer">
                        Click here to upload documents
                        <input type="file" id="fileUploader" onChange={this.handleChange} multiple />
                    </label>

                    <div>
                        {this.state.uploads.map((value, index) => {
                            return <img key={index} src={value} width="100px" alt="upload"/>
                        })}
                    </div>

                    <button onClick={this.generateText} className="button">Generate</button>
                </section>

                { /* Results */}
                <section className="results">
                    {this.state.documents.map((value, index) => {
                        return (
                            <div key={index} className="results__result">
                                <div className="results__result__info">
                                    <div className="results__result__info__codes">
                                        <small><strong>Confidence Score:</strong> {value.confidence}</small>
                                    </div>
                                    <div className="results__result__info__codes">
                                        <small><strong>Pattern Output:</strong> {value.pattern.map((pattern) => { return pattern + ', ' })}</small>
                                    </div>
                                    <div className="results__result__info__text">
                                        <small><strong>Full Output:</strong> {value.text}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>
        );
    }
}

export default OCR;
