import React from 'react'
import Cards from './Cards'
import Header from './Header'
import Footer from './Footer'
import About from './About'

function HomePage(props) {
  return (
    <>
    <Header/>
    <Cards setloader={props.setloader} />
    <About></About>
    <Footer></Footer>
    </>
  )
}

export default HomePage