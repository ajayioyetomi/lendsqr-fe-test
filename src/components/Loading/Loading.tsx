import styles from './loading.module.scss';
import { createPortal } from 'react-dom';

const Loading = ({type='content'}:{[index:string]:string}) => {
  let portal = document.getElementById('modal');
  if(type === 'screen' && portal)return (
    createPortal(<div className={styles.screenContainer}>Loading ...</div>,portal,)
    
  )
  else return <div className={styles.container}>Loading ...</div>;
}

export default Loading