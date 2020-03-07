import React from "react";
import TransactionService from "../rest/TransactionService";
import Grid from "@material-ui/core/Grid";
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Cost', field: 'cost'},
    {headerName: 'Description', field: 'description'},
    {headerName: 'Category', field: 'category'}
];


class ReviewTransaction extends React.Component {


    constructor(props) {
        super();
        this.state = {
            transactions: [],

        }
    }

    async componentDidMount() {
        const response = await fetch('/tool/api/getTransactions');
        const body = await response.json();
        this.setState({transactions: body});
    }


    render() {
        return (
            <div className="transactins-review">
                <h2>Review Transactions</h2>
                <div className="ag-theme-balham" style={{height: '200px', width: '800px'}}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={this.state.transactions}>
                    </AgGridReact>
                </div>

            </div>

        );
    }


}

export default ReviewTransaction;