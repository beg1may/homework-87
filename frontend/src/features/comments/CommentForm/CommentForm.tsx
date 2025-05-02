import {Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {CommentMutation} from "../../../types";

interface Props {
    onSubmitComment: (comment: CommentMutation) => void;
    post_id: string;

}

const CommentForm: React.FC<Props> = ({onSubmitComment, post_id}) => {
    const [form, setForm] = useState<CommentMutation>({
        description: "",
        post: post_id,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitComment({...form});

        setForm({
            description: "" ,
            post: post_id,
        });
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{xs: 12}}>
                    <TextField
                        style={{
                            width: '100%',
                            marginTop: '30px'
                    }}
                        id="description"
                        label="Description"
                        name="description"
                        required
                        value={form.description}
                        onChange={onChangeInput}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <Button
                        style={{width: '100%'}}
                        type="submit"
                        variant="contained"
                        sx={{
                            mb: 2,
                            mt: 2,
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

export default CommentForm;