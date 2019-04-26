import React, { Component } from 'react';
import axios from 'axios';

export default class AddCustomer extends Component {

    constructor(props) {
        super(props);

        this.onChangeCustomerFirstName = this.onChangeCustomerFirstName.bind(this);
        this.onChangeCustomerLastName = this.onChangeCustomerLastName.bind(this);
        this.onChangeCustomerEmail = this.onChangeCustomerEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            customer_firstName: '',
            customer_lastName: '',
            customer_email: '',
        }

    }

    onChangeCustomerFirstName(e) {
        this.setState({
            customer_firstName: e.target.value
        });
    }

    onChangeCustomerLastName(e) {
        this.setState({
            customer_lastName: e.target.value
        });
    }

    onChangeCustomerEmail(e) {
        this.setState({
            customer_email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Customer First Name: ${this.state.customer_firstName}`);
        console.log(`Customer Last Name: ${this.state.customer_lastName}`);
        console.log(`Customer Email: ${this.state.customer_email}`);

        const newCustomer = {
            customer_firstName: this.state.customer_firstName,
            customer_lastName: this.state.customer_lastName,
            customer_email: this.state.customer_email
        };

        axios.post('http://localhost:4000/customer_records/add', newCustomer)
            .then(res => console.log(res.data));
        
        this.setState({
            customer_firstName: '',
            customer_lastName: '',
            customer_email: ''
        })

        this.props.history.push('/'); // Redirect user back main page
        window.location.reload();
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Customer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>First Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.customer_firstName}
                                onChange={this.onChangeCustomerFirstName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.customer_lastName}
                                onChange={this.onChangeCustomerLastName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.customer_email}
                                onChange={this.onChangeCustomerEmail}
                                />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}