import React, { Component , useState } from 'react'
import api from '../api/api';
import './UserData.css'
import NewEntry from './NewEntry';
import Row from './Row'


class UserData extends Component{ 
    constructor(){
        super();
        this.state = {
            availability: null,
            otherUsers: null
        }
        this.getAvailable = this.getAvailable.bind(this)

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

    getAvailable = async () => {
        console.log("fetching available")
        try{
            const response = await api.get('/api/availability')
            console.log(response)
            console.log(response.data)
            this.setState({
                availability: response.data[0],
            })
        }
        catch(err){
            console.log(err)
        }
    }


    render(){
        if(this.state.availability === null){
            this.getAvailable()
            /*
            this.setState({
                availability: [true,true,true,true,true,true,true,true,true,true]
            })
            */
        }
        if(this.state.otherUsers === null){
            this.getOtherUsers()
        }

        if((this.state.availability !== null) && (this.state.otherUsers !== null)){
            let collumns = []
            for(let i = 0; i < this.state.otherUsers.length;i++){
                    collumns[i] = <Row users = {this.state.otherUsers[i]}/>
            
            }
        
            return (
                <div>
                    {collumns}
                    <NewEntry
                        availability = {this.state.availability}/> 
                </div> 
            )
        }
        return(
            <div></div>
        )
        
    }
}


export default UserData;