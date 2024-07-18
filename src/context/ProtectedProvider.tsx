import {createContext, useEffect, useMemo, useState} from 'react';
type AuthType = {
    isAuthenticated: boolean;
    login:Function;
    logout:Function;
}
type PropType = {
    children:React.ReactNode
}



export const ProtectedContext = createContext<AuthType>({
    isAuthenticated:false,
    login:()=>{},
    logout:()=>{},
})

const ProtectedProvider = ({children}:PropType) => {
  const [token,set_token] = useState<null | string>(null);
  const time_lapse = useMemo(() =>60*30*1000,[]);

  const login = (user_token:string)=>{
    set_token(user_token);
    let time = new Date().getTime() + time_lapse;
    const temp_token = {
      time,
      token:user_token
    }
    window.localStorage.setItem('token',JSON.stringify(temp_token));
  }
  const logout = ()=>{
    set_token(null);
    window.localStorage.clear();
  }
  
  const value:AuthType = {
    isAuthenticated:token?true:false,
    login,
    logout,
  }
  useEffect(()=>{
    let temp_time = JSON.parse(window.localStorage.getItem('token') || '{}')?.time;
    let time_now = new Date().getTime();
    if(time_now <= temp_time) set_token('hello world');
  },[])
  return (
    <ProtectedContext.Provider value={value}>
        {children}
    </ProtectedContext.Provider>
  )
}

export default ProtectedProvider