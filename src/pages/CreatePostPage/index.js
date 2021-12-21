import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreatePost from "../../components/CreatePost";
import { createPost } from "../../redux/actions";


function CreatePostPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = { title: '', tags: '', content: {html: '', text: ''},  cover: {src: '', alt: ''} }
    const {isLoading, isError} = useSelector(state => state.createPost)
    
    function submit(values){
        //convert tags from string to array
        var tags = values.tags.split(',').map(item => item.replace(/ /g, '')).filter(item => item !== '');
        const data = {
            content: values.content, 
            cover: values.cover.src, 
            title: values.title,
            tags: tags, 
        }
        //redirect to this post detail after create post success
        dispatch(createPost.createPostRequest({data, navigate: (url)=>navigate(url)}));
    }
    return (
        <CreatePost 
            initialValues={initialValues} 
            onSubmit={submit} 
            isCreate={true} 
            isLoading={isLoading} 
            isError={isError}
        />
    )
    
}


export default CreatePostPage;

