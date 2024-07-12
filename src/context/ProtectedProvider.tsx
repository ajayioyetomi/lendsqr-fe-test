import {createContext, useState} from 'react';
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
  const login = (user_token:string)=>{
    set_token(user_token);
  }
  const logout = ()=>{
    set_token(null);
  }
  const value:AuthType = {
    isAuthenticated:token?true:false,
    login,
    logout,
  }
  return (
    <ProtectedContext.Provider value={value}>
        {children}
    </ProtectedContext.Provider>
  )
}

export default ProtectedProvider