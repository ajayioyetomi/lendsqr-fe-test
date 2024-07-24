const Button = (props:any) => {
  const style = {
    width:'fit-content',
    padding:'8px 25px',
    border:`${props.outline?`1px solid ${props.border || 'black'}`:'none'}`,
    display:'flex',
    gap:'5px',
    color:props.color || 'black',
    backgroundColor: props.bg || 'transparent',
    outline:'none',
    borderRadius:props.radius?props.radius:'7px',
    fontFamily:'var(--boldFont)',
  }
  
  return (
    <button {...props} style={{...style,...props.style}} >{props.children}</button>
  )
}

export default Button