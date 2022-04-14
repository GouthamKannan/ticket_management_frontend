import React, { Component } from 'react';
import configs from '../config';
import Cookies from 'js-cookie';


// User Approval Component
export default class UserApproval extends Component {
	constructor(props) {
		super(props);

		// this.deleteTicket = this.deleteTicket.bind(this);
        // Initialize the state variable
		this.state = { users: [] };
	}

    componentDidMount = async() => {
        // Get the ticket details using API
        const response = await fetch(configs.api_url + "/user/", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        var data = await response.json()

        console.log(data)
        if(data.success===true) {
            this.setState({ users: data.data.filter(user => user.admin_ver===false) })
        }
        else {
            alert("cannot get user details")
        }

    }

    // Approve user created
    approveRequest = async(id) => {
        console.log(id)
        var response = await fetch(configs.api_url + "/user/approve", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id : id
            })
        })
        var data = await response.json()

        if(data.success===true) {
            this.setState({ users: data.data.filter(user => user.admin_ver===false) })
        }
        else {
            alert(data.data)
        }
    }

    // Delete the user
    deleteRequest = async(id) => {
        var response = await fetch(configs.api_url + "/user/delete", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id : id
            })
        })
        var data = await response.json()

        if(data.success===true) {
            this.setState({ users: data.data.filter(user => user.admin_ver===false)})
        }
        else {
            alert(data.data)
        }
    }

    // Get Tickets with open status
	getUserList() {
        console.log(this.state.users)

        var rows = []
        for (var i=0; i<this.state.users.length; i++) {
            console.log(this.state.users[i]._id)
            var id = this.state.users[i]._id
            rows.push(
                <tr>
                    <td>{this.state.users[i].user_name}</td>
                    <td>{this.state.users[i].email}</td>
                    <td>{this.state.users[i].role}</td>
                    <td>
                        <button onClick={() => this.approveRequest(id)} className="btn btn-info">approve</button>
                        <button onClick={() => this.deleteRequest(id)} className="btn btn-danger">delete</button>
                    </td>
                </tr>
            )
        }

        return rows
	}

	render() {
        if(Cookies.get('session_id')) {

		return(
			<div className="wrapper">
                <br></br>
				<h3>Admin users approval</h3>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>User Name</th>
                            <th>Email ID</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.getUserList() }
                        </tbody>
                    </table>
			</div>
		);
        }
        else{
            window.location = "/"
        }
	}
}