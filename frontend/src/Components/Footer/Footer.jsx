import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Kullu Creations</p>
      </div>
    
      <div className="footer-social-icons">
        <div className="footer-icons-container">
        <a href="https://www.instagram.com/kullu.kinnorishawls/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
            </a>
        </div>
      
        <div className="footer-icons-container">
        <a href="https://wa.me/7649910200" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt="WhatsApp" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p><b>Address:</b> Shamshi,kullu distt,Himachal Pradesh, 175125</p>
        <p><b>Contact No:</b> 7649910200</p>
        <p><b>Email:</b> kullukinnorishawlsindustry@gmail.com</p>
        
      </div>
    </div>
  )
}
export default Footer
