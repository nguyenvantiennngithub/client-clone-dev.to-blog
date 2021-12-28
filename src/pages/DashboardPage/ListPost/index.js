import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import Post from "./Post";


function ListPost(){

    function handleOnChangeSelect(e){
        // const type = e.target.value;
    }

    const {posts, isLoading, isLoaded, isError} = useSelector(state => state.getPersonalPosts)


    if (isLoading || !isLoaded){
        return (
            <Spinner>
                Loading...
            </Spinner>
        )
    }else if (isError){
        return <p>There are some problems</p>
    }
    return (
        <div className="dashboard__content">
            <div className="dashboard__content-header">
                <span className="dashboard__content-header-title">Posts</span>
                <select className="dashboard__content-header-select" onChange={handleOnChangeSelect}>
                    <option className="dashboard__content-option" value='created-desc'>Recerently Created</option>
                    <option className="dashboard__content-option" value='updated-desc'>Recerently Updated</option>
                    <option className="dashboard__content-option" value='heart-desc'>Most hearts</option>
                    <option className="dashboard__content-option" value='bookmark-desc'>Most bookmarks</option>
                </select>
            </div>
            <div className="dashboard__posts">
                {posts.map(item=> <Post key={item.slug} data={item}></Post>)}
            </div>
        </div>
    )
}

export default ListPost;