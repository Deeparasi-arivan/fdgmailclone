import React from 'react'
import calendar from "../images/calendar.png"
import user from  "../images/user.png"
import tasks from "../images/tasks.png"
import Notes from './Notes'
import Contacts from './Contacts'
import Event from './Event'



function Rightpanel() {
  return (
    <div style={{backgroundColor:"#F9F9F9",minHeight:"100vh",textAlign:"center",position:"fixed",right:"0",width:"5vw"}}>
      <Event/>

         {/* <img src={calendar} style={{width:"1.4vw",paddingTop:"2vw"}}/> */}
      <br/>
          {/* <img src={user} style={{width:"1.2vw",paddingTop:"2vw"}}/> */}
      <Contacts/>
      <br/>
           {/* <img src={tasks} style={{width:"1.2vw",paddingTop:"2vw"}}/> */}
      <Notes/>
    </div>
  )
}

export default Rightpanel