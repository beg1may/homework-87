import {PostMutation} from "../../../types";
import {Button, Grid, TextField } from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";
import {useState} from "react";

interface Props {
    onSubmitPost: (post: PostMutation) => void;
}

const initial = {
    title: '',
    description: '',
    image: null,
}

const PostForm: React.FC<Props> = ({onSubmitPost}) => {
    const [form, setForm] = useState<PostMutation>(initial);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitPost({...form});
        setForm(initial);
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onChangeInput}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="description"
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={onChangeInput}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button
                        style={{width: '100%'}}
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: '#ec407a',
                            borderRadius: 3,
                            '&:hover': {
                                backgroundColor: '#f06292',
                            },
                        }}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PostForm;