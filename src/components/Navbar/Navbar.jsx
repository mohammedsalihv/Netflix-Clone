import  { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search_icon.svg';
import bell from '../../assets/bell_icon.svg';
import profile from '../../assets/profile_img.png';
import dropdown from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef(null); 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse My Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="Search" className="icons" />
        <div className="navbar-lng">
        <p>English
          <img src={dropdown} alt="" />
        </p>
        </div>
        <img src={bell} alt="Notifications" className="icons" />
        <div className="navbar-profile">
          <img src={profile} alt="Profile" className="profile" />
          <img src={dropdown} alt="Dropdown" />
          <div className="dropdown">
            <p onClick={()=> {
              logout()
            }}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
