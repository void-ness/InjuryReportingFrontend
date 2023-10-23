import React, { useEffect, useState } from "react";
import { Box, Header as GrmHeader } from 'grommet';
import { NavLink, useLocation } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";
import "./style.css";

const Header = () => {
    const [user, setUser] = useState(localStorage.getItem(AUTH_TOKEN));
    const location = useLocation();

    useEffect(() => {
        setUser(localStorage.getItem(AUTH_TOKEN));
    }, [location])

    return (
        <GrmHeader background={"brand"} pad={"medium"}>
            <Box direction="row">
                <NavLink className={({ isActive }) => isActive ? "navlink text-bold" : "navlink"} to={"/"}>Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? "navlink text-bold" : "navlink"} to={"/search"}>Search</NavLink>
                {user && (
                    <NavLink className={({ isActive }) => isActive ? "navlink text-bold" : "navlink"} to={"/create"}>Create</NavLink>
                )}
            </Box>

            <Box>
                <NavLink
                    to={"/login"}
                    className={({ isActive }) => isActive ? "navlink text-bold" : "navlink"}
                    onClick={() => {
                        if (user) {
                            localStorage.removeItem(AUTH_TOKEN);
                        }
                    }}
                >{user ? "Logout" : "Login"}</NavLink>
            </Box>
        </GrmHeader>
    );
};

export default Header;