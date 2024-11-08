import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function NavbarComponent(props) {

    // function to call the prop for toggle dark mode
    const handleDarkModeToggle = () => {
        props.toggleDarkMode(); // Call the toggleDarkMode function passed from App.js
    };
    return (

        <>
            <Navbar className={'sticky-top top-0 border-bottom border-' + (props.isDarkMode ? 'white' : 'black')} bg={(props.isDarkMode) ? 'black' : 'light'} data-bs-theme={(props.isDarkMode) ? 'dark' : 'light'}>
                <Container>
                    <Navbar.Brand href="/"><img src="favicon.ico" alt="" /> {props.title}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">{props.aboutText}</Nav.Link>
                    </Nav>
                    <div className="form-check form-switch form-switch-sm" title="Toggle's dark mode">
                        <input className="form-check-input btn" type="checkbox" id="modeSwitch" checked={props.isDarkMode} onChange={handleDarkModeToggle} />
                    </div>
                </Container>
            </Navbar>
        </>
    );
}

NavbarComponent.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string.isRequired,
    isDarkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired
};


// NavbarComponent.defaultProps = {
//     title : "!!!Your Title!!!",
//     aboutText : "About"
// }