import React, { Component } from 'react';
import db from 'models/db.js';
import './Bills.css';

class Bills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Nya räkningar",
            search: "",
            bills: [],
            newBill: []
        };
    }

    componentDidMount() {
        this.getBills();
    }

    getBills = () => {
        let res = db.fetchAll("bill");

        res.then(bills => {
            console.log(bills);
            this.setState({ bills })
        });
    }

    loadBill = () => {
        let res = db.fetchWhere("bill", "name", this.state.search);

        res.then(data => {
            this.state.newBill.push(data);
        });
    }

    render() {
        return (
            <main>
                <div className="single-column">
                    <div className="column-heading">
                        <h1>{this.state.title}</h1>
                    </div>
                    <section>
                        <label className="form-label">Sök räkning
                            <input className="form-input" type="text" name="name" required placeholder="Räkningens namn" />
                        </label>
                        <table className="results">
                            <thead>
                                <tr>
                                    <th>Namn</th>
                                    <th>OCR</th>
                                    <th>Belopp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="results">
                            <thead>
                                <tr>
                                    <th>Namn</th>
                                    <th>Företag</th>
                                    <th>OCR</th>
                                    <th>Belopp</th>
                                    <th>Kategori</th>
                                    <th>Frekvens</th>
                                    <th>Kommentar</th>
                                    <th>Betalt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
            </main>
        );
    }
}

export default Bills;
