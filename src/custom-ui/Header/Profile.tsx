import {useState,useRef,useEffect} from 'react';
import styles from './profile.module.scss';
import { MdArrowDropDown as DownArrow} from "react-icons/md";
import avatar from '../../assets/avatar.png';
import { FaRegCircleUser as UserIcon } from "react-icons/fa6";
import { CiLogout as LogoutIcon } from "react-icons/ci";
import { GrDocumentText as DocIcon } from "react-icons/gr";
import { useAuth } from '../../hooks';
import { NavLink } from 'react-router-dom';

const Profile = () => {
    const [show,set_show] = useState<boolean>(false);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const childRef = useRef<HTMLUListElement | null>(null);
    const {logout} = useAuth()


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
    return (
        <div ref={parentRef} className={styles.container}>
            <button onClick={()=>set_show(!show)}>
                <img src={avatar} alt="profile" />
                <span>username</span>
                <DownArrow />
            </button>
            {
                show?
                <ul ref={childRef}>
                    <li><UserIcon /> username</li>
                    <li><DocIcon /> <NavLink to="/docs">Docs</NavLink>  </li>
                    <li onClick={()=>logout()}><LogoutIcon /> Logout</li>
                </ul>
                :''
            }
        </div>
    )
}

export default Profile