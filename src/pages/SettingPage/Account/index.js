
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import '../Profile/Profile.scss'
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../../components/Field/InputField';
import { Button, UncontrolledAlert } from 'reactstrap';
import { changePassword, resetMessage } from '../../../redux/actions';
import { useEffect } from 'react';

function Account(){

    const dispatch = useDispatch();
    const {message} = useSelector(state => state.loginUser);

    useEffect(()=>{
        return ()=>{
            if (message !== ''){
                dispatch(resetMessage());
            }
        }
    }, [message, dispatch])

    let validationSchema = yup.object().shape({
        currentPassword: yup.string().required(),
        newPassword: yup.string().required(),
        confirmPassword: yup.string().required()
            .test('passwords-match', 'Passwords must match', function(value){
                return this.parent.newPassword === value
            })
    });


    return (
        <div className="profile1">
             <Formik
                initialValues={{ currentPassword: '', newPassword: '', confirmPassword: ''}}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(changePassword.changePasswordRequest(values))
                }}
            >
            {() => (
                <Form>
                    { message && <UncontrolledAlert color="info">{message}</UncontrolledAlert>}

                    <h2>Set new password</h2>
                    <FastField
                        name="currentPassword"
                        component={InputField}
                        placeholder=""
                        type="password"
                        label="Current password: "
                    />

                    <FastField
                        name="newPassword"
                        component={InputField}
                        placeholder=""
                        type="password"
                        label="New password: "
                    />

                    <FastField
                        name="confirmPassword"
                        component={InputField}
                        placeholder=""
                        type="password"
                        label="Confirm new password: "
                    />

                    <Button color="primary" type="submit">
                        Set new password
                    </Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Account;