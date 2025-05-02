import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {User} from "../../../types";
import {styled} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks.ts";
import {unsetUsers} from "../../../features/users/usersSlice.ts";
import {logout} from "../../../features/users/usersThunks.ts";
import {toast} from "react-toastify";

interface Props {
    user: User;
}

const StyledLink = styled(NavLink)({
    color: '#f8bbd0'
});

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUsers());
        toast.success("Logout successfully");
    }

    return (
        <Grid>
            Hello, {user.username}!
            <StyledLink  to='/posts/new'>  Add new post </StyledLink >
             or
            <StyledLink to='/' onClick={handleLogout}> Logout</StyledLink >
        </Grid>
    );
};

export default UserMenu;