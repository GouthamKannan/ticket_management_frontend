import React, { Component } from 'react';
import configs from '../config';
import CreateProject from "./create_project";
import Cookies from 'js-cookie';


const Project = props => (
    <tr>
        <td>{props.project.name}</td>
        <td>
            <button onClick={() => {
                if(window.confirm('Are you sure you want to delete this project?'))
                    props.deleteProject(props.project._id)
            }}
            className="btn btn-sm btn-danger">Delete</button>
        </td>
    </tr>
);

// Manage Project component
export default class ManageProjects extends Component {
	constructor(props) {
		super(props);

		this.deleteProject = this.deleteProject.bind(this);

		this.state = { projects: [] , user_type:""};
	}

    componentDidMount = async () => {

        const windowUrl = window.location;
        console.log(windowUrl.toString())
        this.setState({user_type : windowUrl.toString().split('/').pop().replace("?", "").replace("#", "")});


        // Get project details from API
        const response = await fetch(configs.api_url + "/project/", {
            post: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        var data = await response.json()
        // Update the state variable
        this.setState({projects: data.data})
        console.log(this.state.user_type)
    }

    componentDidUpdate = async() => {
        // Get project details from API
        const response = await fetch(configs.api_url + "/project/", {
            post: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        await response.json()
    }

    deleteProject = async(id) => {
        // Delete project using API
        const response = await fetch(configs.api_url + "/project/" + id, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        await response.json()

	    // update tickets array to all projects without matching id
	    this.setState({
	        projects: this.state.projects.filter(el => el._id !== id)
	    })
	}

    /**
     * Get projects from the state
     */
    getProjects() {
        return this.state.projects.map(currentProject => {
            return <Project
            			project={currentProject}
            			deleteProject={this.deleteProject}
                        key={currentProject._id}
                    />;
        })
	}

	render() {
        if(Cookies.get('session_id')) {

		return(
			<div style={{"width":"60%", "margin-left":"20%", "margin-right":"20%"}}>
				<table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th className="col-8">Name</th>
                        <th className="col-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.getProjects() }
                    </tbody>
                </table>
                <br></br>
                <CreateProject user_type={this.state.user_type}/>
			</div>
		);
        }
        else{
            window.location = "/"
        }
	}
}