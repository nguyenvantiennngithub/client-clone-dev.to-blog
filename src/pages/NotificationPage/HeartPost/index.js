import './HeartPost.scss'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
function HeartPost({data}){
    const {user} = useSelector(state => state.loginUser)
    const {post, nearestHeartUser, notifi} = data;
    const isReaded = notifi.seen.includes(user.username);
    return (
        <div className={isReaded ? 'heartPost' : 'heartPost unread'}>
            <div className='heartPost__top'>
                <img
                    className='heartPost__top-img'
                    alt={"avatar of " + nearestHeartUser?.username}
                    src={nearestHeartUser?.avatar}
                />
            </div>
            <div className='heartPost__bottom'>
                <Link className='heartPost__bottom-bold' to={"/user/" + nearestHeartUser?.username}>
                    {nearestHeartUser?.displayName}  
                </Link>
                {
                    post.heart.length === 1 && " reacted to "
                }
                {
                    post.heart.length === 2 && ` and ${post.heart.length-1} order reacted to `
                }
                {
                    post.heart.length > 2 && ` and ${post.heart.length-1} orders reacted to `
                }
                <Link className='heartPost__bottom-bold' to={"/post/" + post.slug}>
                    {post.slug}
                </Link>
            </div>
        </div>
    )
}

export default HeartPost