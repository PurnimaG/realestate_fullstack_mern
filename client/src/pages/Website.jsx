import React from 'react';
import Companies from "../components/Companies/Companies";
import Residencies from "../components/Residencies/Residencies";
import Values from "../components/Values/Values";
import Contact from "../components/Contact/Contact";
import GetStarted from "../components/GetStarted/GetStarted";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";

const Website = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Values />
      <Contact />
      <GetStarted />
      
    </div>
  )
}

export default Website
