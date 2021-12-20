import { ErrorMessage } from "formik";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
function InputField(props){
    
    const { field, form , label, placeholder, type} = props
    const {name} = field;
    const {errors, touched} = form;
    const showErrors = errors[name] && touched[name];

    return (
        <FormGroup>
            { label && <Label for={name}>{label}</Label>}
            <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type={type}
                invalid={showErrors}
            />
            <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
        </FormGroup>
    )
}
export default InputField;