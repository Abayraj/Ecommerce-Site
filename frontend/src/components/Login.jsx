import { t } from 'i18next'
import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginController from '../controllers/loginController';

const Login = () => {
    const { handleSubmit } = loginController();

    return (
        <div className="flex justify-center  flex-wrap text-slate-800">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="flex justify-center pt-12 md:justify-start md:pl-12">
                    <a href="#" className="text-2xl font-bold text-blue-600"> SimplyShop . </a>
                </div>
                <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                    <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your free account</p>
                    <p className="mt-6 text-center font-medium md:text-left">
                        "Welcome back! Let's continue your journey."

                    </p>

                    <p className='font-medium'>
                        Don't have an account? Sign up now to get started!
                        <Link
                            to={"/signup"}
                            className="text-blue-600 ml-2"
                        >
                            {t("signup")}
                        </Link>
                    </p>

                    <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2">
                        <img className="mr-2 h-5" src="public\images\Googlelogo.svg" alt /> Continue with Google
                    </button>

                    <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                        <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">Or use email instead</div>
                    </div>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            backendValidationError: ''
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),
                            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
                            backendValidationError: Yup.string() // Custom validation for backend error
                        })}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            try {
                                const errorMessage = await handleSubmit(values);
                                console.log(errorMessage)
                                if (errorMessage) {
                                    setFieldError('backendValidationError', errorMessage);
                                } else {
                                    setFieldError('backendValidationError', '');
                                    // Handle successful login
                                }
                            } catch (error) {
                                console.error(error);
                                // Handle other errors
                            } finally {
                                setSubmitting(false);
                            }

                        }}
                    >
                        {formikProps => (
                            <Form className="flex flex-col items-stretch pt-3 md:pt-8">
                                {console.log("Formik Values:", formikProps.values)}
                                <div className="flex flex-col pt-4">
                                    <Field type="email" id="email" name="email" className="w-full flex-shrink appearance-none border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
                                    <ErrorMessage name="email" component="div" className="text-red-500" />
                                </div>
                                <div className="mb-4 flex flex-col pt-4">
                                    <Field type="password" id="password" name="password" className="w-full flex-shrink appearance-none border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password (minimum 8 characters)" />
                                    <ErrorMessage name="password" component="div" className="text-red-500" />
                                    <ErrorMessage name="backendValidationError" component="div" className="text-red-500" />
                                </div>
                                <div className="block">
                                    <a className="underline" href="#">Terms and Conditions</a>
                                </div>
                                <button type="submit" className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32">Log in</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;
