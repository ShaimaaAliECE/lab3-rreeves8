import React, { Component , useState } from 'react'
import './UserData.css'
import CheckedBox from '../IMG/checkMark.jpg'
import EmptyBox from '../IMG/emptyBox.jpg'
import none from '../IMG/none.jpg'
import api from '../api/api';

class NewEntry extends Component{
    constructor(props){
        super(props);
        let availableObj = props.availability;

        let availability = []
        console.log(availableObj)
        let findString = "slot_"
        for(let i = 1; i <= 10; i++){
            let bool;
            if(availableObj[findString+i] == 1){
                availability[i-1] = true;
            }
            if(availableObj[findString+i] == 0){
                availability[i-1] = false;
            } 
        }

        this.state = {
            CheckBox: Array.from(Array(10), () => {
                return false
            }),
            availability: availability,
            badEntry: '',
            submitted: false,
            name: ''
        }
        this.sendNewentry = this.sendNewentry.bind(this)
        this.NewEntrySend = this.NewEntrySend.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)

    }

    onClick = (i, type) => {
        let prevState = this.state;
        let newCheckBoxs = prevState.CheckBox
        newCheckBoxs[i] = type;
        this.setState({
            CheckBox: newCheckBoxs
        })
    }

    handleKeyPress = (event) => {
        this.setState({
            name: event.target.value
        }) 
    }


    async sendNewentry(values){
        if(values !== undefined){
            console.log(this.state)
            values.unshift(this.state.name)
            const response = await api.post('/api/newTimeSlot', {
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
                        submitted: true
                    })
                }
                
            }, (error) => {
                console.log(response)
            })
        }
    }


    NewEntrySend(){
        console.log("Clicked submit")
        let values = [];

        for(let i = 0; i < 10; i ++){
            if(this.state.CheckBox[i]){
                values[i] = 1;
            }
            if(!this.state.CheckBox[i]){
                values[i] = 0;
            }
        } 
        console.log(values)
        this.sendNewentry(values) 
    }

    render(){
        let tabs = []
        
        if(!this.state.submitted){
            for(let i = 0; i < 10; i ++){
                if(!this.state.availability[i]){
                    tabs[i] = <li> 
                                <img src={none} alt="Empty Box"/>
                              </li>
                }
                else{
                    if(!this.state.CheckBox[i]){
                        tabs[i] = <li> 
                                    <img src={EmptyBox} alt="Empty Box" onClick = {() => {this.onClick((i),true)}}/>
                                </li>
                    }
                    else{
                        tabs[i] = <li> 
                                    <img src={CheckedBox} alt="CheckedBox" onClick = {() => {this.onClick((i),false)}}/>
                                </li>
                    }
                }
            }
            if(this.state.badEntry !== ''){
                tabs[11] =<li>
                    <a className = "message"> {this.state.badEntry}</a>
                </li>
            }
            else{
                tabs[11] = <li>
                    <button className ="submit" onClick ={() => {this.NewEntrySend()}}>Submit</button>
                </li>
            }
        }
        else{
            if(this.state.submitted){
                for(let i = 0; i < 10; i ++){
                    tabs[i] = <li> 
                                <img src={none} alt="Empty Box"/>
                              </li>
                }
                tabs[11] =<li>
                    <a className = "message"> Submitted!</a>
                </li>
            }
        }

        return (  
            <ul>
                <input 
                    value = {this.state.name}   
                    onChange = {this.handleKeyPress} 
                    type="name" 
                    placeholder="Enter Name"/>
            {tabs}
            </ul>
        )
    }
}

export default NewEntry;