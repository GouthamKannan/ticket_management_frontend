import React, { Component } from 'react';
import configs from '../config';

// Create project component
export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Initialize the state
        this.state = {
            projects: [],
            name: ''
        }
    }

    // Get projects details from api on mounting the component
    componentDidMount = async() => {
        const response = await fetch(configs.api_url + "/project", {
            method : "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        var data = await response.json()
        if(data.data.length > 0) {
            this.setState({
                projects: data.data.map(project => project.name)
            })
        }

    }

    // Store project name in state
    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    /**
     * Handling project create button
     * @param e : event
     */
    onSubmit = async(e) => {
        e.preventDefault();

        // Create project
        const response = await fetch(configs.api_url + "/project/create", {
            method : "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: this.state.name
            })
        })
        var data = await response.json()
        console.log(data.data)

        // clear form
        this.setState({ name: ''});
        console.log(this.props)
        window.location = "/manage-projects/" + this.props.user_type
    }

    render() {
        return (
            <div className="wrapper">
                <h3>Create New Project</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Project: </label>
                        <input type="text"
                               className="form-control my-2"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Create Project"
                               className="btn btn-primary my-2"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
