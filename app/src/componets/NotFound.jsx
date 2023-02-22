import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }, [navigate]);
    return (
        <div>
            <h1>404 Not Found!</h1>
            <p>Redirecting to home page...</p>
        </div>
    );
};

export default NotFound;