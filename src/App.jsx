import {BrowserRouter, Routes, Route} from `react-router-dom`;
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/" element={<Profile />}/>
    <Route path="/" element={<SignIn />}/>
    <Route path="/" element={<SignUp />}/>
    <Route path="/" element={<About />}/>
  </Routes>
  </BrowserRouter>
}
