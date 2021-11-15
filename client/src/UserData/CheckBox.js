import React, { Component , useState } from 'react'
import './UserData.css'
import CheckedBox from '../IMG/checkMark.jpg'
import EmptyBox from '../IMG/emptyBox.jpg'

class CheckBox extends Component{
    constructor(props){
        super(props);
        console.log(props.type)
        
        let newState ={
            type: '',
            CheckBoxs: '',
            availability: props.availability
        };

        if(props.type === "NewEntry"){
            var CheckBox =  Array.from(Array(10), () => {
                return false
            })
            newState = {
                type: props.type,
                CheckBoxs: CheckBox
            }
        }
        else{
            newState = {
                type: '',
                CheckBoxs: props.CheckBoxs
            }
        }   
        this.state = {
            type: newState.type,
            CheckBoxs: newState.CheckBoxs,
            availability: newState.availability
        }
    }

    onClick = (i, type) => {
        let prevState = this.state;
        let newCheckBoxs = prevState.CheckBoxs
        newCheckBoxs[i] = type;
        this.setState({
            type: prevState.type,
            CheckBoxs: newCheckBoxs
        })
    }

    render(){
        let tabs = []
        console.log(this.state.type + "data")
        if(this.state.type === 'NewEntry'){
            for(let i = 1; i <= 10; i ++){
                if(this.state.availability[i] !== false){
                    if(this.state.CheckBoxs[i-1] === false){
                        tabs[i] = <li> 
                                    <img src={EmptyBox} alt="Empty Box" onClick = {() => {this.onClick((i-1),true)}}/>
                                </li>
                    }
                    else{
                        tabs[i] = <li> 
                                    <img src={CheckedBox} alt="Empty Box" onClick = {() => {this.onClick((i-1),false)}}/>
                                </li>
                    }
                }
                else{
                    tabs[i] = <li> 
                                <img src={EmptyBox} alt="Empty Box"/>
                            </li>
                }
            }
        }
        return (tabs)
    }
}

export default CheckBox;