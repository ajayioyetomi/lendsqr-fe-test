import { withTitle } from "../../../hoc";
import styles from './users.module.scss';
import activeIcon from '../../../assets/users/active-icon.png';
import userIcon from '../../../assets/users/user-icon.png';
import loanIcon  from '../../../assets/users/loan-icon.png';
import savingsIcon from '../../../assets/users/savings-icon.png';
import { useMemo, useState, useRef, useEffect } from "react";
import { MdFilterList as FilterIcon } from "react-icons/md";
import { BsThreeDotsVertical as MoreIcon } from "react-icons/bs";
import { FaRegEye as ViewIcon } from "react-icons/fa6";
import { SlUserUnfollow as BlacklistIcon, SlUserFollowing as ActivateIcon} from "react-icons/sl";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import api, { convertNumberToString } from "../../../utils";
import { Pagination,Loading } from "../../../components";
import { useNavigate } from "react-router-dom";



const Heading = ()=>{
  return <div className='heading'>Users</div>
}

const Users = () => {
  const {data:users,isLoading} = useQuery({
    queryKey:['all-users'],
    queryFn:async()=>{
      return await api().get(`templates/KCFe4dG8lb6U/data`);
    },
    select:(data:any)=>{
      return data;
    }
  })
  if(isLoading) return <Loading />
  return (
    <section className={styles.container}>
      <div className={styles.cardContainer}>
        <Card src={userIcon} title="users" value={convertNumberToString(users.length)}/>
        <Card src={activeIcon} title="active users" value={convertNumberToString(users.filter((eUser:any)=> eUser.status == 'active').length)}/>
        <Card src={loanIcon} title="users with loans" value={convertNumberToString(users.filter((eUser:any)=> eUser.education.loan > 0).length)}/>
        <Card src={savingsIcon} title="usesrs with savings" value={convertNumberToString(users.filter((eUser:any)=> eUser.savings > 0).length)}/>        
      </div>
      <UserTable users={users} />
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

const UserTable = ({users=[]}:any) =>{
    const filter_list = useMemo(()=>[
      'organization',
      'username',
      'email',
      'phone number',
      'date joined',
      'status'
    ],[])
    const [active,set_active] = useState<null | string>(null);
    const [currentItems,setCurrentItems] = useState<any>(users?.slice(0,10));
    const setClassName = (name:string)=>{
        let check = ['email','date joined','phone number'].find(e => e.includes(name));
        return check ?styles.remove:'';
    }
    useEffect(()=>{
      if(users && users.length > 0)
      setCurrentItems(users?.slice(0,10))
    },[users])
     
    return(
      <div className={styles.tableContainer}>
        <div>
          <div className={styles.row}>
              {filter_list.map((eFilter:string,ind) =>
              <Filter key={ind} className={setClassName(eFilter)} menu={{active,set_active}} title={eFilter} />
              )}
              <div></div>
          </div>
          <div>
            {currentItems?.map((eUser:any) =>
            <div className={styles.row} key={eUser.id}>
              <div>{eUser.organization}</div>
              <div>{eUser.fullname}</div>
              <div className={styles.remove}>{eUser.email}</div>
              <div className={styles.remove}>{eUser.phone_number}</div>
              <div className={styles.remove}>{moment(eUser.datejoined).format('MMMM Do YYYY, h:mm a')}</div>
              <div >
                <span className={styles[eUser.status || 'pending'] }>{eUser.status||'pending'}</span>
              </div>
              <More user={eUser} />           
            </div>            
            )}
          </div>
        </div>
        <Pagination items={users} onChange={setCurrentItems} />

      </div>
    )
}

const Filter =({title,menu,className}:{title:string,menu:any,className?:string})=>{
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
    <div className={`${styles.filter} ${className}`}>
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

const More = ({user}:{user:any}) =>{
  const [show,set_show] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();
  const handleViewDetails = (id:string)=>{
    navigate(`/user/${id}`)
  }
  
  useEffect(()=>{
    const handleOutsideClick = (e:any)=>{
        if(parentRef && parentRef.current && childRef && childRef.current){
            const parentDimensions = parentRef.current.getBoundingClientRect();
            const childDimensions = childRef.current.getBoundingClientRect();
            if( e.clientX < childDimensions.left ||
                e.clientX > parentDimensions.right ||
                e.clientY < parentDimensions.top ||
                e.clientY > childDimensions.bottom){
                    set_show(false);
            }   
        }
    }
    window.addEventListener('click',handleOutsideClick);

    return ()=> window.removeEventListener('click',handleOutsideClick);
  },[])
  return(
    <div ref={parentRef} className={styles.moreContainer}>
      <span  onClick={()=>set_show(!show)}><MoreIcon /></span>
      {show?<ul ref={childRef}>
        <li onClick={()=>handleViewDetails(user.id)}><ViewIcon /> View Details</li>
        <li><BlacklistIcon />Blacklist User</li>
        <li><ActivateIcon />Activate User</li>
      </ul>:''}
    </div> 
  )
}

export default withTitle(Users,Heading);