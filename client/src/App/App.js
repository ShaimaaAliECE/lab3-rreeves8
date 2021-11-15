import './App.css';
import api from '../api/api'
import React, { Component } from 'react'
import LogIn from '../LogIn/LogIn';
import UserData from '../UserData/UserData'

function Head(props){
    let tabs = []
    tabs[0] = <li> 
                <a> Name </a>
              </li>
              
    for(let i = 1; i <= 10; i ++){
        tabs[i] = <li> 
                    <a> Slot {i} </a>
                  </li>
    }

    return <ul> {tabs} </ul>
}


class App extends Component {
    constructor(){
        super();
        this.state = {
            userType: '',
        }
    }
    
    logInClick = (type) => {
        this.setState({
            userType: type
        })
    }

    render(){
        if(this.state.userType === ''){
            return (
                <LogIn
                    handleClick = {this.logInClick}
                ></LogIn>
            );
        }
        else{
            if(this.state.userType === 'guest'){
                
            }
            
            if(this.state.userType === 'admin'){
                
            }

            return (
                <div>
                    <h1> Doodle App</h1>
                    <div className = "tableContainer">
                        <nav>         
                            <Head></Head>         
                            <UserData></UserData>
                        </nav>
                    </div>
                </div>
            );
        }
    }
}

export default App;
