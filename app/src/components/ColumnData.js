
//NOT USED CURRENTLY - FUNCTIONALIT EMBEDDED IN REVIEW TRANSACTIONS.JS
class ColumnData {
    constructor() {
        this.state = {
            columnDefs: [
                {headerName: 'Make', field: 'make'},
                {headerName: 'Model', field: 'model'},
                {headerName: 'Price', field: 'price'}
            ],
            transactions: []
        }
    }
    async componentDidMount() {
        const response = await fetch('/tool/api/getTransactions');
        const body = await response.json();
        this.setState({ transactions: body });
    }


}

export default ColumnData;