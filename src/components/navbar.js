import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import configs from '../config'


// Side Bar component
export default class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user_name : "",
			user_type : "user"
		}
	}

	componentDidMount = async() => {
		const windowUrl = window.location;
        await this.setState({user_type : windowUrl.toString().split('/').pop().replace("?", "").replace("#", "")});
	}

	logout = async() => {
		// Logout using API and show the home page
		Cookies.remove("session_id")
		await fetch(configs.api_url + "/user/logout", {
            method : "GET",
            credentials: "include",
		})
		window.location = "/"

	}

	render() {
		return(

			<nav className="navbar navbar-light bg-light navbar-expand-lg">
				<span className=" mx-5 nav-link">Ticket Management System</span>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
              	<div className="collapse navbar-collapse" id="navbarSupportedContent" style={{"margin-left" : "30%"}}>
					<ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
						<li className="nav-item">
							<NavLink to={"/dashboard/" + this.state.user_type} onlyActiveOnIndex={true} className="nav-link" activeClassName="active">
								Dashboard
							</NavLink>
						</li>
						<li>
							<NavLink to={"/tickets/create/" + this.state.user_type} className="nav-link" activeClassName="active">
								Create Ticket
							</NavLink>
						</li>
						{(this.state.user_type==="admin" || this.state.user_type==="Admin") &&
						<>
							<li>
								<NavLink to={"/manage-projects/" + this.state.user_type} className="nav-link" activeClassName="active">
									Manage Projects
								</NavLink>
							</li>
							<li>
								<NavLink to={"/user-approval/" + this.state.user_type} className="nav-link" activeClassName="active">
									Manage Users
								</NavLink>
							</li>
						</>
						}
						<><li className="nav-item"><button className="btn btn-secondary" onClick={this.logout} value="logout">Logout</button></li></>
					</ul>
				</div>
			</nav>
            // </nav>


			// <nav class="col-md-2 d-none d-md-block bg-light sidebar">

		);
	}
}
