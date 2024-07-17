import styles from './notification.module.scss';
import { BsBell as BellIcon } from "react-icons/bs";
import { useState } from 'react';

const Notification = () => {
    const [show,set_show] = useState<boolean>(false);
    const [notifications,set_notifications] = useState<any>([]);
  return (
    <div className={styles.container}>
        <span><BellIcon /></span>
        {show?<ul></ul>:''}
    </div>
  )
}

export default Notification