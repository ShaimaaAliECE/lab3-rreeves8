import React, { Component } from 'react'
import './LogIn.css'
import api from '../api/api'

class LogIn extends Component{
    constructor(props){
        super();
        let credentials = {
            usr: '',
            password: ''
        }

        this.state = {
            logInType: '',
            handleClick: props.handleClick,
            credentials: credentials
        };
        this.handleChange = this.handleChange.bind(this);
    }

    loginselector(loginType){
        if(loginType === 'guest'){
            this.state.handleClick('guest');
        }
        else{
            this.setState({
                logInType: loginType
            })
        }
    }

    async logIn(){
        console.log(this.state.credentials.usr)
        console.log(this.state.credentials.password)
        const response = await api.post('/api/login', {
            ...this.state.credentials
        }).then((response) =>{   
            if(response.data === 'good'){
                this.state.handleClick('admin')
            }
            if(response.data === 'invalid'){
                console.log('bad entry')
            }
        }, (error) => {
            console.log(response)
        })
    }

    handleChange(event) {
        let prevState = this.state;
        let credentials;
        
        if(event.target.type === 'password'){
            credentials = {
                usr: this.state.credentials.usr,
                password: event.target.value
            }
        }
        else{
            credentials = {
                usr: event.target.value,
                password: this.state.credentials.password
            }
        }

        this.setState({
            logInType: prevState.logInType,
            handleClick: prevState.handleClick,
            credentials: credentials
        });
    }
    
    render(){ 
        if(this.state.logInType === ''){
            console.log("returning LOGIN selector")
            return (                          
                <div class = 'container'>
                    <h1> Log In Type </h1>
                    <div className = 'buttons'>
                        <button className = 'logins' onClick = {() => this.loginselector('admin')}>Admin</button>
                        <button className = 'logins' onClick = {() => this.loginselector('guest')}>Guest</button>
                    </div>
                </div>
            );
        }

        if(this.state.logInType === 'admin'){
            return(
                <div class = 'container'>
                    <h1> Log In Type </h1>
                    <div>
                        <ul>
                            <label>Username : </label>   
                            <input value = {this.state.credentials.usr} onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" />  
                        </ul>
                        <ul>
                            <label>Password : </label>
                            <input value = {this.state.credentials.password} onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" />
                        </ul> 
                        <button className = 'entry' onClick = {() => this.logIn()}>LogIn</button>
                    </div>
                </div>
            );
        }
    }
}

export default LogIn;