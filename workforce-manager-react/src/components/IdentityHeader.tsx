import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JwtContext } from "../routes/Root";
import { IdentityService } from "../services/IdentityService";
import jwt_decode from "jwt-decode";

interface IUserInfoProps
{
    jwtObject: any;
}

const IdentityHeader = () =>
{
    const navigate = useNavigate();
    const identityService = new IdentityService();
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const UserInfo = (props: IUserInfoProps) =>
    {
        return (
            <>
                {props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}
            </>
        );
    }

    const logout = async () =>
    {
        if (!jwtResponse)
            return;

        const response = await identityService.logout(jwtResponse);

        if (response === undefined)
            return;

        if (setJwtResponse)
            setJwtResponse(null);

        navigate("/");
    }

    if (jwtResponse)
    {
        const jwtObject: any = jwt_decode(jwtResponse.jwt);

        return (
            <>
                <li className="nav-item">
                    <Link to="#" className="nav-link text-white">
                        <UserInfo jwtObject={jwtObject} />
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to="#" className="nav-link text-white"
                        onClick={(e) =>
                        {
                            e.preventDefault();
                            logout();
                        }}>
                        Logout
                    </Link>
                </li>
            </>
        );
    }

    return (
        <>
            <li className="nav-item">
                <Link to="register" className="nav-link text-white">Register</Link>
            </li>

            <li className="nav-item">
                <Link to="login" className="nav-link text-white">Login</Link>
            </li>
        </>
    );
}

export default IdentityHeader;