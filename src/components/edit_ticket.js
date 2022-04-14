import React, { Component } from 'react';
import Cookies from 'js-cookie';

import configs from '../config';

// Global variables
const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Open', 'In Progress', 'Resolved'];
const types = ['Bug/Error', 'Feature Request', 'Security', 'Other'];

// Edit Ticket component
export default class EditTicket extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Initalize the state variables
        this.state = {
      		title: '',
  		    description: '',
  		    projectName: '',
            assignee: '',
  		    priority: '',
  		    status: '',
  		    type: '',
          users: [],
          projects: [],
          ticket_id : ""
        };
    }

    componentDidMount = async() => {

        const windowUrl = window.location;
        await this.setState({ticket_id : windowUrl.toString().split('/').pop().replace("?", "").replace("#", "")});
        if(windowUrl.toString().substring("admin") !== -1)
            this.setState({user_type:"admin"})
        else
            this.setState({user_type:"user"})

        console.log(this.state.ticket_id)
        // Get ticket details from database
        var response = await fetch(configs.api_url + "/ticket/" + this.state.ticket_id, {
            method : "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })

        var data = await response.json()
        console.log(data)

        // Update the state variable
        this.setState({
            title: data.data.title,
            description: data.data.description,
            projectName: data.data.projectName,
            assignee: data.data.assignee,
            priority: data.data.priority,
            status: data.data.status,
            type: data.data.type
        })

        // Get user details from database
        response = await fetch(configs.api_url + "/user/", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        data = await response.json()

        // Update the state variable
        if(data.data.length > 0) {
            this.setState({
                users: data.data.map(user => user.user_name)
            })
        }

        // Get project details from database
        response = await fetch(configs.api_url + "/project/", {
            method : "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        data = await response.json()

        // Update the state variable
        if(data.data.length > 0) {
            this.setState({
                projects: data.data.map(project => project.name)
            })
        }
    }

    // Handle change in input and store in state
    handleChange = ({ target: { name, value } }) => {
        this.setState({ ...this.state, [name]: value });
      };

    /**
     * Handling edit ticket button click
     * @param e : event
     */
    onSubmit = async(e) => {
    	e.preventDefault();

        // Update the ticket using the API
        const response = await fetch(configs.api_url + "/ticket/update/" + this.state.ticket_id, {
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
        window.location = "/dashboard/" + this.state.user_type
    }

	render() {
        if(Cookies.get('session_id')) {
		return(
			<div className="wrapper">
				<h3>Edit Ticket</h3>
				<form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.title}
                               name="title"
                               onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               name="description"
                               value={this.state.description}
                               onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Project: </label>
                        <select required
                              className="form-control"
                              value={this.state.projectName}
                              name="projectName"
                              onChange={this.handleChange}>
                              {
                                this.state.projects.map((project) => {
                                return <option key={project}
                                               value={project}>{project}
                                       </option>;
                                })
                              }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Assignee: </label>
                        <select required
                              className="form-control"
                              name="assignee"
                              value={this.state.assignee}
                              onChange={this.handleChange}>
                              {
                                this.state.users.map((user) => {
                                return <option key={user}
                                               value={user}>{user}
                                       </option>;
                                })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Priority: </label>
                        <select required
                              className="form-control"
                              value={this.state.priority}
                              name="priority"
                              onChange={this.handleChange}>
                              {
                                  priorities.map((priority) => {
                                  return <option key={priority}
                                                 value={priority}>{priority}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <select required
                              className="form-control"
                              name="status"
                              value={this.state.status}
                              onChange={this.handleChange}>
                              {
                                  statuses.map((status) => {
                                  return <option key={status}
                                                 value={status}>{status}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select required
                              className="form-control"
                              value={this.state.type}
                              name="type"
                              onChange={this.handleChange}>
                              {
                                  types.map((type) => {
                                  return <option key={type}
                                                 value={type}>{type}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
					<div className="form-group">
                        <input type="submit" value="Update Ticket" className="btn btn-primary" />
                    </div>
				</form>
			</div>
		);
        }
        else{
            window.location = "/"
        }
	}
}