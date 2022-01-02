import { ErrorMessage } from "formik";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
function FileField(props){
    
    const { field, form , label, placeholder, onChange } = props
    const {name} = field;
    const {errors, touched} = form;
    const showErrors = errors[name] && touched[name];
    console.log(field)
    return (
        <FormGroup>
            { label && <Label for={name}>{label}</Label>}
            <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type="file"
                invalid={showErrors}
                onChange={onChange}
                accept="image/*"
            />
            <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
        </FormGroup>
    )
}
export default FileField;