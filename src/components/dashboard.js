import React, { Component } from 'react';
import Cookies from 'js-cookie';
import TicketList from "./ticket_list";

// Dashboard component
export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_type : ""
        }
    }

    componentDidMount = () => {
		const windowUrl = window.location;
        this.setState({user_type : windowUrl.toString().split('/').pop().replace("?", "").replace("#", "")});
	}

    render() {
        if(Cookies.get('session_id')) {
        return(
            <div className="wrapper">
            <TicketList user_type={this.state.user_type}/>
            </div>
        );
        }
        else{
            window.location = "/"
        }
    }
}