import logo from '../assets/logo.svg';
type Prop = {
    width?:string;
    height?:string;
}
const Logo = ({width='auto',height='auto'}:Prop) => {
  return (
    <img src={logo} width={width} height={height} />
  )
}

export default Logo