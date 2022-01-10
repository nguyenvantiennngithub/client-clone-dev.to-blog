import '../LoadingError/LoadingError.scss'
function NotFound(){
    return (
        <div className="loadingError">
            <div className="loadingError__container">
                <h2>404 Not Found <a href="/">Home page</a></h2>
            </div>
        </div>
    )
}

export default NotFound