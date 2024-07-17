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
  const [show,set_show] = useState<boolean>(false)
  return(
    <Formik
      initialValues={{
        search:''
      }}
      validatationScheme={searchSchema}
      onSubmit={()=>{
       

      }}
    >
      {()=>{
        return(
          <div className={`${styles.container} ${show?styles.container2:''}`}>
            <button className={show?styles.hideButton:''} onClick={()=>set_show(!show)}><SearchIcon /></button>
            <Form className={`${styles.formWrapper} ${show?styles.showForm:''}`}>
              <Field name="search" placeholder="search for anything" />
              <button>
                <SearchIcon />
              </button>    
              {show?<button onClick={()=>set_show(false)} type="button">
                  <CancelIcon />
              </button>:''} 
            </Form>
            {show ?
            <aside className={styles.resultWrapper}>

            </aside>:''}
          </div>          
        )
      }}

    </Formik>
    
  )
  
}

export default SearchForm