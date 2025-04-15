
import { List, ListItem, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import star from "../images/star.png"
import refresh from "../images/refresh.png"
// import { data } from 'react-router-dom'
import {collection,deleteDoc,doc,getDocs,setDoc} from "firebase/firestore"
import{auth,database} from "../firebase/setup"
import remove from "../images/bin.png"
import yellow from "../images/yellow.png"
import snooze from "../images/snooze.png"


function Middle(props) {
  const [mailData,setMailData] = useState([])
    const [show,setShow] = useState(false)
    
    const deleteMail = async(data)=>{
      const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
      const messageDoc = doc(userDoc,"Inbox",`${data.id}`)
      const starredDoc = doc(userDoc,"Starred",`${data.id}`)
      const snoozedDoc = doc(userDoc,"Snoozed",`${data.id}`)
      try{
        await deleteDoc(starredDoc)
        await deleteDoc(snoozedDoc)
        await deleteDoc(messageDoc)
      }catch(err){
        console.error(err)
      }
    }


    const getMail = async()=>{
        const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
        const messageDoc = collection(userDoc,`${props.subCollect ? props.subCollect : "Inbox"}`)
        try{
          const data = await getDocs(messageDoc)
          const filteredData = data.docs.map((doc)=>({
             ...doc.data(),
             id:doc.id
          }))
          setMailData(filteredData)
        }catch(err){
            console.error(err)
        }
    }

    const starred = async(data) =>{
      const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
      const messageDoc = doc(userDoc,"Starred",`${data.id}`)
      try{
        await setDoc(messageDoc,{
           email:data.email,
           sender:data.sender,
           starred:"true"
        })
      }catch(err){
        console.error(err)
      }
    }

    const snoozed = async(data) =>{
      const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
      const messageDoc = doc(userDoc,"Snoozed",`${data.id}`)
      const snoozeDoc = doc(userDoc,"Inbox",`${data.id}`)
      try{
        await deleteDoc(snoozeDoc)
        await setDoc(messageDoc,{
           email:data.email,
           sender:data.sender,
        })
      }catch(err){
        console.error(err)
      }
    }

    useEffect(()=>{
      getMail()
    },[props.subCollect])




  return (
    <div style={{marginLeft:"2.9vw",width:'75vw'}}>
        <img src={refresh} style={{width:"1.5vw",height:"1.5vw",marginLeft:"1.5vw",marginTop:"2vw"}}/>
        {props.search ?  mailData.filter((data)=> data.sender == props.search).map((data)=>{
            return <>
            <Paper onMouseEnter={()=> setShow(true)} onMouseLeave={()=>setShow(false)} elevation={0} style={{backgroundColor:"#F8FCFF",borderBottom:"1px solid #EFEFEF",borderTop:"1px solid #EFEFEF"}}>
            <ListItem>
                {data.starred ? <img src={yellow} style={{cursor:"pointer",width:"1.4vw",height:"1.4vw"}}/> 
                : <img onClick={()=>starred(data)} src={star} style={{cursor:"pointer",width:"1.4vw",height:"1.4vw"}}/>}
                <span  style={{fontSize:"1.3vw",marginLeft:"1.2vw",fontWeight:"500"}}>{data.sender}<span style={{marginLeft:"12vw",fontWeight:"200",marginLeft:"1vw",cursor:"pointer"}}>{data.email}</span></span>
                {show && <img onClick={()=>snoozed(data)} src={snooze} style={{marginLeft:"1vw",width:"1.3vw",height:"1.3vw",cursor:"pointer"}}/>}
                {show && <img onClick={()=>deleteMail(data)} src={remove} style={{width:"1.1vw",height:"1.1vw"}}/>}
            </ListItem>
           </Paper>
            </>
        })
       :  mailData.map((data)=>{
            return <>
            <Paper onMouseEnter={()=> setShow(true)} onMouseLeave={()=>setShow(false)} elevation={0} style={{backgroundColor:"#F8FCFF",borderBottom:"1px solid #EFEFEF",borderTop:"1px solid #EFEFEF"}}>
            <ListItem>
            {data.starred ? <img src={yellow} style={{cursor:"pointer",width:"1.4vw",height:"1.4vw"}}/> 
                : <img onClick={()=>starred(data)} src={star} style={{cursor:"pointer",width:"1.4vw",height:"1.4vw"}}/>}             
                   <span  style={{fontSize:"1.3vw",marginLeft:"1.2vw",fontWeight:"500"}}>{data.sender}<span style={{marginLeft:"1vw",fontWeight:"200",cursor:"pointer"}}>{data.email}</span></span>
                  {show && <img onClick={()=>snoozed(data)} src={snooze} style={{marginLeft:"1vw",width:"1.3vw",height:"1.3vw",cursor:"pointer"}}/>}
                {show && <img  onClick={()=>deleteMail(data)} src={remove} style={{width:"1.1vw",height:"1.1vw",marginLeft:"1vw",cursor:"pointer"}}/>}
            </ListItem>
           </Paper>
            </>
        })}
      
      <h6 style={{fontWeight:"400",marginLeft:"28vw",fontSize:"1vw"}}>Terms · Privacy · Program Policies</h6>
     
    </div>
  )
}

export default Middle;

  
//   const getMail = async(data) =>{
//   const userDoc = doc(database,"User",`${auth.currentUser?.email}`)
//   const messgeDoc = collection(userDoc,`${props.subCollect ? props.subCollect:"Inbox"}`)


//     try{
//      const data = await getDocs(messgeDoc)
//       const filteredDta = data.docs.map((doc)=>({
//         ...doc.data(),
//         id:data.id

//       } ))
//       setMailData(filteredDta)
//     }catch (err){
//       console.error(err)
//     } 
//   }

//   useEffect(()=>{
//     getMail()
//   },[props.subCollect])

//   console.log(mailData)
//   return (
//     <div style={{marginLeft:"2.9",width:"75vw",paddingTop:"6vw"}}> 
//     <img src={refresh} style={{width:"1.5vw", height:"1.5vw", marginLeft:"1.5vw", marginTop:"2vw"}} />
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//           <img src="remove" style={{width:"1.4vw",height:"1.4vw"}} />
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{backgroundColor:"#F8FCFF",borderBottom:"1px solid #EFEFEF",}}>
      
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>{data.sender}<span style={{marginLeft:"12vw",fontWeight:"200"}}>hjhjkhhghhhh</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{border:"1px solid lightgrey"}}>
  
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>hjhjhkjhviuhuhjnmnnnn<span style={{marginLeft:"12vw",fontWeight:"200"}}>hjhjkhhghhhh</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <Paper elevation={0} style={{borderBottom:"1px solid lightgrey",borderTop:"1px solid lightgrey"}}>
    
//         <ListItem>
//           <img src={star} style={{width:"1.4vw",height:"1.4vw"}}/>
//           <span style={{marginLeft:"1.2vw",fontWeight:"500"}}>deepa.@gmail.com<span style={{marginLeft:"12vw",fontWeight:"200"}}>hi  this deepa</span></span>
//         </ListItem>
      
//     </Paper>
//     <h6 style={{fontWeight:"800",marginLeft:"28vw"}}>Terms  .  privacy  .  arivandeepa program policies </h6>
   
    
//     </div>
//   )
// }

// export default Middle






