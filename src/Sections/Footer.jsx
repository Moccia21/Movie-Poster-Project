import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer_info-container">
        <div className="footer_info">
          <h4 className="footer_info-header">Copyright</h4>
          <p className="footer_info-para">© 2024 Jake Moccia</p>
        </div>
        <div className="footer_info">
          <h4 className="footer_info-header">Call Us</h4>
          <p className="footer_info-para">610-304-5300</p>
        </div>
        <div className="footer_info-primary">
          <h4 className="footer_info-header">Contact Us</h4>
          <p className="footer_info-para">jakemoccia@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
