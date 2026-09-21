import { NavLink } from "react-router-dom";
function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <div className="logo-icon">
                    A
                </div>

                <div>
                    <h2>API Health</h2>
                    <span><h2>Analyzer</h2></span>
                </div>
            </div>

            <nav className="sidebar-nav">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>🏠</span>
                    Home
                </NavLink>

                <NavLink
                    to="/apis"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>🔗</span>
                    APIs
                </NavLink>

                <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>📈</span>
                    Analytics
                </NavLink>

                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>⌛</span>
                    History
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span>⚙️</span>
                    Settings
                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                <div className="system-status">
                    <span className="status-dot"></span>

                    <div>
                        <strong>System Online</strong>
                        <small>Active</small>
                    </div>
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;