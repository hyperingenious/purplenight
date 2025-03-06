import React from "react";

const Footer = () => {
  return (
    <footer style={{padding: '1rem', backgroundColor: '#222', color: 'white', textAlign: 'center', fontSize: '.8rem'}}>
      <p>&copy; 2025 PurpleNight. All rights reserved.</p>
      <i className="ri-mail-line"></i>
      <p>Contact us at: </p>
      <p> harshkumargupta630.com </p>
      <p>+91 7319790160</p>
      
      <p>
        <a href="privacy-policy.html" style={{color: 'white'}}>Privacy Policy</a> |
        <a href="terms-of-service.html" style={{color: 'white'}}>Terms of Service</a>
      </p>
      
      <p>
        Follow us:
      </p>
      <p>
        <i className="ri-twitter-x-fill" style={{marginRight: '0.5rem'}}></i>
        <a href="https://twitter.com/Harshkumar10099" target="_blank" style={{color: 'white'}}>Twitter  |    </a> 
        <i className="ri-instagram-line" style={{marginRight: '0.5rem'}}></i>
        <a href="https://instagram.com/sauravmeghwal" target="_blank" style={{color: 'white'}}>Instagram |</a>
        <i className="ri-instagram-line" style={{marginRight: '0.5rem'}}></i>
        <a href="https://instagram.com/harsh_gupta._.x" target="_blank" style={{color: 'white'}}>Instagram   | </a>
        <i className="ri-github-fill" style={{marginRight: '0.5rem'}}></i>
        <a href="https://github.com/Harsh9934-debug" target="_blank" style={{color: 'white'}}>Github |</a>
      </p>
      
      <p>
        <a href="about.html" style={{color: 'white'}}>About Us</a> |
        <a href="contact.html" style={{color: 'white'}}>Contact</a> |
        <a href="faq.html" style={{color: 'white'}}>FAQ</a>
      </p>
      
      <p>
        Subscribe to our newsletter:
        <input type="email" placeholder="Enter your email" style={{padding: '.5rem', borderRadius: '.25rem', border: '1px solid #ccc', color: 'black'}} />
        <button style={{marginLeft: '0.5rem', padding: '.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '.25rem', border: 'none'}}>Subscribe</button>
      </p>
    </footer>
  );
};

export default Footer;