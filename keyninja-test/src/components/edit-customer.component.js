import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export default class EditCustomer extends Component {

    constructor(props) {
        super(props);

        this.onChangeCustomerFirstName = this.onChangeCustomerFirstName.bind(this);
        this.onChangeCustomerLastName = this.onChangeCustomerLastName.bind(this);
        this.onChangeCustomerEmail = this.onChangeCustomerEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            customer_firstName: '',
            customer_lastName: '',
            custoner_email: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/customer_records/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    customer_firstName: response.data.customer_firstName,
                    customer_lastName: response.data.customer_lastName,
                    customer_email: response.data.customer_email
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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
    
        const obj = {
            customer_firstName: this.state.customer_firstName,
            customer_lastName: this.state.customer_lastName,
            customer_email: this.state.customer_email
        };
        console.log(obj);
        
        axios.post('http://localhost:4000/customer_records/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/'); // Redirect user back main page
        window.location.reload();
    }

    render() {
        return (

            <div style={{marginTop: 10}}>
                <h3>Edit Customer</h3>
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
                        <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}