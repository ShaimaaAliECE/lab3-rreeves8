import './App.css';
import api from '../api/api'
import React, { Component } from 'react'
import LogIn from '../LogIn/LogIn';
import UserData from '../UserData/UserData'
import CheckedBox from '../IMG/checkMark.jpg'
import EmptyBox from '../IMG/emptyBox.jpg'
import Row from '../UserData/Row'

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

class AvailabilityAdjust extends Component{
    constructor(props){
        super(props);
        this.state = {
            CheckBox: Array.from(Array(10), () => {
                return false
            }),
            set: false,
            badEntry: ''
        }
        this.changeAvailability = this.changeAvailability.bind(this)
    }

    onClick = (i, type) => {
        let prevState = this.state;
        let newCheckBoxs = prevState.CheckBox
        newCheckBoxs[i] = type;
        this.setState({
            CheckBox: newCheckBoxs
        })
    }

    async changeAvailability(){
        let values = []
        for(let i = 0; i < this.state.CheckBox.length; i++){
            if(this.state.CheckBox[i]===true){
                values[i] = 1;
            }
            else{
                values[i] = 0;
            }
        }
        console.log("changing to :" + values)

        const response = await api.post('/api/setAvailable', {
            ...values
        })
        .then((response) =>{      
            let x = response.data.code
            console.log(x)
            if(x !==''){
                this.setState({
                    badEntry: x
                })
            }
            else{
                this.setState({
                    set: true
                })
            }
                
        }, (error) => {
            console.log(response)
        })
        
    }

    render(){
        let availability = []
        for(let i = 0; i < 10; i ++){   
            if(!this.state.CheckBox[i]){
                availability[i] = <li> 
                            <img src={EmptyBox} alt="Empty Box" onClick = {() => {this.onClick((i),true)}}/>
                        </li>
            }
            else{
                availability[i] = <li> 
                        <img src={CheckedBox} alt="CheckedBox" onClick = {() => {this.onClick((i),false)}}/>
                        </li>
            }
        }
        if(!this.state.set)
                availability[11] = <li>
                                    <button className ="submit" onClick ={() => {this.changeAvailability()}}>Change</button>
                                </li>
        if(this.state.set){
            availability[11] =  <li>
                                   <a> {this.state.badEntry} </a>
                                </li>
        }
        
        availability.unshift(
            <li>
                <a className = "message"> Change availability </a>
            </li>
        )

        return(
            <ul>{availability}</ul>
        );

    }
}

class App extends Component {
    constructor(){
        super();
        this.state = {
            userType: '',
            otherUsers: null
        }
        this.getOtherUsers = this.getOtherUsers.bind(this)
    }
    
    logInClick = (type) => {
        this.setState({
            userType: type
        })
    }

    async getOtherUsers () {
        console.log("fetching other users")
        try{
            const response = await api.get('/api/getOtherUsers')
            console.log(response)
            console.log(response.data)
            this.setState({
                otherUsers: response.data,
            })
        }
        catch(err){
            console.log(err)
        }
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
            
            if(this.state.userType === 'admin'){
                console.log("Logged into admin")
                if(this.state.otherUsers === null){
                    this.getOtherUsers()
                }
                if(this.state.otherUsers !== null){
                    let collumns = []
                    for(let i = 0; i < this.state.otherUsers.length;i++){
                        collumns[i] = <Row users = {this.state.otherUsers[i]}/>
                    }
                    return(
                        <div>
                            <h1> Doodle App</h1>
                            <div className = "tableContainer">
                                <nav>         
                                    <Head></Head>        
                                    {collumns}
                                    <AvailabilityAdjust/> 
                                </nav>
                            </div>
                        </div>
                    );
                }
            } 
        }
        return(
            <div>loading</div>
        )
    }
}

export default App;
