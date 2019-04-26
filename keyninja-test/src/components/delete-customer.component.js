import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export default class DeleteCustomer extends Component {

    constructor(props) {
        super(props);

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

    onSubmit(e) {
        e.preventDefault();
           
        axios.delete('http://localhost:4000/customer_records/' + this.props.match.params.id)
            .then(res => console.log(res.data));
        
        this.props.history.push('/'); // Redirect user back main page
        window.location.reload();
    }

    render() {
        return (

            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    Are you sure you want to delete customer?
                </div>
                
                <div className="form-group">
                        <input type="submit" value="Confirm" className="btn btn-primary" />
                    </div>

            </form>
        )
    }

}