import {AppBar, Container, Toolbar, Typography, Box} from "@mui/material";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/users/usersSlice.ts";
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";
import { Link } from 'react-router-dom';

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar
            position="sticky"
            elevation={3}
            sx={{
                backgroundColor: "#ec407a",
                color: "#fff",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.5,
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                            variant="h5"
                            component={Link}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                color: "#fff",
                                fontWeight: "bold"
                            }}
                        >
                            Forum
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                        {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};


export default AppToolbar;