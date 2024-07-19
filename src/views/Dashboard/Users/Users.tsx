import { withTitle } from "../../../hoc";
import styles from './users.module.scss';
import activeIcon from '../../../assets/users/active-icon.png';
import userIcon from '../../../assets/users/user-icon.png';
import loanIcon  from '../../../assets/users/loan-icon.png';
import savingsIcon from '../../../assets/users/savings-icon.png';


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
    return(
      <div className={styles.tableContainer}>
        <div>
          <div>Title</div>
          <div>Content</div>
        </div>
        <div>Pagination</div>

      </div>
    )
}

export default withTitle(Users,Heading);