import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Modal, Button } from "react-bootstrap";
import "./Navbar.css";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const toggleMenu = () => {
    setShowMediaIcons(!showMediaIcons);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true); // Show the confirmation modal
  };

  const confirmSignUp = () => {
    setShowSignUpModal(false);
    window.open("/signup", "_blank"); // Open Sign Up page in a new tab
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false); // Close the confirmation modal
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home" style={{ fontSize: "xx-large" }}>
          EagleEye
        </Link>

        <div className="hamburger-menu d-lg-none">
          <Link to="#" onClick={toggleMenu}>
            <GiHamburgerMenu style={{ fontSize: "2rem", color: "white" }} />
          </Link>
        </div>

        <div className={`collapse navbar-collapse ${showMediaIcons ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Navbar links */}
            <li className="nav-item">
              <Link className="nav-link" to="/business" style={{ color: "white" }}>Business</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/entertainment' style={{ color: "white" }}>
                Entertainment
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/general' style={{ color: "white" }}>
                General
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/health' style={{ color: "white" }}>
                Health
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/science' style={{ color: "white" }}>
                Science
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/sports' style={{ color: "white" }}>
                Sports
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/technology' style={{ color: "white" }}>
                Technology
              </Link>
            </li>
          </ul>

          <div className="ms-lg-3">
            {auth ? (
              <button onClick={logout} className="btn btn-outline-light">
                Logout
              </button>
            ) : (
              <button onClick={handleSignUpClick} className="btn btn-outline-light">
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showSignUpModal} onHide={closeSignUpModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSignUpModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmSignUp}>
            Yes, Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
