import React, { useEffect, useRef, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import { useToast, Tooltip } from "@chakra-ui/react";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tour",
    display: "Tours",
  },
];

const Header = ({ togglemode, color, logo, mode }) => {
  const toast = useToast();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    toast({
      title: "Logout Successfully!",
      description: "We'av logged out your account!",
      status: "success",
      duration: "9000",
      isClosable: false,
      description: "",
    });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        (document.documentElement.scrollTop > 80 && color === "dark")
      ) {
        headerRef.current.classList.add("sticky__header1");
        headerRef.current.classList.remove("sticky__header2");
      } else if (
        document.body.scrollTop > 80 ||
        (document.documentElement.scrollTop > 80 && color === "light")
      ) {
        headerRef.current.classList.remove("sticky__header1");
        headerRef.current.classList.add("sticky__header2");
      } else {
        headerRef.current.classList.remove("sticky__header1");
        headerRef.current.classList.remove("sticky__header2");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  let background
  if(color==='light'){
    background='#121212'
  }
  else{
    background='white'
  }
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div
            className="nav__wrapper d-flex align-items-center justify-content-between"
            id={color}
          >
            {/* ========== LOGO ========== */}
            <div className="logo">
              <Link to="/home">
                <img src={Logo} alt="Your Logo" />
              </Link>
            </div>
            {/* ========================== */}
            {/* ========== MENU START ========== */}
            <div className="navigation" ref={menuRef} id={color} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5" style={{backgroundColor:`${background}`}}>
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index} id={color}>
                    <NavLink
                      id={color}
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ================================ */}

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-2">
                {user ? (
                  <>
                    {" "}
                    <h5 className="mb-0" id={color}>
                      {user.username}
                    </h5>
                    <Button className="btn primary__btn" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <button className="change" id={color}>
                      <Link to="/login">Login</Link>
                    </button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
                {/* <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                        <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button> */}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line" id={color}></i>
              </span>
              <Tooltip label={`Enable ${color} mode`} fontFamily={"sans-serif"}>
                <i>
                  <button onClick={togglemode}>
                    <i className={`fa-solid fa-${logo}`}></i>
                  </button>
                </i>
              </Tooltip>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
