import * as Yup from 'yup';
export const FormSchema = Yup.object().shape({
    title: Yup.string()
        .min(10, 'Minimum is 10 characters!')
        .max(35, 'Maximum is 35 characters!')
        .required('Title is Required Field !'),
    description: Yup.string()
        .min(20, 'Minimum is 20 characters!')
        .max(200, 'Maximum is 200 characters!')
        .required('Description is Required Field !'),
    views: Yup.number("Must be a number type")
        .positive("Please enter positive number")
        .integer("Please enter Integer number")
        .required('Views is Required Field !'),
});