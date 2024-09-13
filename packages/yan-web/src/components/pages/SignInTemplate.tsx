import {Navigate, Outlet} from "react-router-dom";

export default function SignInTemplate() {
    // TODO: replace with actual logic to check if user is logged in
    const login = false;

    if(login) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <Outlet />
        </>
    );
}