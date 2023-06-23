import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILoginData } from "../../domain/Identity/ILoginData";
import { IdentityService } from "../../services/IdentityService";
import { JwtContext } from "../Root";
import LoginFormView from "./LoginForm";

const Login = () =>
{
    const navigate = useNavigate();

    const identityService = new IdentityService();

    const [values, setInput] = useState({
        email: "",
        password: ""
    } as ILoginData);

    const { setJwtResponse } = useContext(JwtContext);
    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement) =>
    {
        setInput({ ...values, [target.name]: target.value });
    }

    const onSubmit = async (event: MouseEvent) =>
    {
        event.preventDefault();
        setValidationErrors([]);

        if (values.email.length === 0)
        {
            setValidationErrors(["email too short"]);
            return;
        }

        if (values.password.length === 0)
        {
            setValidationErrors(["Password too short"]);
            return;
        }

        var jwtData = await identityService.login(values);

        if (jwtData === undefined)
        {
            setValidationErrors(["Failed getting JWT"]);
            return;
        }

        if (setJwtResponse)
        {
            setJwtResponse(jwtData);

            navigate("/");
        }
    }

    return (<LoginFormView values={values} validationErrors={validationErrors} handleChange={handleChange} onSubmit={onSubmit} />);
}

export default Login;