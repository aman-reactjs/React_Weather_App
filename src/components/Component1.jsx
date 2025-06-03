import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
const Component1 = () => {
  const[weatherData , setWeatherData]=useState();
  const[apiData , setApiData]=useState();
  const [errorMsg , setErrorMsg]=useState();

  const inputRef=useRef()
  const btnRef = useRef()

  const handleData =async()=>{
      try{
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherData}&appid=${`1f6449b8b7a811ec49882f1de26f19b3`}&units=metric`)
        

        if(!res.ok){
            setErrorMsg("HTTP error ! Status" + res.status);
            setApiData("")
            return;
        }
        const data = await res.json()
        
        setApiData(data)
        setWeatherData("")
        setErrorMsg("")
      } 
      catch(er){
        setErrorMsg(er.message)
        setApiData("")
      }
    }
useEffect(()=>{
  const handleRef=(ev)=>{
    if(ev.key==="/"){
      ev.preventDefault()
      inputRef.current.focus();
    }
    if(ev.key==="Enter"){
      ev.preventDefault()
      btnRef.current.click()
    }
  }
  window.addEventListener("keypress",handleRef)
  return()=>{

    window.removeEventListener("keyprass",handleRef)
  }

},[])

  return (
    <>
    <div className="container">
      <div className="weather-cont">

      <input ref={inputRef} type='text' value={weatherData} placeholder='Enter city name' onChange={(e)=>setWeatherData(e.target.value)}/>
      <button ref={btnRef} onClick={()=>handleData()}>search</button>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {apiData && 
      <>
      <div className='mainData'>
        <img
  src={`https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`}
  alt="Weather Icon"
/>
        <h2>{apiData.name}</h2>
   

        <span className='degree'>

       {`${apiData.main.temp} \u00B0C` } 

        </span>
       <span className='degree-span'>{apiData.weather[0].description}

        </span>
     <div className='deg-speed'>

       <span > {<FontAwesomeIcon icon= {faWind} />} {apiData.wind.speed} <br /> Wind</span>
       <span > <FontAwesomeIcon icon= {faDroplet} /> {apiData.main.humidity}% <br />Humidity </span>
         </div>
      </div>
      </>
}
      </div>
    </div>
    </>
  )
}

export default Component1