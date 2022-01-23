import HeartPost from "../HeartPost";
import NewPost from "../NewPost";
import {typeNotification} from '../../../redux/constants/'
import CommentPost from "../CommentPost";

function Switch({data}){
    switch (data.notifi.type) {
        case typeNotification.newPost: return <NewPost data={data}></NewPost>   
        case typeNotification.heartPost: return <HeartPost data={data}></HeartPost>
        case typeNotification.commentPost: return <CommentPost data={data}></CommentPost>
        
        default:
            break;
    }
}
export default Switch;