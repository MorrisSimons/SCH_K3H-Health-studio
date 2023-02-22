import { Routes, Route } from "react-router-dom";
import { Home }  from "./componets/Home";
import { About } from "./componets/About";
import NotFound from "./componets/NotFound";
const Views = () => {
    return (
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="About" element={<About />}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        
    </Routes>
    );
    
    };
export default Views;