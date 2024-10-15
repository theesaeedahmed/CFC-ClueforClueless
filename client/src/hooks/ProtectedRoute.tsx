//import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './useAuth';

const ProtectRoute = ({children,redirect='/login'}:any) => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Navigate to={redirect}></Navigate>
    }
    return children ? children : <Outlet/>
 
};

export default ProtectRoute;