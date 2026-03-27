import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
    const authStatus = useSelector(state => state.auth.status);

    if (authentication && !authStatus) {
        return <Navigate to="/login" />;
    }

    if (!authentication && authStatus) {
        return <Navigate to="/" />;
    }

    return children;
}