import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Create, Home, Layout, Login, PageNotFound, User } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" pauseOnFocusLoss={true} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
