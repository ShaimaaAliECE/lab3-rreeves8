import React, { Component , useState } from 'react'
import CheckedBox from '../IMG/checkMark.jpg'
import EmptyBox from '../IMG/emptyBox.jpg'

export default function Row(props){
    console.log(props.users)
    let users = props.users

    var dataFormatted = [];     
    
    dataFormatted[0] = <li>
                         <a className = "message"> {users['usrName']}</a>
                       </li>

    let findString = "slot_"

    for(let i = 1; i <= 10; i++){

        if(users[findString+ (i)] == '1'){
            dataFormatted[i] = <li> <img src={CheckedBox} alt="CheckedBox"/></li>
        }
            
        if(users[findString+ (i)] == '0'){
            dataFormatted[i] = <li><img src={EmptyBox} alt="Empty Box"/></li>
        }
    }
    dataFormatted[12] = <li>
                            <a className = "spaceFill"></a>
                        </li>
    console.log(dataFormatted)

    return(
        <ul className = "shift">
            {dataFormatted}
        </ul>
    )
}