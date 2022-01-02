import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {Alert, Button, Container, Spinner } from 'reactstrap'
import { Formik } from 'formik';
import {useRef, useState} from 'react'
import * as yup from 'yup';
import {uploadImageBlog} from '../../api'
import './CreatePost.scss';
import 'react-markdown-editor-lite/lib/index.css';
import {useParams} from 'react-router-dom'
const mdParser = new MarkdownIt();

function CreatePost({initialValues, onSubmit, isCreate, isLoading}){
    const tagEle = useRef('');//old value of tags input
    const params = useParams();
    const [isUploading, setIsUploading] = useState(false);
    console.log("params", params)



    let validationSchema = yup.object().shape({
        title: yup.string().required(), //string required
        tags: yup.string().test('tags is valid', 'contains non-alphanumeric characters', (value)=>{
            var regex = /[^a-z A-Z 0-9 ,]+/g//check just number and letter
            return !regex.test(value);
        }).test('length of tags less than 4', 'tags: Max number of tag is 4', (values)=>{//check max length of tags is 4
            if (!values) return true;
            return values.split(',').filter(item => item.replace(/ /g, '') !== '').length <= 4
        }),
        html: yup.string(),
    });



    function uploadFile(file){
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async function(e){
                setIsUploading(true);
                const res = await uploadImageBlog({image: e.target.result, name: file.name})
                resolve(res.data.url);
                setIsUploading(false);
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
            </Alert>
        )
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
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
                                {isUploading &&  <Spinner color="danger" size="sm" style={{'marginRight': '16px'}}>Loading...</Spinner>}
                                    {values.cover.src ? 
                                    <div>
                                        <img
                                            className='createPost__header-img'
                                            src={values.cover.src}
                                            alt={values.cover.alt}
                                        />    
                                        <Button className='createPost__header-remove' color="danger" outline onClick={()=>handleRemoveCover(setFieldValue)}>Remove</Button>
                                        <input 
                                            className='createPost__header-file loaded' 
                                            accept='image/*' type='file' 
                                            onChange={(e)=>{
                                                handleUploadCoverImage(e, setFieldValue)
                                        }}/>
                                    </div>
                                    :
                                    <input 
                                        className='createPost__header-file' 
                                        accept='image/*' type='file' 
                                        onChange={(e)=>{
                                            handleUploadCoverImage(e, setFieldValue)
                                    }}/>
                                }
                                
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
                                        placeholder='Title...'
                                        defaultValue={values.title}
                                    >
                                        
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
                                        placeholder='Add up 4 tags...'
                                        defaultValue={values.tags}
                                    >
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
                                defaultValue={values.content.text}
                            />
                            <div className='createPost__footer'>
                                <Button color="primary" type="submit">
                                    {isCreate ? 'Create Post' : 'Edit Post'}
                                    {isLoading && <Spinner color="danger" size="sm" style={{'marginLeft': '16px'}}>Loading...</Spinner>}
                                </Button>
                                <Button color="danger" onClick={resetForm} type="reset">
                                    {isCreate ? 'Reset all content' : 'Revert new changes'}
                                </Button>
                            </div>
                        </div>
                    </Container>
                </form>
            )}
        </Formik>
    )
}

export default CreatePost;
