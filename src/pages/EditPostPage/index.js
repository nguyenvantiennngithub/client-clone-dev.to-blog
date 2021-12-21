import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import CreatePost from "../../components/CreatePost";
import { clearPostAuthor, editPost, getPost } from "../../redux/actions";


function EditPostPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {slug} = useParams();

    useEffect(()=>{
        dispatch(getPost.getPostRequest(slug))
        return ()=>{
            return dispatch(clearPostAuthor())
        }
    }, [dispatch, slug]);


    const {data, isLoading, isLoaded, isError} = useSelector(state => state.getPost)
    console.log(isLoading, !isLoaded)
    if (isLoading || !isLoaded) {
        return (
            <Spinner>
                Loading...
            </Spinner>
        )
    }
    const {post} = data;
    const initialValues = { 
        title: post.title, 
        tags: (Array.isArray(post.tags) ? post.tags.join(', ').toString() : ''), 
        content: {html: post.content.html, text: post.content.text},  
        cover: {src: post.cover, alt: 'Cover image of post'} 
    }
    
    function submit(values){
        //convert tags from string to array
        var tags = values.tags.split(',').map(item => item.replace(/ /g, '')).filter(item => item !== '');
        const data = {
            content: values.content, 
            cover: values.cover.src, 
            title: values.title,
            tags: tags, 
            slug: slug
        }
        console.log(data)
        //redirect to this post detail after create post success
        dispatch(editPost.editPostRequest({data, navigate: (url)=>navigate(url)}));
    }

    

    return (
        <CreatePost 
            initialValues={initialValues} 
            onSubmit={submit} 
            isCreate={false}
            isLoading={isLoading}
            isError={isError}
        />
    )
}


export default EditPostPage;

