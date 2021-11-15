import logo from './logo.svg';
import './App.css';
import api from './api';
import React, { Component} from 'react'

class App extends Component {
	constructor(){
		super();
	}

    async getAvailable () {
        const response = await api.get('/api/availability')
        return response.data
    }

	render(){
		console.log(this.getAvailable())
		
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						
					</p>
					<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
					>
					Learn React
					</a>
				</header>
			</div>
		);
	}
}

export default App;
