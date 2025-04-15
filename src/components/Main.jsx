import React, { useState } from 'react'
import Navbar from './Navbar'
import Leftpanel from './Leftpanel'
import { Grid2 } from '@mui/material'
import Middle from './Middle'
import Rightpanel from './Rightpanel'
import Footer from './Footer'


function Main() {
    
    const [subCollect,setSubCollect] = useState("")
    const [search,setSearch] = useState("")


  return (
    <div>
        <Grid2 container>
            <Grid2 item xs={12}>
                <Navbar setSearch= {setSearch}/>

            </Grid2>
            <Grid2 item xs={2}>
                <Leftpanel setSubCollect={setSubCollect}/>

            </Grid2>
            <Grid2 item xs={9}>
                <Middle search={search} subCollect={subCollect}/>
            </Grid2>
            <Grid2 item xs ={1}>
                <Rightpanel/>
            </Grid2>
            <Grid2 item xs={12}>
                <Footer/>

            </Grid2>
        </Grid2>

    </div>
  )
}

export default Main