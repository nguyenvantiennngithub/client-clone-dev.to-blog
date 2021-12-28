import { BsBookmark, BsSuitHeart } from "react-icons/bs";
import { Button } from "reactstrap";
import {Link} from 'react-router-dom'
import moment from 'moment'
import { useDispatch } from "react-redux";
import { deletePost } from "../../../../redux/actions";
function Post({data}){
    const dispatch = useDispatch();
    function handleDeletePost(){
        dispatch(deletePost.deletePostRequest(data.slug));
    }

    return (
            <div className="dashboard__posts-item">
                
                <div className="dashboard__posts-item-left">
                    <Link to={'/post/'+data.slug} className="dashboard__posts-item-left-title">{data.title}</Link>
                    <div className="dashboard__posts-item-left-date">
                        <span className="dashboard__posts-item-left-date-created">
                            <strong>Created: </strong>
                            {moment(data.createdAt).format("MMM Do")}
                        </span>
                        <span className="dashboard__posts-item-left-date-created">
                            <strong>Updated: </strong>
                            {moment(data.updatedAt).format("MMM Do")}

                        </span>
                    </div>
                </div>

                <div className="dashboard__posts-item-mid">
                    <div className="dashboard__posts-item-mid-item">
                        <div className="dashboard__posts-item-mid-item-icon"><BsSuitHeart /></div>
                        {data.heart.length}
                    </div>
                    <div className="dashboard__posts-item-mid-item">
                    <div className="dashboard__posts-item-mid-item-icon"><BsBookmark /></div>
                        {data.bookmark.length}
                    </div>
                </div>

                <div className="dashboard__posts-item-right">
                    <Link to={'/post/' + data.slug + '/edit'} className="dashboard__posts-item-right-item">
                        <span>Edit</span>
                    </Link>
                    <div className="dashboard__posts-item-right-item">
                        <Button color="danger" onClick={handleDeletePost}>Delete</Button>
                    </div>
                </div>

            </div>
    )
}

export default Post;