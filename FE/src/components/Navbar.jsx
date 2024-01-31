import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{height:"50px",width:"100vw",border:"1px solid teal",backgroundColor:"teal",display:"flex",justifyContent:"space-evenly",alignItems:"center",color:"white",textDecoration:"none"}}>
      <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>Home</Link>
      <Link style={{ color: "white", textDecoration: "none" }} to={"/viewpdf"}>MyPdf</Link>
      {/* <Link to={"/viewpdf"}>MyPdf</Link> */}
    </div>
  )
}

export default Navbar
