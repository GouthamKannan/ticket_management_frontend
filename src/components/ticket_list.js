import React, { Component } from 'react';
import Ticket from './ticket_display';
import configs from '../config';

// Ticket List Component
export default class TicketList extends Component {
	constructor(props) {
		super(props);

		this.deleteTicket = this.deleteTicket.bind(this);
        // Initialize the state variable
		this.state = { tickets: [] };
	}

    componentDidMount = async() => {
        // Get the ticket details using API
        const response = await fetch(configs.api_url + "/ticket/", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        var data = await response.json()
        this.setState({ tickets: data.data })
    }

    deleteTicket = async(id) => {
        // Delete ticket using API
        const response = await fetch(configs.api_url + "/ticket/" + id, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        var data = await response.json()
        console.log(data.data)

	    // update tickets array to all tickets without matching id
	    this.setState({
	        tickets: this.state.tickets.filter(el => el._id !== id)
	    })
	}

    // Get Tickets with open status
	getOpenList() {
        return this.state.tickets.map(currentTicket => {
            if(currentTicket.status !== 'Resolved')
                return <Ticket
            			ticket={currentTicket}
            			deleteTicket={this.deleteTicket}
                        key={currentTicket._id}
                        user_type={this.props.user_type}
                        />;
            else
                return <></>
        })
	}

    // Get Tickets with resolved status
    getResolvedList() {
        return this.state.tickets.map(currentTicket => {
            if(currentTicket.status === 'Resolved')
                return <Ticket
                        ticket={currentTicket}
                        deleteTicket={this.deleteTicket}
                        key={currentTicket._id}
                        />;
            else
                return <></>
        })
    }

	render() {
		return(
			<div>
                <br></br>
				<h3>Open Tickets</h3>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Project</th>
                            <th>Assigned To</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.getOpenList() }
                        </tbody>
                    </table>
                <br></br>
                <h3>Resolved Tickets</h3>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Project</th>
                            <th>Assigned To</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.getResolvedList() }
                        </tbody>
                    </table>
			</div>
		);
	}
}