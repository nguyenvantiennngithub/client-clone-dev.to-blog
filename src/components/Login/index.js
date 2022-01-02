
import { Formik, Form, FastField } from 'formik';
import { Alert, Button, Spinner } from 'reactstrap';
import InputField from '../Field/InputField';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux'
import {loginUser$} from '../../redux/selectors/'
import {loginUser} from '../../redux/actions/'
import {useNavigate} from 'react-router-dom'
import './Login.scss'

function Login ({errorMessages}){
    let validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
      });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //{message, token}
    const {isError, message, isLoading} = useSelector(loginUser$);
    console.log(message)

    
    
    return (
        <div>
            {(message || errorMessages) && <Alert color="danger">{message || errorMessages}</Alert>}
            <Formik
                initialValues={{ username: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(loginUser.loginUserRequest({...values, navigate: url => navigate(url)}))
                }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <h3 className="login__header">Welcome back</h3>
                    {isError && <Alert color="danger">There are some problems</Alert>}
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
                    <Button className="login__btnSubmit" block color="primary" type="submit" >
                        Continue
                        {isLoading && <Spinner color="danger" size="sm" style={{'marginLeft': '16px'}}>Loading...</Spinner>}
                        
                    </Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Login