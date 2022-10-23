import { Route, Routes, useHref } from "react-router-dom";
import Home from "./views/Home/Home";
import "./styles/index.scss";
import Auth from "./views/Auth/Auth";
import BackArrow from "./components/BackArrow/BackArrow";
import Menu from "./views/Menu/Menu";
function App() {
    const url = useHref();

    return (
        <>
            {url === "/" ? null : <BackArrow />}
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Auth />} />
                <Route path="/menu" exact element={<Menu />} />
            </Routes>
        </>
    );
}

export default App;
