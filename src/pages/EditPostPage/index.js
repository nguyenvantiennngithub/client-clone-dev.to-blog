import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/CreatePost";
import LoadingError from "../../components/LoadingError";
import { editPost, getPost } from "../../redux/actions";


function EditPostPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {slug} = useParams();

    useEffect(()=>{
        dispatch(getPost.getPostRequest(slug))
    }, [dispatch, slug]);


    const {data, isLoading, isLoaded, isError} = useSelector(state => state.getPost)

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
        //redirect to this post detail after create post success
        dispatch(editPost.editPostRequest({data, navigate: (url)=>navigate(url)}));
    }

    return (
        <LoadingError data={{isLoading, isLoaded, isError}}>
            <CreatePost 
                initialValues={initialValues} 
                onSubmit={submit} 
                isCreate={false}
                isLoading={isLoading}
            />
        </LoadingError>
    )
}


export default EditPostPage;

