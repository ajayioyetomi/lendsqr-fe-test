import { NavLink, useParams } from 'react-router-dom';
import { withTitle } from '../../../hoc';
import { HiOutlineArrowNarrowLeft as BackIcon } from "react-icons/hi";
import { Button } from '../../../components';
import styles from './each-user.module.scss';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../utils';
import { AiOutlineUser as UserIcon } from "react-icons/ai";

const Title = ()=>{
    return <NavLink to="/users" className={styles.back}>
        <span><BackIcon/></span>
        Back to Users
    </NavLink>
}

const EachUser = () => {
  const {id} = useParams();
  const [active,set_active] = useState<string>('');
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
    'general':<General user={user||{}} />,
    'default':<ComingSoon />
  }
    
  return (
    <div className={styles.container}>
      <div>
        <span>User Details</span>
        <Button outline color='var(--blacklisted)' border="var(--blacklisted)">blacklist user</Button>
        <Button outline color="var(--primary_color_2)" border="var(--primary_color_2)">activate user</Button>
      </div>
      <div>
        <div className={styles.headContainer}>
          <div>
            <div>
              {user.image ? <img src={user.image} />:<span><UserIcon /></span>}
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            links

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
  <div>

  </div>)
}

const ComingSoon = ()=>{
  return <div>Coming Soon</div>
}


export default withTitle(EachUser,Title);