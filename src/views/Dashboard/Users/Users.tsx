import { withTitle } from "../../../hoc";
import styles from './users.module.scss';
import activeIcon from '../../../assets/users/active-icon.png';
import userIcon from '../../../assets/users/user-icon.png';
import loanIcon  from '../../../assets/users/loan-icon.png';
import savingsIcon from '../../../assets/users/savings-icon.png';
import { useMemo, useState, useRef, useEffect } from "react";
import { MdFilterList as FilterSortIcon } from "react-icons/md";
import { BsThreeDotsVertical as MoreIcon } from "react-icons/bs";
import { FaRegEye as ViewIcon } from "react-icons/fa6";
import { SlUserUnfollow as BlacklistIcon, SlUserFollowing as ActivateIcon} from "react-icons/sl";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import api, { convertNumberToString } from "../../../utils";
import { Pagination,Loading} from "../../../components";
import { useNavigate } from "react-router-dom";
import { TbFilterCog as FilterIcon } from "react-icons/tb";



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
    const [sorted_users,set_sorted_users] = useState(users);
    const filter_list = useMemo(()=>[
      'organization',
      'username',
      'email',
      'phone number',
      'date joined',
      'status'
    ],[])
    const [currentItems,setCurrentItems] = useState<any>(sorted_users?.slice(0,10));
    const setClassName = (name:string)=>{
        let check = ['email','date joined','phone number'].find(e => e.includes(name));
        return check ?styles.remove:'';
    }
    const organizations = useMemo(()=>{
      let result:string[] = [];
      users.forEach((eUser:any)=>{
        if(result.indexOf(eUser.organization) == -1)result.push(eUser.organization);
      })
      return result;
    },[])

    const handleFilter = (arg:any)=>{
      let result = sorted_users;
      if(arg.organization) result = result.filter((eUser:any) => eUser.organization.includes(arg.organization))
      if(arg.fullname) result = result.filter((eUser:any) => eUser.fullname.includes(arg.fullname))
      if(arg.email) result = result.filter((eUser:any) => eUser.email.includes(arg.email))
      if(arg.phone_number) result = result.filter((eUser:any) => eUser.phone_number.includes(arg.phone_number))
      if(arg.status) result = result.filter((eUser:any) => eUser.status.includes(arg.status))

      set_sorted_users(result);
    }
    const handleResetFilter = ()=>{
      set_sorted_users(users)
    }

    useEffect(()=>{
      if(users && users.length > 0){
        set_sorted_users(users)
      }
    },[users])
    useEffect(()=>{
      if(sorted_users && sorted_users.length > 0)
      setCurrentItems(sorted_users?.slice(0,10))
    },[sorted_users])
     
    return(
      <div className={styles.tableContainer}>
        <div>
          <div>
            <Filter organizations={organizations} onChangeFilter={handleFilter} onChangeReset={handleResetFilter} />
            <div className={styles.row}>
              {filter_list.map((eFilter:string,ind) =>
              <FilterSort items={users} key={ind} className={setClassName(eFilter)} onChange={set_sorted_users} title={eFilter} />
              )}
              <div></div>
            </div>
          </div>
          
          <div>
            {currentItems?.map((eUser:any) =>
            <div className={styles.row} key={eUser.id}>
              <div>{eUser.organization}</div>
              <div>{eUser.fullname}</div>
              <div className={styles.remove}>{eUser.email}</div>
              <div className={styles.remove}>{eUser.phone_number}</div>
              <div className={styles.remove}>{moment(eUser.date_joined).format('MMMM Do YYYY, h:mm a')}</div>
              <div >
                <span className={styles[eUser.status || 'pending'] }>{eUser.status||'pending'}</span>
              </div>
              <More user={eUser} />           
            </div>            
            )}
          </div>
        </div>
        <Pagination items={sorted_users} onChange={setCurrentItems} />

      </div>
    )
}

const FilterSort =({title,onChange,items,className}:{className?:string,title:string,onChange:Function,items:any[]})=>{
  const [mode,set_mode] = useState<number>(0);
  const handleClick = ()=>{
      let key = title?.split(' ').join('_');
      if(key === 'username')key = 'fullname'
      if(mode === 0) set_mode(1);
      else set_mode(0);
      let newData = items?.sort((a:any,b:any) => {
        if(!mode){
          if(a[key].toString().toLowerCase()<b[key].toString().toLowerCase()) return -1;
          if(b[key].toString().toLowerCase()>a[key].toString().toLowerCase()) return 1;
          return 0;
        }
        if(a[key].toString().toLowerCase()<b[key].toString().toLowerCase()) return 1;
        if(b[key].toString().toLowerCase()>a[key].toString().toLowerCase()) return -1;
        return 0;
        
      })
      onChange([...newData]);        
  }
 
  return(
    <div className={`${styles.filterSort} ${className}`}>
      <span onClick={handleClick}>{title} <FilterSortIcon /></span>
    </div>
  )
}


const Filter =({organizations,onChangeFilter,onChangeReset}:any)=>{
  const [show,set_show] = useState<boolean>(false);
  const empty = useMemo(()=>({
    organization:'',
    fullname:'',
    email:'',
    phone_number:'',
    date_joined:'',
    status:''
  }),[])
  const [data,set_data] = useState<{[index:string]:string}>(empty);
  const handleData = (key:string,value:string)=>{
      set_data({...data,[key]:value});
  }
  const parentRef = useRef<HTMLSpanElement | null>(null);
  const childRef = useRef<HTMLUListElement | null>(null);

  useEffect(()=>{
      const handleOutsideClick = (e:any)=>{
          if(parentRef && parentRef.current && childRef && childRef.current){
              const parentDimensions = parentRef.current.getBoundingClientRect();
              const childDimensions = childRef.current.getBoundingClientRect();
              if( e.clientX < parentDimensions.left ||
                  e.clientX > childDimensions.right ||
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
    <div className={styles.filter}>
      <span ref={parentRef} onClick={()=>set_show(!show)}>Filter <FilterIcon /></span>
      {show?<ul ref={childRef}>
        <li>
          <span>Organization</span>
          <select value={data.organization} onChange={(e:any)=>handleData('organization',e.target.value)}>
            <option value="">Select Organization</option>
            {organizations?.map((eOrg:any) => <option key={eOrg} value={eOrg}>{eOrg}</option>)}
          </select>
        </li>
        <li>
          <span>Username</span>
          <input value={data['fullname']} onChange={(e:any)=>handleData('fullname',e.target.value)} placeholder="User" />
        </li>
        <li>
          <span>Email</span>
          <input value={data['email']} onChange={(e:any)=>handleData('fullname',e.target.value)} type="email" placeholder="Email" />
        </li>
        <li>
          <span>Date</span>
          <input value={data['date_joined']} onChange={(e:any)=>handleData('date_joined',e.target.value)} type="date" placeholder="Date"/>
        </li>
        <li>
          <span>Phone Number</span>
          <input value={data['phone_number']} onChange={(e:any)=>handleData('phone_number',e.target.value)} placeholder="Phone Number" />
        </li>
        <li>
          <span>Status</span>
          <select value={data['status']} onChange={(e:any)=>handleData('status',e.target.value)}>
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pendeing">Pending</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </li>

        <li>
          <button onClick={()=>{onChangeReset(),set_data(empty)}}>Reset</button>
          <button onClick={()=>onChangeFilter(data)}>Filter</button>
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