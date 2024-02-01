import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Pdfuploder from './Pdfuploder'
import Viewpdf from './Viewpdf'
import Resultpdf from './Resultpdf'

const AllRoutes = () => {
  return (
  <Routes>
    <Route path='/' element={<Pdfuploder/>}/>
    <Route path='/viewpdf' element={<Viewpdf/>}/>
    <Route path='/resultpdf' element={<Resultpdf/>}/>
  </Routes>
  )
}

export default AllRoutes
