import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
};

export default useAuth;