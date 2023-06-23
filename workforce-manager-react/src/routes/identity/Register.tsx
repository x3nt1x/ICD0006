import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../Root";
import { IRegisterData } from "../../domain/Identity/IRegisterData";
import { IdentityService } from "../../services/IdentityService";
import RegisterForm from "./RegisterForm";

const Register = () =>
{
    const navigate = useNavigate();

    const [values, setInput] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    } as IRegisterData);

    const identityService = new IdentityService();

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

        if (values.email.length === 0 ||
            values.firstName.length === 0 ||
            values.lastName.length === 0 ||
            values.password.length === 0 ||
            values.password !== values.confirmPassword)
        {
            setValidationErrors(["Bad input values!"]);
            return;
        }

        var jwtData = await identityService.register(values);

        if (jwtData === undefined)
        {
            setValidationErrors(["no jwt"]);
            return;
        }

        if (setJwtResponse)
        {
            setJwtResponse(jwtData);

            navigate("/");
        }
    }

    return (<RegisterForm values={values} validationErrors={validationErrors} handleChange={handleChange} onSubmit={onSubmit} />);
}

export default Register;