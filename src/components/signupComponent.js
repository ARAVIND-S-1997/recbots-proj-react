// react bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// other packages imports
import * as yup from 'yup';
import axios from 'axios';

// hooks imports
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

// other file imports
import { apiurl } from '../apiurl';

// validation schema
const formValidation = yup.object({
    name: yup
        .string()
        .required("First name should not be empty"),
    emailid: yup
        .string()
        .required("Email field should not be empty")
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email"),
    contactno: yup
        .string()
        .required("Contact number field should not be empty"),
    password: yup
        .string()
        .required("Password field should not be empty")
        .min(8, "Password should not be less than 8 characters")
        .max(12, "Password should not be more than 12 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password should have at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmpassword: yup
        .string()
        .required("Confirm password field should not be empty ")
        .oneOf([yup.ref("password"), null], "Password is not matching"),
        plan:yup
        .string()
        .required()
})

// signup component
export function Signup() {
    const history = useHistory();
    // formik functionality
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: { name: "", emailid: "", contactno: "", password: "", confirmpassword: "",plan:"Silver" },
        validationSchema: formValidation,
        onSubmit: (data) => signup(data)
    })

    // signup api request
    const signup = (values) => {
        try {
            axios({ url: `${apiurl}/signup`, method: "POST", data: values })
                .then((response) => {
                    if (response.status === 200) {
                        history.push("/");
                    }
                })
        }
        catch (errors) {
            console.log("Error is:", errors);
        }
    }

    return (
        <div className="signup-form-container">
            <Card classname="signup-form-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit} className="signup-form">
                        <Form.Group className="signup-firstname-part" controlId="formBasicText">

                            {/*name field */}
                            <Form.Label>Name</Form.Label>
                            <input
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstname}
                                type="text"
                                placeholder="Enter first name"
                            />
                            {errors.firstname && touched.firstname ? (<div>{errors.firstname}</div>) : null}
                        </Form.Group>

                        <Form.Group className="signup-emailid-part" controlId="formBasicEmail">

                            {/* email id field*/}
                            <Form.Label>Email id</Form.Label>
                            <input
                                name="emailid"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.emailid}
                                type="emailid"
                                placeholder=" Enter email id"
                            />
                            {errors.emailid && touched.emailid ? (<div>{errors.emailid}</div>) : null}
                        </Form.Group>

                        <Form.Group className="signup-emailid-part" controlId="formBasicNumber">

                            {/* email id field*/}
                            <Form.Label>Contact no</Form.Label>
                            <input
                                name="contactno"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contactno}
                                type="contactno"
                                placeholder=" Enter the contact number"
                            />
                            {errors.contactno && touched.contactno ? (<div>{errors.contactno}</div>) : null}
                        </Form.Group>
                        <Form.Group className="signup-password-part" controlId="formBasicPassword">

                            {/* password field */}
                            <Form.Label>Password</Form.Label>
                            <input
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                type="password"
                                placeholder=" Enter Password"
                            />
                            {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                        </Form.Group>
                        <Form.Group className="signup-confirmPassword-part" controlId="formBasicPassword">

                            {/* confirm password field */}
                            <Form.Label> Confirm Password</Form.Label>
                            <input
                                name="confirmpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                                type="password"
                                placeholder="Confirm Password"
                            />
                            {errors.confirmpassword && touched.confirmpassword ? (<div>{errors.confirmpassword}</div>) : null}
                        </Form.Group>
                        <Button className="signup-form-button" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>

    )
}