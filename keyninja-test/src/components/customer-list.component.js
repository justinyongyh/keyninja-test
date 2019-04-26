import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

const Customer = props => (
    <tr>
        <td>{props.customerlist.customer_firstName}</td>
        <td>{props.customerlist.customer_lastName}</td>
        <td>{props.customerlist.customer_email}</td>
        <td>
            <Link to={"/edit/"+props.customerlist._id}>Edit</Link>
            <br></br>
            <Link to={"/delete/"+props.customerlist._id}>Delete</Link>
        </td>
    </tr>
)

export default class CustomerList extends Component {

    constructor(props) {
        super(props);
        this.state = {customerlists: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/customer_records')
            .then(response => {
                this.setState({ customerlists: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    customerList() {
        return this.state.customerlists.map(function(currentCustomer, i){
            return <Customer customerlist={currentCustomer} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.customerList() }
                    </tbody>
                </table>
            </div>
        )
    }
}