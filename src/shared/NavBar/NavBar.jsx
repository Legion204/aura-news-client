import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";

const NavBar = () => {

    const { firebaseUser, logOut } = useAuth();
    const [isAdmin]=useAdmin();

    const navLinks = <div className=" flex flex-col lg:flex-row gap-5 text-xl font-Source">
        <NavLink className={({ isActive }) => isActive ? 'text-red-700' : ''} to={'/'}><li className="hover:text-red-700">Home</li></NavLink>
        <NavLink className={({ isActive }) => isActive ? 'text-red-700' : ''} to={'/add_article'}><li className="hover:text-red-700">Add Articles</li></NavLink>
        {<NavLink className={({ isActive }) => isActive ? 'text-red-700' : ''} to={"/all_articles"}><li className="hover:text-red-700">All Articles</li></NavLink>}
        {<NavLink className={({ isActive }) => isActive ? 'text-red-700' : ''} to={'/manage_my_foods'}><li className="hover:text-red-700">Subscription</li></NavLink>}
        { isAdmin && <NavLink className={({ isActive }) => isActive ? 'text-red-700' : ''} to={"/dashboard/users"}><li className="hover:text-red-700">Dashboard</li></NavLink>}
        {<NavLink className={({ isActive }) => isActive ? 'text-red-700' : ''} to={"/my_articles"}><li className="hover:text-red-700">My Articles</li></NavLink>}
        {<NavLink className={({ isActive }) => isActive ? 'text-red-700' : ''} to={"/premium_articles"}><li className="hover:text-red-700">Premium Articles</li></NavLink>}
    </div>


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Aura NEWS</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    firebaseUser ?

                        <div className="flex items-center gap-3 mr-10">
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="w-12 rounded-full">
                                    <img className="rounded-full" alt="user" src={firebaseUser && firebaseUser?.photoURL || "https://i.postimg.cc/TYTdGph6/man.png"} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="mb-3">{firebaseUser?.displayName}</li>
                                    <Link onClick={logOut} className="btn bg-third">Logout</Link>
                                </ul>
                            </div>
                        </div>
                        :

                        <div>
                            <Link to={'/login'} className="btn bg-red-700 mr-3 text-white">Login</Link>
                            <Link to={'/registration'} className="btn bg-red-700 text-white">Sign Up</Link>
                        </div>
                }
            </div >
        </div >
    );
};

export default NavBar;