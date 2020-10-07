import db from 'models/db.js';
import icon from 'models/icon.js';
import React, { Component } from 'react';
import './Bills.css';

class Bills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Nya räkningar",
            search: "",
            bills: [],
            selectedBill: {},
            newBills: {},
            ocr: "",
            amount: ""
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

    getSelectedBill = (e) => {
        let selectedBill = this.state.bills.find(bill => { return bill.bill_name === e.target.value });

        this.setState({ selectedBill });
    }

    addSelectedBill = () => {
        let newBills = this.state.newBills;
        let selectedBill = this.state.selectedBill;
        let name = selectedBill.bill_name;

        selectedBill["ocr"] = this.state.ocr;
        selectedBill["amount"] = this.state.amount;

        newBills[name] = selectedBill;

        this.setState({ newBills, ocr: "", amount: "", selectedBill: {} });
    }

    removeSelectedBill = (bill) => {
        this.state.newBills.push(this.state.selectedBill);
    }

    updateValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <main>
                <div className="single-column">
                    <div className="column-heading">
                        <h1>{this.state.title}</h1>
                    </div>
                    <section>
                        <select className="form-input" onChange={ this.getSelectedBill } selected="Bredband">
                            <option key={`bill-0`} disabled >Välj räkning</option>
                            {
                                this.state.bills.map((bill, i) => {
                                    return <option key={`bill-${i}`} value={bill.bill_name}>{bill.bill_name}</option>
                                })
                            }
                        </select>
                        {Object.entries(this.state.selectedBill).length > 0 &&
                            <table className="results">
                                <thead>
                                    <tr>
                                        <th width="15%">Namn</th>
                                        <th width="60%">OCR</th>
                                        <th width="15%">Belopp</th>
                                        <th width="10%">Lägg till</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.selectedBill.bill_name}</td>
                                        <td><input className="form-input" type="number" name="ocr" value={ this.state.ocr } placeholder="0123456789" onChange={ this.updateValue }/></td>
                                        <td><input className="form-input" type="number" name="amount" value={this.state.amount } placeholder={`${this.state.selectedBill.average_amount}:-`} onChange={ this.updateValue } /></td>
                                        <td>{icon.get("Add", this.addSelectedBill)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                        
                        {Object.entries(this.state.newBills).length > 0 &&
                            <table className="results">
                                <thead>
                                    <tr>
                                        <th width="15%">Namn</th>
                                        <th width="60%">OCR</th>
                                        <th width="15%">Belopp</th>
                                        <th width="10%">Ta bort</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    Object.keys(this.state.newBills).map((key, i) => {
                                        return (
                                            <tr key={`new-bill-${i}`}>
                                                <td>{ key }</td>
                                                <td>{ this.state.newBills[key].ocr }</td>
                                                <td>{`${this.state.newBills[key].amount}:-`}</td>
                                                <td>{ icon.get("Delete", this.addSelectedBill) }</td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        }
                    </section>
                </div>
            </main>
        );
    }
}

export default Bills;
