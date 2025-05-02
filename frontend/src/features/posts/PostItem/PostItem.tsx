import {Box, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../../globalConstants.ts";
import MessageIcon from '@mui/icons-material/Message';

interface Props {
    id: string;
    username: {
        _id: string;
        username: string;
    }
    title: string;
    image: string | undefined;
    datetime: string;
}

const PostItem: React.FC<Props> = ({id, username, title, image, datetime}) => {
    return (
        <Grid size={12}>
            <Card sx={{ display: 'flex' }}>
                <Grid
                    sx={{
                        width: 200,
                        height: 120,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                        flexShrink: 0,
                    }}
                >
                    {image ? (
                        <CardMedia
                            component="img"
                            image={apiUrl + '/' + image}
                            alt={title}
                            sx={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    ) : (
                        <MessageIcon
                            sx={{
                                width: '60%',
                                height: '60%',
                                color: '#9e9e9e',
                                fontSize: 'unset',
                            }}
                        />
                    )}
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="subtitle1" component="div">
                            {dayjs(datetime).format('YYYY-MM.DD HH:mm')} by {username.username}
                        </Typography>
                        <Typography
                            component={Link}
                            to={'/posts/' + id}
                            variant="h5"
                            sx={{
                                color: 'text.secondary',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                display: 'block',
                                width: '50%',
                            }}
                        >
                            {title}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    );
};

export default PostItem;