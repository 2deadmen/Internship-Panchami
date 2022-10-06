import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './About.css'

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });


}, []);
  return (
    <>
    <div className='au'>
      <center>
      <div className='au-pic'>
       
        
      </div>
      <h3>MR.</h3>
      </center>
      <div className='vision' data-aos="slide-left"  data-aos-once="true">
        <h2>OUR VISION</h2>
        <div className='vision-ex' >The primary goal of Panchami Associates is to provide quality construction work and  customer satisfaction in this construction industry. We cater Industrial, commercial and residential construction projects.We deliver highly responsive and innovative solutions to bridge our client's execution gaps through a deep understanding of their needs and a culture of shared commitments.Thus optimizing system functionality and improving operation efficiency with outstanding service
</div>
      <div>
        <Link to="/Projects"><h3>KNOW OUR WORK</h3></Link>
        
      </div>
      </div>
      </div>
    </>
  )
}

export default AboutUs