import { Link } from "react-router-dom"
import parseHTML from 'html-react-parser';
import moment from "moment";
import Discussion from "../../../components/Discussion";
import { useEffect, useRef } from "react";


function Mid({post, author}){
    const commentEle = useRef();
    useEffect(()=>{
        if (window.location.href.includes('#comment')){
            window.scrollTo(0, commentEle.current.offsetTop);
        }
    }, [commentEle])
    return (
        <div className="postDetail__mid" >
            {post.cover && 
                <div className="postDetail__mid-cover">
                    <img 
                        src={post.cover} 
                        className="postDetail__mid-cover-img"
                        alt={"Cover image for" + post.title}    
                    />
                </div>
            }

            <div className="postDetail__mid-header">
                <div className="postDetail__mid-header-author">
                    <Link to={'/user/' + author.username} >
                        <div className="postDetail__mid-header-author-container">

                            <img 
                                className="postDetail__mid-header-author-img"
                                src={author.avatar} 
                                alt={'avatar of ' + author.displayName}    
                            />
                        </div>   
                    </Link>

                    <div className="postDetail__mid-header-author-container">
                        <Link to={'/user/' + author.username}  className="postDetail__mid-header-author-name">
                            <span>{author.displayName || author.username}</span>
                        </Link>
                        <span className="postDetail__mid-header-author-date">
                            {'Post on ' + moment(post.createdAt).format('ll') + ' (' + moment(post.createdAt).fromNow() + ')'}
                        </span>
                    </div>
                </div>

                <div className="postDetail__mid-header-title">
                    <h1 className="postDetail__mid-header-title-text">{post.title}</h1>
                </div>
                <div className="postDetail__mid-header-tags">
                    {post.tags.map((item, index)=>{
                        return (
                            <Link to={'/' + item} key={index} className="postDetail__mid-header-tags-item">
                                <span>#{item}</span>
                            </Link>
                        )
                    })}
                </div>

                <div className="postDetail__mid-content">
                    {parseHTML(post.content.html)}
                </div>
            </div>

            <hr/>
            <div id="comment" ref={commentEle}>
                <Discussion></Discussion>
            </div>
            
        </div>
    )
}

export default Mid;