import React, { Component , useState } from 'react'
import api from '../api/api';
import './UserData.css'
import CheckBox from './CheckBox'

function Rows(props){
    let rows = [];
    console.log(props.availability)
    console.log(props.timeSlots)
    
    for(let i = 0; i < 5;i++){
       
    }
    return(
        <div></div>
    )
}


class UserData extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            availability: ''
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    async sendNewentry(values){
        const res = await api.post('/api/newTimeSlot', {
            ...values
        })
        console.log(res)
    }

    async getAvailable() {
        try {
            const {data:response} = await api.get('/api/availability') //use data destructuring to get data from the promise object
            return response
        }
    
        catch (error) {
            console.log(error);
        }
    }

    async getTimeSlots () {
        const response = await api.get('/api/timeSlots')
        return response.data
    }

    handleKeyPress = (event) => {
        this.setState({
            name: event.target.value
        }) 
    }

    render(){  
        let available = this.getAvailable();
        let timeSlots = this.getTimeSlots();
        console.log(available[0])

        return (
            <div>
                <Rows
                    availability = {available}
                    timeSlots = {timeSlots}
                />
                <ul> 
                    <input 
                        value = {this.state.name}   
                        onChange = {this.handleKeyPress} 
                        type="text" 
                        placeholder="Enter Name"/>
                    <CheckBox
                        type = 'NewEntry'/> 
                </ul>
            </div> 
        )
    }
}


export default UserData;