import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MarkButton from './mark_button';
import configs from '../config';

// Ticket priorities
let getPriorities = (lvl) => {
    switch(lvl) {
        case 'Low':
            return <td className="low-priority">{lvl}</td>;
        case 'Medium':
            return <td className="med-priority">{lvl}</td>;
        case 'High':
            return <td className="high-priority">{lvl}</td>;
        default:
            return <td>{lvl}</td>;
    }
}

// Ticket Component
export default class Ticket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: ''
        }
    }

    componentDidMount = async() => {
        // Get ticket details from API
        const response = await fetch(configs.api_url + "/ticket/" + this.props.ticket._id, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        var data = await response.json()

        // Update the state with ticket details
        this.setState({
            title: data.data.title,
            description: data.data.description,
            projectName: data.data.projectName,
            assignee: data.data.assignee,
            priority: data.data.priority,
            status: data.data.status,
            type: data.data.type
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.ticket.title}</td>
                <td>{this.props.ticket.description}</td>
                <td>{this.props.ticket.projectName}</td>
                <td>{this.props.ticket.assignee}</td>
                { getPriorities(this.props.ticket.priority) }
                <td>{this.props.ticket.status}</td>
                <td>{this.props.ticket.type}</td>
                <td>
                    <Link to={"/edit/"+this.props.user_type + "/" + this.props.ticket._id} className="btn btn-sm btn-info">Edit</Link>
                    <br></br>
                    <button onClick={() => {
                        if(window.confirm('Are you sure you want to delete this ticket?'))
                            this.props.deleteTicket(this.props.ticket._id)
                    }}
                    className="btn btn-sm btn-danger">Delete</button>
                    <br></br>

                    <MarkButton
                        mark={this.props.ticket.status}
                        ticketID={this.props.ticket._id}
                        user_type={this.props.user_type}
                    />
                </td>
            </tr>
        );
    }
}