import  { useState } from 'react'
import './Login.css'
import Logo from '../../assets/logo.png'
import { login } from '../../firebase'
import { signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'


 const Login = () => {

  const [signState , setSignState] = useState('Sign Up')

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [loading , setLoading] = useState(false)

  const user_auth = async (e)=>{
    e.preventDefault()

    if(signState === 'Sign In'){
      setLoading(true)
      await login(email , password)
    }else{
      await signup(name , email , password)
    }
    setLoading(false)
  }

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={Logo} alt="" className='login-logo'/>
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === 'Sign Up' ? <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder='Your name' /> : <></>}
          <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Your Email' />
          <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' />
          <button onClick={user_auth}>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign Up' ?  <p>Already have an account? <span onClick={()=> setSignState('Sign In')}>Sign In now</span></p> :  <p>New to Netflix? <span onClick={()=> setSignState('Sign Up')}>Sign Up now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login;