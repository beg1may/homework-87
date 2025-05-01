import {Button, styled} from "@mui/material";
import {NavLink} from "react-router-dom";

const StyledButton  = styled(Button)({
    color: "#fff",
    fontWeight: 500,
    textTransform: "none",
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});

const AnonymousMenu = () => {
    return (
        <>
            <StyledButton  component={NavLink} to='/register'>Sign Up</StyledButton >
            <StyledButton  component={NavLink} to='/login'>Sign In</StyledButton >
        </>
    );
};

export default AnonymousMenu;