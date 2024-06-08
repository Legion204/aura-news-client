import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-red-700 text-white space-y-5 text-xl">
                        {/* Sidebar content here */}
                        <NavLink className={({ isActive }) => isActive ? 'text-black' : ''} to={"/dashboard/users"}>All Users</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-black' : ''} to={"/dashboard/all_articles"}>All Articles</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-black' : ''} to={"/dashboard/add_publications"}>Add Publications</NavLink>
                        <div className="divider divider-neutral"></div>
                        <NavLink className={({ isActive }) => isActive ? 'text-black' : ''} to={"/"}>Home</NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;