
import { Formik, Form, FastField } from 'formik';
import { Alert, Button } from 'reactstrap';
import InputField from '../Field/InputField';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux'
import {loginUser$} from '../../redux/selectors/'
import {loginUser} from '../../redux/actions/'
import './Login.scss'

function Login (){

    let validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
      });

    const dispatch = useDispatch();
    //{message, token}
    const {message} = useSelector(loginUser$);
    console.log(message)
    
    return (
        <div>
            {message && <Alert color="danger">{message}</Alert>}

            <Formik
                initialValues={{ username: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(loginUser.loginUserRequest(values))
                }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <h3 className="login__header">Welcome back</h3>
                    <FastField
                        name="username"
                        component={InputField}
                        placeholder="Enter your username"
                        type="text"
                    />

                    <FastField
                        name="password"
                        component={InputField}
                        placeholder="Enter your password"
                        type="password"
                    />
                    <Button className="login__btnSubmit" block color="primary" type="submit" >Continue</Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Login