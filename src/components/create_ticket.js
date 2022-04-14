import React, { Component } from 'react';
import configs from '../config';
import Cookies from 'js-cookie';


// Global variables
const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Open', 'In Progress', 'Resolved'];
const types = ['Bug/Error', 'Feature Request', 'Security', 'Other'];

// Create ticket component
export default class CreateTicket extends Component {
	constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Initialize state
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
          user_type: ""
        };
    }


    componentDidMount = async() => {
      // set default values for state properties
      const windowUrl = window.location;
      this.setState({user_type : windowUrl.toString().split('/').pop().replace("?", "").replace("#", "")});

      this.setState({
        priority: priorities[0],
        status: statuses[0],
        type: types[0]
      });

      // Get user details from the API
      var response = await fetch(configs.api_url + "/user/", {
          method : "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
      })
      var data = await response.json()

      console.log(data)


      // Update the state
      if(data.data.length > 0) {
          this.setState({
              users: data.data.map(user => user.user_name),
              assignee: data.data[0].user_name
          })
      }

      // Get project details from the API
      response = await fetch(configs.api_url + "/project/", {
          method : "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
      })
      data = await response.json()

      // Update the state
      if(data.data.length > 0) {
          this.setState({
              projects: data.data.map(project => project.name),
              projectName: data.data[0].name
          })
      }
    }

    // Handle change in input and store in state
    handleChange = ({ target: { name, value } }) => {
        this.setState({ ...this.state, [name]: value });
      };


    onSubmit = async(e) => {
        e.preventDefault();

        // Create a ticket based using the entered values
        const response = await fetch(configs.api_url + "/ticket/create", {
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

        alert('Successfully created.');

        // clear form
        this.setState({
          title: '',
          description: '',
          priority: '',
          status: '',
          type: ''
        });

        window.location = "/dashboard/" + this.state.user_type
    }

	render() {
        if(Cookies.get('session_id')) {
		return(
			<div className="wrapper">
				<h3>Submit a Ticket</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group my-2">
						<label>Title: </label>
            	<input type="text"
                  className="form-control my-2"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
            	/>
					</div>
					<div className="form-group my-2">
						<label>Description: </label>
            	<textarea style={{resize: 'none'}}
                  type="text"
                  maxLength="250"
                  rows="3"
                  className="form-control my-2"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
            	></textarea>
					</div>
					<div className="form-group my-2">
						<label>Project Name: </label>
            	<select className="form-control my-2"
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
          <div className="form-group my-2">
            <label>Assigned To: </label>
              <select className="form-control my-2"
                      value={this.state.assignee}
                      name="assignee"
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
					<div className="form-group my-2">
						<label>Priority: </label>
            	<select className="form-control my-2"
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
					<div className="form-group my-2">
						<label>Status: </label>
            	<select className="form-control my-2"
                      value={this.state.status}
                      name="status"
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
					<div className="form-group my-2">
						<label>Type: </label>
            	<select className="form-control my-2"
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
					<div className="form-group my-2">
              <input type="submit"
                   value="Submit Ticket"
                   className="btn btn-primary my-2 mb-5"
              />
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