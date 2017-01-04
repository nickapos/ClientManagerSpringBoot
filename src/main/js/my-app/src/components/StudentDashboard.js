import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Link } from 'react-router';
// import logo from '../logo.svg';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import ExportUsers from './ExportUsers';
import ImportUsers from './ImportUsers';
import UpdateUsers from './UpdateUsers';
import GetAllUsers from './GetAllUsers';
import '../css/App.css';
// import './toggler.css';
// import Toggle from 'react-toggle';
// react select

// import Advertiser from './Advertiser';

class StudentDashboard extends Component {

    handleChange(event, myprops) {
        // do something with event.target.checked
        console.log("hey from handlechange ", event);
        if (event.data) {
            event.toggleState(event);
        }
        console.log("changed state succesfully");
    };

  cancelFunction(){
    console.log("hey form cancel function");
    //redirect to main dashboard page
    window.parent.location.href= "/";
   }
  render () {
    return (
      <div className="App" id="content">
          <h2>Καλωσήρθατε στην διαχείριση πελατών του Ferrum Gym </h2>
          <div className="labelContainer">
{/*          <div className="container">*/}
          <legend><span>Παρακαλώ δημιουργήστε τα τμήματα σας </span><Link className="back" to="/"> Πίσω </Link></legend>
          <div className="row">
                <div className="col-md-6">
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                           
                        </div>
                    </div>
                </div>
          </div>
{/*        </div>*/}
        </div>
      </div>

    );
  }
}

export default connect(state => state, actions)(StudentDashboard);