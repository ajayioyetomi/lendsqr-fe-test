import { useContext } from "react";
import { ProtectedContext } from "../context/ProtectedProvider";

const useAuth = () =>{
    return useContext(ProtectedContext);
}

export default useAuth;