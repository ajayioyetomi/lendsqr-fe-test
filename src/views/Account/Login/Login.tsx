import styles from './login.module.scss';
import {Logo} from '../../../components';
import brand_image from '../../../assets/brand_image.svg';
import { NavLink,useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../hooks';

type ValueType = {
  Email:string,
  Password:string,
}

const loginSchema = Yup.object().shape({
  Email:Yup.string().required('Email is required'),
  Password:Yup.string().required('Password is required')
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
  const navigate = useNavigate();
  const {login} = useAuth();
  
  return (
    <main className={styles.container}>
        <div>
          <NavLink to="/login" className={styles.logo}><Logo height='30px' /></NavLink>
          <div className={styles.image_wrapper}>
            <img src={brand_image} />
          </div>
        </div>
        <div>
          <div>
            <div>
              <h1>Welcome!</h1>
              <p>Enter details to login</p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={(values)=>{
                console.log(values,'values')
                if(values.Email && values.Password){
                  login('Hello world')
                  navigate('/dashboard');
                  
                }
              }}
            
            >
              {({errors}:any)=>{
                return (<Form >
                <label>
                  <Field type="email" name="Email" placeholder="Email" validate={validateEmail} />
                </label>
                <div>{errors && errors.Email?errors.Email:''}</div>
                <label>
                  <Field type="password" name="Password" placeholder='Password' />
                </label>
                <div>{errors && errors.Password?errors.Password:''}</div>
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