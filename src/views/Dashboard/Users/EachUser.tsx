import { NavLink, useParams } from 'react-router-dom';
import { withTitle } from '../../../hoc';
import { HiOutlineArrowNarrowLeft as BackIcon } from "react-icons/hi";
import { Button } from '../../../components';
import styles from './each-user.module.scss';
import { useState,useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api, { convertNumberToString } from '../../../utils';
import { AiOutlineUser as UserIcon } from "react-icons/ai";
import { FaRegStar as EmptyStar, FaStar as FillStar } from "react-icons/fa";

const Title = ()=>{
    return <NavLink to="/users" className={styles.back}>
        <span><BackIcon/></span>
        Back to Users
    </NavLink>
}

const EachUser = () => {
  const {id} = useParams();
  const [active,set_active] = useState<string>('general details');
  const sub_links:string[] =  useMemo(()=> [
      'general details',
      'documents',
      'bank details',
      'loans',
      'savings',
      'app and system',
    ],[]);

  const {data:user,} = useQuery({
    queryKey:['all-users'],
    queryFn:async()=>{
      return await api().get(`templates/KCFe4dG8lb6U/data`);
    },
    select:(data:any)=>{
      return data.find((eUser:{[index:string]:any}) => eUser.id === id);
    }
  })

  const views:{[index:string]:React.ReactNode}= {
    'general details':<General user={user||{}} />,
    'documents':<ComingSoon />,
    'bank details':<ComingSoon />,
    'loans':<ComingSoon />,
    'savings':<ComingSoon />,
    'app and system':<ComingSoon />
  }
  
    
  return (
    <div className={styles.container}>
      <div>
        <span>User Details</span>
        <Button outline='1' color='var(--blacklisted)' border="var(--blacklisted)">blacklist user</Button>
        <Button outline='1' color="var(--primary_color_2)" border="var(--primary_color_2)">activate user</Button>
      </div>
      <div>
        <div className={styles.headContainer}>
          <div>
            <div>
              {user.image ? <img src={user.image} />:<span><UserIcon /></span>}
            </div>
            <div>
              <div>{user.fullname}</div>
              <div>{user.id.slice(0,10)}</div>
            </div>
            <div>
              <div>User's Tier</div>
              <div><FillStar /><EmptyStar/><EmptyStar /></div>
            </div>
            <div>
              <div># {convertNumberToString(user.savings|| 0)}.00</div>
              <div>874747484/ Providus Bank</div>
            </div>
          </div>
          <div >
            {sub_links.map((eLink:any) =>
               <Button key={eLink} style={{borderRadius:'0',border:'none',
                borderBottom:'1px solid white',fontFamily:'var(--mediumFont)',
                textTransform:'capitalize',color:active === eLink?'var(--primary_text_3':'var(--primary_text_1)',
                borderBottomColor:active === eLink?'var(--primary_color_2)':'white',
              }} outline="1" onClick={()=>{
                set_active(eLink)
              }}>{eLink}</Button>
            )}
          </div>
        </div>
        <div>
          {views[active || 'others']}
        </div>
      </div>
    </div>
  )
}

const General = ({user}:{user:any})=>{
  return (
  <div className={styles.generalContainer}>
    <div>
      <h3>Personal Information</h3>
      <div>
        <GeneralCard label="Full Name" value={user.fullname} />
        <GeneralCard label="phone number" value={user.phone_number} />
        <GeneralCard label="email address" value={user.email} />
        <GeneralCard label="bvn" value={user.bvn} />
        <GeneralCard label="gender" value={user.gender} />
        <GeneralCard label="marital status" value={user.marital_status} />
        <GeneralCard label="children" value={user.children} />
        <GeneralCard label="Type of Residence" value="Parent's Apartment" />
      </div>
      <h3>Education and Employment</h3>
      <div>
        <GeneralCard label="Education Level" value={user.education.edu_level} />
        <GeneralCard label="employment status" value={user.education.e_status} />
        <GeneralCard label="sector of employment" value={user.education.e_sector} />
        <GeneralCard label="Duration of employment" value={user.education.e_duration +' Years'} />
        <GeneralCard label="office email" value={user.education.email} />
        <GeneralCard label="Montly income" value={`#${user.education.income[0]} - #${user.education.income[1]}`} />
        <GeneralCard label="Loan repayment" value={user.education.loan} />
       
      </div>
      <h3>Socials</h3>
      <div>
        <GeneralCard label="Twitter" value={user.socials.twitter} />
        <GeneralCard label="Facebook" value={user.socials.facebook} />
        <GeneralCard label="Intagram" value={user.socials.instagram} />
      </div>
      <h3>Guarantor(s)</h3>
      {user.guarantor.map((eGuarantor:any,ind:number) =><div key={ind}>
        <GeneralCard label="Full Name" value={eGuarantor.name} />
        <GeneralCard label="phone number" value={eGuarantor.phone_number} />
        <GeneralCard label="email address" value={eGuarantor.email} />
        <GeneralCard label="relationship" value={eGuarantor.relationship} />
      </div>)}
   
    </div>
    

  </div>)
}

const GeneralCard = ({label,value}:{[index:string]:string})=>{
  return <div className={styles.generalCard}>
      <div>{label}</div>
      <div>{value}</div>
  </div>
}

const ComingSoon = ()=>{
  return <div>Coming Soon</div>
}


export default withTitle(EachUser,Title);