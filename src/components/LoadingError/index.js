import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";

import './LoadingError.scss'

function LoadingError({data, children}){
    const {isLoading, isLoaded, isError} = data;
    console.log("Loading Error", {...data})
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
                <h2>There are some error, return <Link to="/">Home page</Link></h2>
                </div>
            </div>
        )
    }else {
        return children;
    }
}

export default LoadingError;