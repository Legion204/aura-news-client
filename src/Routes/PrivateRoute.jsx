import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';


const PrivateRoute = ({ children }) => {
    const { firebaseUser, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if (firebaseUser) {
        return children;
    }
    return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

PrivateRoute.propTypes={
    children:PropTypes.node
}

export default PrivateRoute;