import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footercontainer">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Via San Gottardo</li>
              <li>Bellinzona</li>
              <li>Switzerland</li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 col-sm-6">
            <ul className="list-unstyled">
              <li>Terms And Conditions</li>
              <li>Privacy policy</li>
              <li>&copy; 2024 Car Rental. All rights reserved.</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
