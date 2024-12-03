import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Exprience,Download<br />Tasty Kart</p>
      <div className="app-download-platforms">
        <a href="/play-store">
          <img src={assets.play_store} alt="Play Store" />
        </a>
        <a href="/app-store">
          <img src={assets.app_store} alt="App Store" />
        </a>
      </div>
    </div>
  )
}

export default AppDownload
