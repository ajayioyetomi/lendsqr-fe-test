'--jsx';
import styles from './login.module.scss';
import brand_image from '../../../assets/brand_image.svg';
import logo from '../../../assets/logo.svg';
import { NavLink,useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../hooks';
import { useEffect, useState } from 'react';

type ValueType = {
  Email:string,
  Password:string,
}

const loginSchema = Yup.object().shape({
  Email:Yup.string().required('Email is required'),
  Password:Yup.string().required('Password is required')
  .min(8,'Too short')
})

const validateEmail = (value:string) =>{
  let error = '';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;

}

const Login = () => {
  const initialValues:ValueType = {Email:'',Password:'' };
  const [type,set_type] = useState('password');
  const handleType = ()=>{
      if(type === 'text'){
        set_type('password');
        return;
      }
      set_type('text');

  }
  const navigate = useNavigate();
  const {login,isAuthenticated} = useAuth();

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login');
      return;
    }
    login('hello world');
    navigate('/dashboard');
  },[])
  
  return (
    <main id="main" data-testid="test-login-main" className={styles.container}>
        <div>
          <NavLink to="/login" className={styles.logo}>
            <img src={logo} height='30px' />
          </NavLink>
          <div className={styles.image_wrapper}>
            <img src={brand_image} />
          </div>
        </div>
        <div>
          <div>
            <div>
              <h1 data-testid="test-header">Welcome!</h1>
              <p>Enter details to login</p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={(values)=>{
                if(values.Email && values.Password){
                  login('Hello world')
                  navigate('/dashboard');
                }
              }}
            
            >
              {({errors}:any)=>{
                return (<Form >
                <label >
                  <Field data-testid="test-email-field" type="email" name="Email" placeholder="Email" validate={validateEmail} />
                </label>
                <div data-testid="test-email-error">{errors?.Email||''}</div>
                <label>
                  <Field data-testid="test-password-field" type={type} name="Password" placeholder='Password' />
                  <span onClick={handleType}>{type === 'text'?'hide':'show'}</span>
                </label>
                <div data-testid="test-password-error">{errors?.Password||''}</div>
                <NavLink to="/forgot-password">Forgot Fassword?</NavLink>
                <button type='submit'>LOG IN </button>
              </Form>
              )}}
              
            </Formik>
          </div>
          
        </div>
    </main>
  )
}

export default Login