import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { LogOnOut } from "../RTK/authslice";
import { useEffect } from "react";

function Header() {
  const { islogedin } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("islogedin = ",islogedin)
  } ,[])
  return (
    <div className="header">
      <Link class="navbar-brand ps-5" to="/">
        <span className="text-primary fw-bold fs-1">C</span>
        <span className="text-info fw-bold fs-1">R</span>
        <span className="text-success fw-bold fs-1">U</span>
        <span className="text-danger fw-bold fs-1">D</span>
      </Link>
      <ul className="nav ps-5  pe-5">
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/post/add">Add Post</NavLink>
        </li>
        <li className="login">
        {  
        islogedin ? (
          <Link onClick={() => dispatch(LogOnOut())}>Log out</Link>
        )  : (
          <Link onClick={() => dispatch(LogOnOut())}>Log in</Link>
        )   
        }
        </li>
      </ul>
    </div>
  )
}

export default Header;