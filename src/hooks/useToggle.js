import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkItemInList } from "../helpers";


//there isn't any name for variable of useState 
//so that i will use heart as a template
//isUpdatePostInPosts is flag to check for update in postDetail or listPost
//heart [VanTien, Tien]
//VanTien

const useToggle = (username, list, isLoggedIn, action, secondData, typeUpdateReaction) => {
    const [isHeart, setIsHeart] = useState(false);
    // console.log('use toggle')
    const dispatch = useDispatch();
    
    useEffect(()=>{//handle for heart
        setIsHeart(checkItemInList(username, list))
    }, [list, username])
    
    function handleToggleHeart(){//handle onclick toggle heart

        if (!isLoggedIn){
            alert('you need login to do that')
            return;
        }
        setIsHeart(!isHeart);
        dispatch(action({isPush: !isHeart, ...secondData, typeUpdateReaction: typeUpdateReaction}))
    }

    return [isHeart, handleToggleHeart]
}

export default useToggle;