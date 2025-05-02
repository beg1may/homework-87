import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {ToastContainer} from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import Typography from "@mui/material/Typography";
import Post from "./features/posts/Post.tsx";
import NewPost from "./features/posts/NewPost.tsx";

function App() {

  return (
      <>
          <CssBaseline/>
          <ToastContainer/>
          <header>
              <AppToolbar/>
          </header>
          <main>
              <Container maxWidth="xl">
                  <Routes>
                      <Route path="/register" element={<Register />}/>
                      <Route path="/login" element={<Login />}/>
                      <Route path="/" element={<Post />}/>
                      <Route path="/posts" element={<Post />}/>
                      <Route path="/posts/new" element={<NewPost />}/>
                      <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                  </Routes>
              </Container>
          </main>
      </>
  )
}

export default App
