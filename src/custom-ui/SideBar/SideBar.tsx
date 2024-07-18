import styles from './sidebar.module.scss';
import { FaToolbox as OrganizationIcon } from "react-icons/fa6";
import { FaChevronDown as DownIcon,FaChevronUp as UpIcon,
  FaUserCheck as WhitelistIcon,FaUserXmark as KarmaIcon } from "react-icons/fa6";
import { IoHome as DashboardIcon } from "react-icons/io5";
import { HiUsers as UserIcon } from "react-icons/hi2";
import { FaUsers as GuarantorIcon,FaRegHandshake as DecisionIcon} from "react-icons/fa";
import { GiPayMoney as LoanIcon,GiReceiveMoney as RequestIcon,GiSettingsKnobs as PreferrenceIcon} from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import { LiaPiggyBankSolid as SavingsIcon } from "react-icons/lia";
import { MdOutlineWarehouse as ProductIcon,MdManageAccounts as AccountIcon,
  MdOutlinePriceChange as PriceIcon
 } from "react-icons/md";
import { TbDatabaseDollar as FeeIcon,TbTransactionDollar as TransactionIcon } from "react-icons/tb";
import { GrBusinessService as ServicesIcon } from "react-icons/gr";
import { RiFilePaper2Line as SettlementIcon } from "react-icons/ri";
import { VscGraph as ReportIcon } from "react-icons/vsc";
import { AiOutlineAudit as AuditIcon } from "react-icons/ai";

const sideLinks = [
  {
    id:1,
    heading:'customers',
    links:[
      {
        id:1,
        name:'users',
        path:'/users',
        icon: <UserIcon />
      },
      {
        id:2,
        name:'Guarantors',
        path:'/guarantors',
        icon: <GuarantorIcon />
      },
      {
        id:3,
        name:'Loans',
        path:'/loans',
        icon: <LoanIcon />
      },
      {
        id:4,
        name:'Decision Models',
        path:'/decision-models',
        icon: <DecisionIcon />
      },
      {
        id:5,
        name:'Savings',
        path:'/savings',
        icon: <SavingsIcon />
      },
      {
        id:6,
        name:'Loan Requests',
        path:'/loan-requests',
        icon: <RequestIcon />
      },
      {
        id:7,
        name:'Whitelist',
        path:'/whitelist',
        icon: <WhitelistIcon />
      },
      {
        id:8,
        name:'Karma',
        path:'/karma',
        icon: <KarmaIcon />
      },

    ]
  },
  {
    id:2,
    heading:'businesses',
    links:[
      {
        id:1,
        name:'Organization',
        path:'/organization',
        icon: <OrganizationIcon />
      },
      {
        id:2,
        name:'Loan Products',
        path:'/loan-products',
        icon: <RequestIcon />
      },
      {
        id:3,
        name:'Savings Products',
        path:'/savings-products',
        icon: <ProductIcon />
      },
      {
        id:4,
        name:'Fees and Charges',
        path:'/fees-and-charges',
        icon: <FeeIcon />
      },
      {
        id:5,
        name:'Transactions',
        path:'/transactions',
        icon: <TransactionIcon />
      },
      {
        id:6,
        name:'Services',
        path:'/services',
        icon: <ServicesIcon />
      },
      {
        id:7,
        name:'Service Account',
        path:'/service-account',
        icon: <AccountIcon />
      },
      {
        id:8,
        name:'Settlements',
        path:'/settlements',
        icon: <SettlementIcon />
      },
      {
        id:9,
        name:'Reports',
        path:'/reports',
        icon: <ReportIcon />
      },

    ]
  },
  {
    id:3,
    heading:'settings',
    links:[
      {
        id:1,
        name:'Preferences',
        path:'/preferences',
        icon: <PreferrenceIcon />
      },
      {
        id:2,
        name:'Fees and Princing',
        path:'/loan-products',
        icon: <PriceIcon />
      },
      {
        id:2,
        name:'Audit Logs',
        path:'/audit-logs',
        icon: <AuditIcon />
      },
    ]
  }
]

const SideBar = () => {

  return (
    <aside className={styles.container}>
      <div>
        <button>
          <OrganizationIcon />
          <span>Switch Organization</span>
          <DownIcon />
        </button>
        <ul></ul>
      </div>
      <NavLink to="/dashboard" className={({isActive}):any=> isActive?styles.active:{}}>
        <DashboardIcon />
        <span>Dashboard</span>
      </NavLink>
      <div>
        {
          sideLinks.map((eGroup:any)=>
          <div className={styles.groupContainer} key={eGroup.id}>
            <h3>{eGroup.heading}</h3>
            <ul>
              {eGroup.links.map((eLink:any) =>
                <li key={eLink.id}>
                  <NavLink to={eLink.path} className={({isActive}):any=> isActive?styles.active:{}}>
                    {eLink.icon}
                    <span>{eLink.name}</span></NavLink>
                </li>              
              )}
            </ul>
          </div>
          )
        }

      </div>
    </aside>
  )
}

export default SideBar;
