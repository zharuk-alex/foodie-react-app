import css from './Logo.module.css';
import {clsx} from 'clsx';
import {Link, useLocation} from "react-router-dom";

const Logo = ({className = ""}) => {
    const {pathname} = useLocation();
    return (pathname === '/' ? <div className={clsx(css.logo, className)}>foodies</div> : <Link to="/" className={clsx(css.logo, className)}>foodies</Link>);
};

export default Logo;
