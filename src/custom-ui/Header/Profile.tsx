import {useState} from 'react';
import styles from './profile.module.scss';
import { MdArrowDropDown as DownArrow} from "react-icons/md";
import avatar from '../../assets/avatar.png';

const Profile = () => {
    const [show,set_show] = useState<boolean>(false)
    return (
        <div className={styles.container}>
            <button onClick={()=>set_show(!show)}>
                <img src={avatar} alt="profile" />
                <span>username</span>
                <DownArrow />
            </button>
            {
                show?
                <ul>
                    <li>Logout</li>
                </ul>
                :''
            }
        </div>
    )
}

export default Profile