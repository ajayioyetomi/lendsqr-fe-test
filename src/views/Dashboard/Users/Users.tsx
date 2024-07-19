import { withTitle } from "../../../hoc";
import styles from './users.module.scss';
import activeIcon from '../../../assets/users/active-icon.png';
import userIcon from '../../../assets/users/user-icon.png';
import loanIcon  from '../../../assets/users/loan-icon.png';
import savingsIcon from '../../../assets/users/savings-icon.png';
import { useMemo, useState, useRef, useEffect } from "react";
import { MdFilterList as FilterIcon } from "react-icons/md";
import { BsThreeDotsVertical as MoreIcon } from "react-icons/bs";
import moment from "moment";


const Heading = ()=>{
  return <div className='heading'>Users</div>
}

const Users = () => {
  const users_list = useMemo(()=>[
    {
      id:1,
      organization:'LendSqr',
      username:'Adedeji',
      email:'ajayio@djeljro.com',
      phone_number:'08077474745',
      date_joined:new Date().toString(),
      status:'active',
    },
    {
      id:1,
      organization:'LendSqr',
      username:'Adedeji',
      email:'ajayio@djeljro.com',
      phone_number:'08077474745',
      date_joined:new Date().toString(),
      status:'inactive',
    }
  ],[]);
  return (
    <section className={styles.container}>
      <div className={styles.cardContainer}>
        <Card src={userIcon} title="users" value="2,543"/>
        <Card src={activeIcon} title="active users" value="2,543"/>
        <Card src={loanIcon} title="users with loans" value="12,543"/>
        <Card src={savingsIcon} title="usesrs with savings" value="102,543"/>        
      </div>
      <UserTable users={users_list} />
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

const UserTable = ({users}:any) =>{
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
          <div>
            {users.map((eUser:any) =>
            <div className={styles.row} key={eUser.id}>
              <div>{eUser.organization}</div>
              <div>{eUser.username}</div>
              <div>{eUser.email}</div>
              <div>{eUser.phone_number}</div>
              <div>{moment(eUser.date_joined).format('MMMM Do YYYY, h:mm:ss a')}</div>
              <div >
                <span className={styles[eUser.status]}>{eUser.status}</span>
              </div>
              <div className={styles.moreContainer}>
                <MoreIcon />
                <ul>
                  <li>Edit</li>
                </ul>

              </div>              
            </div>            
            )}
          </div>
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
  const parentRef = useRef<HTMLSpanElement | null>(null);
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
      <span ref={parentRef} onClick={handleClick}>{title} <FilterIcon /></span>
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