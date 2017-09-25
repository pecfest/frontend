import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

export default class Navbar extends Component {
	render() {
		return (
			<nav className="Navbar">
				<Link className="Navbar-link" to="/">Home</Link>
				<Link className="Navbar-link" to="/activities">Events</Link>
				<Link className="Navbar-link" to="/sponsors">Sponsors</Link>
				<Link className="Navbar-link" to="/people">People</Link>
			</nav>
		)
	}
}
