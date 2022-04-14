import React from 'react';
import configs from '../config';

// Button component - change the ticket from open to resolved and vice versa
export default class MarkButton extends React.Component {
	constructor(props) {
		super(props);

        this.handleClick = this.handleClick.bind(this);

        // Initialize the state variables
		this.state = {
            title: '',
            description: '',
            projectName: '',
            assignee: '',
            priority: '',
            status: '',
            type: '',
            users: [],
            projects: []
        };
	}

	componentDidMount = async() => {
        console.log(this.props);

        // Get ticket detail from API using ticket ID
        var response = await fetch(configs.api_url + "/ticket/" + this.props.ticketID, {
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

        // Get user details from API
        response = await fetch(configs.api_url + "/user/", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        data = await response.json()

        // Update the state variable
        if(data.data.length>0) {
            this.setState({
                users: data.data.map(user => user.name)
            })
        }

        // Get the project details from API
        response = await fetch(configs.api_url + "/project/", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        data = await response.json()

        // Update the state variable
        if(data.data.length>0) {
            this.setState({
                projects: data.data.map(project => project.name)
            })
        }
    }

    /**
     * Change the ticket from open to resolve and vice versa
     * @param e : event
     */
    handleClick = async(e) => {
        e.preventDefault();

        // Change the status of the ticket
        if(this.state.status !== 'Resolved')
            this.state.status = 'Resolved'
        else
            this.state.status = 'Open'

        // Update the ticket detail in API
        const response = await fetch(configs.api_url + "/ticket/update/" + this.props.ticketID, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                projectName: this.state.projectName,
                assignee: this.state.assignee,
                priority: this.state.priority,
                status: this.state.status,
                type: this.state.type
            })
        })
        var data = await response.json()
        console.log(data.data)

        alert('Successfully updated.');
        window.location = window.location.toString()
    }

	render() {
		return(
            this.state.status !== 'Resolved' ?
            <button onClick={this.handleClick}
            className="btn btn-sm btn-success">Mark as Resolved</button> :
            <button onClick={this.handleClick}
            className="btn btn-sm btn-secondary">Mark as Open</button>
		);
	}
}