
import { Formik, Form, FastField } from 'formik';
import { Alert, Button, Spinner } from 'reactstrap';
import InputField from '../Field/InputField';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux'
import {registerUser$} from '../../redux/selectors/'
import * as yup from 'yup';
import * as actions from '../../redux/actions/'
import './Register.scss'

function Register (){
    let validationSchema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
      });

    const {message, isError, isLoading} = useSelector(registerUser$);
    const dispatch = useDispatch();
    
    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '', username: '' }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(actions.registerUser.registerUserRequest(values))
                }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <h3 className="register__header">
                        Create your account
                        
                        
                    </h3>
                    {isError && <Alert color="danger">There are some problems</Alert>}
                    {message && <Alert color="danger">{message}</Alert>}

                    <FastField
                        name="username"
                        component={InputField}
                        placeholder="Enter your username"
                        type="text"
                    />             
                    <FastField
                        name="email"
                        component={InputField}
                        placeholder="Enter your email"
                        type="email"
                    />

                    <FastField
                        name="password"
                        component={InputField}
                        placeholder="Enter your password"
                        type="password"
                    />
                    <Button className="register__btnSubmit" block color="primary" type="submit">
                        Create account
                        {isLoading && <Spinner color="danger" size="sm" style={{'marginLeft': '16px'}}>Loading...</Spinner>}
                    </Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Register