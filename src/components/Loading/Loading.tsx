import styles from './loading.module.scss';
import { createPortal } from 'react-dom';

const Loading = () => {
  let portal = document.getElementById('modal');
  if(portal)return (
    createPortal(<div className={styles.container}>Loading ...</div>,portal,)
    
  )
  else return <div className={styles.container}>Loading ...</div>;
}

export default Loading