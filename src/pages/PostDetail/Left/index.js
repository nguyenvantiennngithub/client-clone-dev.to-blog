import { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill, BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { checkItemInList } from "../../../helpers";
import { bookmark, heartPost } from "../../../redux/actions";

function Left({post, author}){

    const [isHeart, setIsHeart] = useState(checkItemInList(author.username, post.heart));
    const [isBookmark, setIsBookmark] = useState(checkItemInList(post.slug, author.bookmark));
    const dispatch = useDispatch();

    useEffect(()=>{//handle for heart
        setIsHeart(checkItemInList(author.username, post.heart))
    }, [post.heart, author.username])

    useEffect(()=>{//handle for bookmark
        setIsBookmark(checkItemInList(post.slug, author.bookmark))
    }, [post.slug, author.bookmark])

    function handleToggleHeart(){//handle onclick toggle heart
        dispatch(heartPost.heartPostRequest({isHeart: !isHeart, slug: post.slug}))//true is Heart and false is unheart
        setIsHeart(!isHeart);
    }

    function handleToggleBookmark(){//handle onclick toggle heart
        dispatch(bookmark.bookmarkRequest({isBookmark: !isBookmark, slug: post.slug}))//true is Heart and false is unheart
        setIsBookmark(!isBookmark);
    }


    return (
        <div className="postDetail__left-fixed">
            <div className="postDetail__left">
                <div className="postDetail__left-container">
                    {
                        (isHeart) ? 
                            <BsFillSuitHeartFill onClick={handleToggleHeart} className="postDetail__left-item heart"/>
                        : 
                            <BsSuitHeart onClick={handleToggleHeart} className="postDetail__left-item"/> 
                    }
                    <span>{post.heart.length}</span>
                </div>
                <div className="postDetail__left-container">
                    {
                        (isBookmark) ?
                            <BsBookmarkFill onClick={handleToggleBookmark} className="postDetail__left-item bookmark"/>
                        :
                            <BsBookmark onClick={handleToggleBookmark} className="postDetail__left-item"/>
                    }
                    <span>{post.bookmark.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Left;