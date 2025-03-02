import React from "react";

const Footer = () => {
  return (
    <footer className="p-6 bg-gray-800 text-white text-center text-xs">
      <p>&copy; 2025 PurpleNight. All rights reserved.</p>
      <i className="ri-mail-line"></i>
      <p>Contact us at: </p>
        <p> harshkumargupta630.com </p>
        <p>+91 7319790160</p>
      
      <p>
        <a href="privacy-policy.html">Privacy Policy</a> |
        <a href="terms-of-service.html">Terms of Service</a>
      </p>
      
      <p>
        Follow us:
        </p>
        <p>
        <i className="ri-twitter-x-fill"></i>
        <a href="https://twitter.com/Harshkumar10099" target="_blank">Twitter  |    </a> 
        <i className="ri-instagram-line"></i>
        <a href="https://instagram.com/sauravmeghwal" target="_blank">Instagram |</a>
        <i className="ri-instagram-line"></i>
        <a href="https://instagram.com/harsh_gupta._.x" target="_blank">Instagram   |</a>
        <i className="ri-github-fill"></i>
        <a href="https://github.com/Harsh9934-debug" target="_blank">Github |</a>
      </p>
      
      <p>
        <a href="about.html">About Us</a> |
        <a href="contact.html">Contact</a> |
        <a href="faq.html">FAQ</a>
      </p>
      
      <p>
        Subscribe to our newsletter:
        <input type="email" placeholder="Enter your email" className="p-2 rounded text-black" />
        <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Subscribe</button>
      </p>
    </footer>
  );
};

export default Footer;