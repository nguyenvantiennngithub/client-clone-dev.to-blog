import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {Alert, Button, Container } from 'reactstrap'
import { Formik } from 'formik';
import {useRef} from 'react'
import {useDispatch} from 'react-redux'
import * as yup from 'yup';
import {uploadImageBlog} from '../../api/'
import {createPost} from '../../redux/actions/'
import { useNavigate } from 'react-router-dom';
import './CreatePost.scss';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();
function CreatePost(){
    const dispatch = useDispatch();
    let navigate = useNavigate();
    function uploadFile(file){
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async function(data){
                const res = await uploadImageBlog({image: data.target.result, name: file.name})
                resolve(res.data.url);
            };
        });
    }

    async function handleUploadImage(file){//upload at menubar in md-editor
        const type = file.type.split('/');
        if (type[0] !== 'image'){//check image
            alert('You must upload an image');
            return;
        }    
        return await uploadFile(file)
    }

    async function handleUploadCoverImage(e, callback){//upload cover of post
        const file = e.target.files[0];
        const src = await uploadFile(file);
       
        callback('cover', {src, name: file.name})
    }

    function handleRemoveCover(callback){
        callback('cover', {src: '', name: ''})
    }


    function handleResizeTextare(ele){
        ele.target.style.height = (ele.target.scrollHeight) + 'px';
    }


    const tagEle = useRef('');//old value of tags input
    function handleValidateTagsInput (ele){
        console.log(ele.nativeEvent.data)
        const input = ele.nativeEvent.data;//char input

        //tagEle is oldValue
        if (input === ','){
            ele.target.value = ele.target.value + ' ';
            tagEle.current = ele.target.value;
            return;
        }
        var regex = /[^a-z A-Z 0-9]+/g
        var isValid = !regex.test(input);
       
        if (!isValid){
            ele.target.value = tagEle.current;
        }else{
            tagEle.current = ele.target.value;
        }
    }

    function handleInputInValid(errors, touched){
        window.scrollTo(0, 0);
        var array = [];
        if (errors.title && touched.title) array.push(errors.title);
        if (errors.tags && touched.tags) array.push(errors.tags)
        
        if (array.length === 0) return;
        
        return (
            <Alert color="danger">
                <h5>Whoops, something went wrong:</h5>
                {array.map(item => <p key={item}>{item}</p>)}
            </Alert>)
    }


    let validationSchema = yup.object().shape({
        title: yup.string().required(), //string required
        tags: yup.string().test('tags is valid', '${path}: ${value} contains non-alphanumeric characters', (value)=>{
            var regex = /[^a-z A-Z 0-9 ,]+/g//check just number and letter
            return !regex.test(value);
        }).test('length of tags less than 4', 'tags: Max number of tag is 4', (values)=>{//check max length of tags is 4
            if (!values) return true;
            return values.split(',').filter(item => item.replace(/ /g, '') !== '').length <= 4
        }),
        html: yup.string(),
    });

    function submit(values){
        //convert tags from string to array
        var tags = values.tags.split(',').map(item => item.replace(/ /g, '')).filter(item => item !== '');
        const data = {
            content: values.content, 
            cover: values.cover.src, 
            title: values.title,
            tags: tags, 
        }
        dispatch(createPost.createPostRequest({data, navigate: (url)=>navigate(url)}));
    }
    const initialValues = { title: '', tags: '', content: {html: '', text: ''},  cover: {src: '', alt: ''} }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={validationSchema}>
            {({
                handleChange, handleSubmit, setFieldValue, resetForm,
                errors, touched, values
            }) => (
                <form onSubmit={handleSubmit}>
                    <Container>
                        <div className="createPost">
                            {handleInputInValid(errors, touched)}

                            <div className='createPost__header'>
                                {values.cover.src && 
                                    <>
                                        <img
                                            className='createPost__header-img'
                                            src={values.cover.src}
                                            alt={values.cover.alt}
                                        />    
                                        <Button className='createPost__header-remove' color="danger" outline onClick={()=>handleRemoveCover(setFieldValue)}>Remove</Button>
                                    </>
                                }
                                <input 
                                    className='createPost__header-file' 
                                    accept='image/*' type='file' 
                                    onChange={(e)=>{
                                        handleUploadCoverImage(e, setFieldValue)
                                    }}/>
                            </div>
                            <div className="createPost__header">
                                <div className='createPost__header-container'>
                                    <textarea 
                                        onChange={(target)=>{
                                            handleResizeTextare(target)
                                            handleChange(target);
                                        }} 
                                        type="text"
                                        name="title"
                                        className="createPost__header-textarea title" 
                                        placeholder='Title...'>
                                    </textarea>
                                </div>
                                <div className='createPost__header-container'>
                                    <textarea 
                                        onChange={(target)=>{
                                            handleValidateTagsInput(target);
                                            handleResizeTextare(target);
                                            handleChange(target);
                                        }} 
                                        type="text" 
                                        name="tags"
                                        className="createPost__header-textarea tags" 
                                        placeholder='Add up 4 tags...'>
                                    </textarea>
                                </div>
                            </div>
                            <MdEditor 
                                style={{ height: '500px' }} 
                                name="html"
                                renderHTML={text => mdParser.render(text)} 
                                onChange={(data)=>{
                                    setFieldValue('content', data);
                                }}
                                value={values.content.text}
                                onImageUpload={handleUploadImage}
                            />
                            <div className='createPost__footer'>
                                <Button color="primary" type="submit">Create Post</Button>
                                <Button color="danger" onClick={resetForm} type="reset">Reset all content</Button>
                            </div>

                        </div>
                    </Container>
                </form>
            )}
        </Formik>
    )
}

export default CreatePost;
