import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import logo from './assests/logo.jpg';
import { Alert } from 'reactstrap';

const Bonus = () => {

    const [isOpen, setIsOpen] = useState(false);

    const logoutClicked = () => {
        window.location.href = '/';
    }

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand style={{ color: "green" }} href="#"><img
                        src={logo}
                        width="30"
                        height="30"
                        alt="insideHome"
                    />Barber</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink style={{ color: "green" }} href="#">About and Contacts</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText style={{ color: "red" }} onClick={logoutClicked}>Logout</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
            <div>
                <Alert color="success">
                    You've already had 5 hair cut. So, this time it is free!!
      </Alert>
            </div>
        </>
    );
}

export default Bonus;