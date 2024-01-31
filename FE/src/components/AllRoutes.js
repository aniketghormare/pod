import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Pdfuploder from './Pdfuploder'
import Viewpdf from './Viewpdf'

const AllRoutes = () => {
  return (
  <Routes>
    <Route path='/' element={<Pdfuploder/>}/>
    <Route path='/viewpdf' element={<Viewpdf/>}/>
  </Routes>
  )
}

export default AllRoutes
