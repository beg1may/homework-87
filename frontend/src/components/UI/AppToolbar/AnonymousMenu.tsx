import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
            <Button
                to="/register"
                component={Link}
                sx={{
                    color: "#fff",
                    fontWeight: 500,
                    textTransform: "none",
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
            >
                Sign Up
            </Button>

            <Button
                to="/login"
                component={Link}
                sx={{
                    color: "#fff",
                    fontWeight: 500,
                    textTransform: "none",
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
            >
                Sign In
            </Button>
        </>
    );
};

export default AnonymousMenu;
