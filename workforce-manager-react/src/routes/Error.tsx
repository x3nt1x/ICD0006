import { useRouteError } from "react-router-dom";

const Error = () =>
{
    const error: any = useRouteError();

    return (
        <div id="error" className="text-center">
            <h1 className="display-4">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default Error;