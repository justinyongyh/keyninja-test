import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AddCustomer from "./components/add-customer.component";
import EditCustomer from "./components/edit-customer.component";
import CustomerList from "./components/customer-list.component";
import DeleteCustomer from "./components/delete-customer.component";
import addUserIcon from "../src/images/add-user-icon.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
 
            <nav className="navbar-brand"><p style={{ color: "#6f14ff", fontWeight: "bold" }}>Keyninja Customer List Test App</p></nav>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Customer List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/add" className="nav-link"><img src={addUserIcon} width="30" /> Add New Customer</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={CustomerList} />
          <Route path="/edit/:id" component={EditCustomer} />
          <Route path="/add" component={AddCustomer} />
          <Route path="/delete" component={DeleteCustomer} />
        </div>
      </Router>
    );
  }
}

export default App;