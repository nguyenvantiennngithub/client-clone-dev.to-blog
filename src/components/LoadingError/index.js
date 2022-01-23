import { Spinner } from "reactstrap";

import './LoadingError.scss'

function LoadingError({data, children}){
    const {isLoading, isLoaded, isError} = data;
    if (isLoading || !isLoaded){
        return (
            <div className="loadingError">
                <div className="loadingError__container">
                    <Spinner>loading...</Spinner>
                </div>
            </div>
        )
    }else if (isError){
        return (
            <div className="loadingError">
                <div className="loadingError__container">
                    <h2>404 Not Found <a href="/">Home page</a></h2>
                </div>
            </div>
        )
    }else {
        return children;
    }
}

export default LoadingError;