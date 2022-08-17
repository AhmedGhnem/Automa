import Sidebar from "../components/Sidebar";
import ScenarioId from "../components/ScenarioId";

function ProjectPage({ notifications, updateNotifications }) {
    return (
        <div className="layout">
            <Sidebar/>
            <ScenarioId notifications={notifications} updateNotifications={updateNotifications}/>
        </div>
    )
}

export default ProjectPage
