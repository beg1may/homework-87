import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {User} from "../../../types";
import {styled}  from "@mui/material";

interface Props {
    user: User;
}

const StyledLink = styled(NavLink)({
    color: '#f8bbd0'
});

const UserMenu: React.FC<Props> = ({user}) => {
    return (
        <Grid>
            Hello, {user.username}!
            <StyledLink  to='/posts/new'>  Add new post </StyledLink >
             or
            <StyledLink  to='/' > Logout</StyledLink >
        </Grid>
    );
};

export default UserMenu;