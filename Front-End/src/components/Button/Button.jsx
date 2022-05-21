import './Button.css'

const Button = ({children,styles,handleClick,Disabled})=>{
    return <button onClick={handleClick} className={styles?styles:'primary'} disabled={Disabled?Disabled:false}>{children}</button>
}

export default Button