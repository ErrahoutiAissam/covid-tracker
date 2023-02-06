import React from "react"
import "./spinner.css"

const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        fontWeight: 700,
        fontSize: 22,
      }}
    >
      <div className='spinner-container'>
        <div className='loading-spinner'></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
