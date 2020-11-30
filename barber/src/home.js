import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button,
    Table
} from 'reactstrap';
import logo from './assests/logo.jpg';
import { Alert } from 'reactstrap';
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [times, setTimes] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken, deleteToken] = useCookies(["mr-token"]);
    const [p, setP, deleteP] = useCookies(["num"]);
    const [dashboardClicked, setDashboardClicked] = useState(false);
    const [congrats, setCongrats] = useState(false);
    const [warn, setWarn] = useState(false);
    const [uClick, setUClick] = useState(false);
    const [uList, setUList] = useState([]);
    const [lClick, setLClick] = useState(false);

    const logoutClicked = () => {
        deleteToken(["mr-token"]);
        setLClick(true);
    }

    const userClicked = () => {
        const phNum = p["num"]
        axios
            .post("/getUser", { Phone: phNum },)
            .then((response) => {
                console.log('all users')
                console.log(response)
                setUList(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        setUClick(true)
    }

    const onDashboardClicked = () => {
        setDashboardClicked(true)
    };

    useEffect(() => {
        if (!token["mr-token"]) window.location.href = "/";
        if (dashboardClicked && (p["num"] !== '000-000-0000')) {
            axios
                .post("/visited", {}, {
                    headers: { Authorization: `Bearer ${token["mr-token"]}` },
                })
                .then((response) => {
                    console.log('home')
                    console.log(response)
                    setName(response.data.updated_user.Name);
                    setPhone(response.data.updated_user.Phone);
                    setTimes(response.data.updated_user.Visited);
                    if (response.data.updated_user.Visited === 5) {
                        setCongrats(true)
                    }
                    if (response.data.updated_user.Visited === 0) {
                        setWarn(true)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token, dashboardClicked, lClick]);

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
                                <NavLink
                                    style={{ color: "green" }}
                                    href="#"
                                    onClick={onDashboardClicked}
                                >
                                    Dashboard
                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: "green" }} href="#">About and Contacts</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText style={{ color: "red" }} onClick={logoutClicked}>Logout</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
            {(p["num"] === '000-000-0000') ? (
                <div>
                    <Alert style={{ fontSize: '50px' }} color="primary">
                        WELCOME TO ADMIN PAGE
      </Alert>
                </div>) : (
                    <Alert style={{ fontSize: '50px' }} color="primary">
                        WELCOME TO USER <p>{name}</p>
                    </Alert>
                )}
            {(dashboardClicked && (p["num"] !== '000-000-0000')) ? (
                <div>
                    <h1>Name: {name}</h1>
                    <h1>Phone: {phone}</h1>
                    <h1>Visited times: {times}</h1>
                </div>
            ) : null}
            {congrats ? (
                <Alert style={{ fontSize: '50px' }} color="primary">
                    CONGRATULATION YOU HAVE 5 HAIR CUT. NEXT TIME ITS FREE!!
                </Alert>
            ) : null}
            {warn ? (
                <Alert style={{ fontSize: '50px' }} color="danger">
                    This is free hair cut. So, this time visited won't be counted.
                </Alert>
            ) : null}
            {(p["num"] === '000-000-0000') ? (
                <div>
                    <Button
                        style={{ color: "red", backgroundColor: "white" }}
                        onClick={userClicked}
                    >Get All Users</Button>
                    <div>
                        {uClick ? (
                            <Table
                                striped
                                style={{
                                    flex: 0.9,
                                    marginLeft: 20,
                                    marginTop: 2,
                                    border: "1px solid #C0C0C0",
                                    textAlign: "left",
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Phone</th>
                                        <th>Visited</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uList.map((d, index) => (
                                        <tr key={index}>
                                            <td>{d.Name}</td>
                                            <td>{d.Phone}</td>
                                            <td>{d.Visited}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Home;