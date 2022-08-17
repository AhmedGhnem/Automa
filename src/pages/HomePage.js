import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

function HomePage() {
    return (
        <div className="layout">
            <Sidebar/>
            <Dashboard/>
        </div>
    )
}

export default HomePage
