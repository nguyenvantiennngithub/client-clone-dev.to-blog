import { FastField, Form, Formik } from 'formik';
import InputField from '../../../components/Field/InputField';
import * as yup from 'yup';
import {Button, UncontrolledAlert} from 'reactstrap';
import { uploadImageBlog } from '../../../api';
import FileField from '../../../components/Field/FileField';
import { useDispatch, useSelector } from 'react-redux';
import {resetMessage, updateInfoUser} from '../../../redux/actions';
import {useEffect, useState} from 'react';

import './Profile.scss'

function Profile(){

    const dispatch = useDispatch();
    var [isUploading, setIsUploading] = useState(false);
    const {user, message} = useSelector(state => state.loginUser);
    
    useEffect(()=>{
        return ()=>{
            if (message !== ''){
                dispatch(resetMessage());
            }
        }
    }, [message, dispatch])

    const initialValues = { 
        displayName: user.displayName, 
        email: user.email, 
        bio: user.bio, 
        image: user.avatar, 
        file: ''
    }


    let validationSchema = yup.object().shape({
        displayName: yup.string().required(),
        email: yup.string().required().email(),
        bio: yup.string().required(),
    });

    function uploadFile(file){
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = async function(e){
                const res = await uploadImageBlog({image: e.target.result, name: file.name})
                return resolve(res.data.url);
            };
            if(file){
                reader.readAsDataURL(file);
            }
        });
    }
    async function handleUploadAvatar(e, callback){//upload cover of post
        const file = e.target.files[0];
        const src = await uploadFile(file);
        callback('image', src)
        return src;
    }

    return (
        <div className="profile1">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(updateInfoUser.updateInfoUserRequest(values))
                }}
            >
            {({ setFieldValue, handleChange }) => (
                <Form>
                    { message && <UncontrolledAlert color="info">{message}</UncontrolledAlert>}
                    <h2>User</h2>
                    <FastField
                        name="displayName"
                        component={InputField}
                        placeholder="Enter your display name"
                        type="text"
                        label="Display name: "
                    />

                    <FastField
                        name="email"
                        component={InputField}
                        placeholder="Enter your email"
                        type="email"
                        label="Email: "
                    />

                    <FastField
                        name="bio"
                        component={InputField}
                        placeholder="Enter your bio"
                        type="text"
                        label="Bio: "
                    />

                    <FastField
                        name="file"
                        component={FileField}
                        placeholder="Enter your image"
                        label="image: "
                        onChange={async (event) => {
                            setIsUploading(true);
                            handleChange(event);
                            await handleUploadAvatar(event, setFieldValue)
                            setIsUploading(false);
                        }}
                    />
                    <Button block color="primary" type="submit" disabled={isUploading}>
                        {isUploading ? "wait a moment" : "Save changes"}
                    </Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Profile;