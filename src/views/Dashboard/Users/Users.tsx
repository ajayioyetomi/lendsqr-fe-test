import { withTitle } from "../../../hoc";
import styles from './users.module.scss';
import activeIcon from '../../../assets/users/active-icon.png';
import userIcon from '../../../assets/users/user-icon.png';
import loanIcon  from '../../../assets/users/loan-icon.png';
import savingsIcon from '../../../assets/users/savings-icon.png';
import { useMemo, useState, useRef, useEffect } from "react";
import { MdFilterList as FilterIcon } from "react-icons/md";


const Heading = ()=>{
  return <div className='heading'>Users</div>
}

const Users = () => {
  return (
    <section className={styles.container}>
      <div className={styles.cardContainer}>
        <Card src={userIcon} title="users" value="2,543"/>
        <Card src={activeIcon} title="active users" value="2,543"/>
        <Card src={loanIcon} title="users with loans" value="12,543"/>
        <Card src={savingsIcon} title="usesrs with savings" value="102,543"/>        
      </div>
      <UserTable />
    </section>
  )
}

const Card = ({src,title="",value=""}:{src:string,title:string,value:string}) =>{
  return(
    <div>
      <img width="40" height="auto" src={src} alt="img" />
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}

const UserTable = () =>{
    const filter_list = useMemo(()=>[
      'organization',
      'username',
      'email',
      'phone number',
      'date joined',
      'status'
    ],[])
    const [active,set_active] = useState<null | string>(null);
   
    return(
      <div className={styles.tableContainer}>
        <div>
          <div className={styles.row}>
              {filter_list.map((eFilter:string,ind) =>
              <Filter key={ind} menu={{active,set_active}} title={eFilter} />
              )}
              <div></div>
          </div>
          <div>Content</div>
        </div>
        <div>Pagination</div>

      </div>
    )
}

const Filter =({title,menu}:{title:string,menu:any})=>{
  const {active,set_active} = menu;
  const handleClick = ()=>{
      if(title === active){
        set_active(null);
        return;
      }
      set_active(title);
  }
  const parentRef = useRef<HTMLButtonElement | null>(null);
  const childRef = useRef<HTMLUListElement | null>(null);

  useEffect(()=>{
      const handleOutsideClick = (e:any)=>{
          if(parentRef && parentRef.current && childRef && childRef.current){
              const parentDimensions = parentRef.current.getBoundingClientRect();
              const childDimensions = childRef.current.getBoundingClientRect();
              if( e.clientX < childDimensions.left ||
                  e.clientX > parentDimensions.right ||
                  e.clientY < parentDimensions.top ||
                  e.clientY > childDimensions.bottom){
                      set_active(null);
              }   
          }
      }
      window.addEventListener('click',handleOutsideClick);

      return ()=> window.removeEventListener('click',handleOutsideClick);
  },[])
  return(
    <div className={styles.filter}>
      <button ref={parentRef} onClick={handleClick}>{title} <FilterIcon /></button>
      {title === active?<ul ref={childRef}>
        <li>
          <span>Organization</span>
          <select></select>
        </li>
        <li>
          <span>Username</span>
          <input placeholder="User" />
        </li>
        <li>
          <span>Email</span>
          <input type="email" placeholder="Email" />
        </li>
        <li>
          <span>Date</span>
          <input type="date" placeholder="Date"/>
        </li>
        <li>
          <span>Phone Number</span>
          <input placeholder="Phone Number" />
        </li>
        <li>
          <span>Status</span>
          <select></select>
        </li>

        <li>
          <button>Reset</button>
          <button>Filter</button>
        </li>
      </ul>:''}
    </div>
  )
}

export default withTitle(Users,Heading);