import styles from './pagination.module.scss'
import ReactPaginate from 'react-paginate';
import { useEffect, useMemo, useState, useRef } from 'react';
import { FaChevronLeft as PreviousIcon,FaChevronRight as NextIcon,FaChevronDown as DownIcon} from "react-icons/fa6";

const Pagination = ({items,onChange,isTest=false}:{items:any[],onChange:Function,isTest?:boolean}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [show,set_show] = useState<boolean>(isTest);
    let itemsPerPage = 10;
    const pageCount = useMemo(()=>Math.ceil(items?.length / itemsPerPage),[items]) ;
    const [options,set_options] = useState<number[]>([1]);

    const parentRef = useRef<HTMLDivElement | null>(null);
    const childRef = useRef<HTMLUListElement | null>(null);

    const handlePageClick = (event:any) => {
      const newOffset = (event.selected * itemsPerPage) % items?.length;
      setItemOffset(newOffset);
      onChange(items?.slice(newOffset, newOffset + itemsPerPage));
    };

    const handleGoTo = (page:number)=>{
      const newOffset = Number((page * itemsPerPage) % items?.length);
      setItemOffset(newOffset);
      onChange(items?.slice(newOffset, newOffset + itemsPerPage));
    }

    useEffect(()=>{
      if(pageCount && items){
        let result: number[] = [1];     
        for(let i = 0;i<pageCount;i++){
          if(i == 0){
            result = [];
          }
          result.push(i+1);
        }
        set_options(result);
      }
    },[items,pageCount])
    
    useEffect(()=>{
      const handleOutsideClick = (e:any)=>{
          if(parentRef && parentRef.current && childRef && childRef.current){
              const parentDimensions = parentRef.current.getBoundingClientRect();
              const childDimensions = childRef.current.getBoundingClientRect();
              if( e.clientX < parentDimensions.left ||
                  e.clientX > parentDimensions.right ||
                  e.clientY < childDimensions.top ||
                  e.clientY > parentDimensions.bottom){
                  set_show(false);
              }   
          }
      }
      window.addEventListener('click',handleOutsideClick);

      return ()=> window.removeEventListener('click',handleOutsideClick);
    },[])

  return (
    <div data-testid="test-page-container" className={styles.container}>
        <div>
          Showing 
          <div ref={parentRef} className={styles.selectContainer}>
            <span onClick={()=>set_show(!show)}>{Math.floor(itemOffset/10)+1} <span><DownIcon /></span></span>
            {
              show? 
              <ul ref={childRef}>
                {options?.map((eOption:any) =>
                <li data-testid="test-page-list" key={eOption} onClick={()=>handleGoTo(parseInt(eOption)-1)}>{eOption}</li>
                )}
              </ul>:''
            }
          </div> 
          out of {pageCount} pages
        </div>
        <ReactPaginate
        breakLabel="..."
        nextLabel={<span className={styles.btn}><NextIcon /></span>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<span className={styles.btn}><PreviousIcon /></span>}
        renderOnZeroPageCount={null}
        className={`${styles.pageUl} page-ul`}
        />
    </div>
  )
}

export default Pagination