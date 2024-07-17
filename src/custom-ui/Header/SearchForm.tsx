import styles from './searchForm.module.scss';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { MdOutlineSearch as SearchIcon } from "react-icons/md";
import { FaTimes as CancelIcon } from "react-icons/fa";
import * as Yup from 'yup';



const searchSchema = Yup.object().shape({
  search:Yup.string(),
})


const SearchForm = () => {
  return(
    <Formik
      initialValues={{
        search:''
      }}
      validatationScheme={searchSchema}
      onSubmit={(values)=>{

      }}
    >
      {()=>{
        return(
          <>
            <div className={styles.container}>
              <span><SearchIcon /></span>
              <Form className={styles.formWrapper}>
                <Field name="search" placeholder="search for anything" />
                <button>
                  <SearchIcon />
                </button>     
              </Form>
              <aside className={styles.resultWrapper}>

              </aside>
            </div>
            
          
          </>
          
        )
      }}

    </Formik>
    
  )
  
}

export default SearchForm