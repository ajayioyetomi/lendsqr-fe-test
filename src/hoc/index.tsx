export const withTitle = (Component:any,Title:any)=>{
    return () =>{
        return <>
            <Title />
            <Component />
        </>
    }
}

