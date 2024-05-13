import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { insertpost } from '../RTK/postslice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FormSchema } from "../ValidationSchema"
import Loading from '../Components/Loading';
import WithGaurd from '../WithGaurd';
function Add() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector(state => state.posts)
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            views: '',
        },
        validationSchema: FormSchema,
        onSubmit: values => {
            const number = Math.floor(Math.random() * 500);
            const id = String(number);
            const views = values.views;
            const Nviews = Number(views);
            const data = {
                id: id,
                title: values.title,
                views: Nviews,
                description: values.description
            };
            dispatch(insertpost(data))
                .unwrap()
                .then(() => {
                    navigate("/")
                })
                .catch(error => {
                    // console.log(error)
                })
        },
    });
    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        onChange={formik.handleChange} 
                        value={formik.values.title}
                        isInvalid={formik.touched.title && formik.errors.title}
                        isValid={formik.touched.title && !formik.errors.title} />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Views</Form.Label>
                    <Form.Control
                        type="number"
                        name="views"
                        onChange={formik.handleChange}
                        value={formik.values.views}
                        isInvalid={formik.touched.views && formik.errors.views}
                        isValid={formik.touched.views && !formik.errors.views} />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.views}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        name="description"
                        onChange={formik.handleChange} 
                        value={formik.values.description}
                        isInvalid={formik.touched.description && formik.errors.description}
                        isValid={formik.touched.description && !formik.errors.description} />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
                </Form.Group>

                < Loading loading={loading} error={error}>
                    <Button
                        variant="primary" className="d-flex ms-auto me-auto" type='submit'>
                        Submit
                    </Button>
                </Loading>
            </Form>
        </>
    )
}
export default WithGaurd(Add);