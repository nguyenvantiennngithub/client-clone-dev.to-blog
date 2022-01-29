import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";


function ListPost(){

    var {posts} = useSelector(state => state.getPersonalPosts)
    console.log("LIST POST")
    var [order, setOrder] = useState(posts);
    useEffect(()=>{
        setOrder(posts)
    }, [posts])
    function handleOnChangeSelect(e){
        const type = e.target.value;
        setOrder([...sortByQuery(posts, type)]);
    }

    function sortByQuery(array, sort){
        if (sort === 'created-desc'){
            return array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }else if (sort === 'updated-desc'){
            return array.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }else if (sort === 'heart-desc'){
            return array.sort((a, b) => b.heart.length - a.heart.length);
        }else if (sort === 'bookmark-desc'){
            return array.sort((a, b) => b.bookmark.length - a.bookmark.length);
        }else{
            return array;
        }
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
                {order.map(item=> <Post key={item.slug} data={item}></Post>)}
            </div>
        </div>
    )
}

export default ListPost;