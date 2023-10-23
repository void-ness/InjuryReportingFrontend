import React from "react";
import { Box, Header as GrmHeader } from 'grommet';
import { NavLink } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";
import "./style.css";

const Header = () => {
    const user = localStorage.getItem(AUTH_TOKEN);

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