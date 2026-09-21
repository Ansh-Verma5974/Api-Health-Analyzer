import { useLocation } from "react-router-dom";

function Topbar({ theme, setTheme }) {

    const location = useLocation();

    const pageInfo = {
        "/": {
            label: "API MONITORING",
            title: "Home"
        },
        "/apis": {
            label: "API MANAGEMENT",
            title: "APIs"
        },
        "/analytics": {
            label: "PERFORMANCE",
            title: "Analytics"
        },
        "/history": {
            label: "API ACTIVITY",
            title: "History"
        },
        "/settings": {
            label: "APPLICATION",
            title: "Settings"
        }
    };

    const currentPage = pageInfo[location.pathname] || {
        label: "API MONITORING",
        title: "API Details"
    };

    return (
        <header className="topbar">

            <div>
                <p className="topbar-label">
                    {currentPage.label}
                </p>

                <h1>
                    {currentPage.title}
                </h1>
            </div>

            <div className="topbar-right">

                <div className="theme-switcher">

                    <button
                        className={
                            theme === "light"
                                ? "theme-button active"
                                : "theme-button"
                        }
                        onClick={() => setTheme("light")}
                    >
                        ☀ Light
                    </button>

                    <button
                        className={
                            theme === "dark"
                                ? "theme-button active"
                                : "theme-button"
                        }
                        onClick={() => setTheme("dark")}
                    >
                        🌙 Dark
                    </button>

                </div>

                <div className="connection-status">
                    <span className="status-dot"></span>
                    Backend Connected
                </div>

                <div className="profile">

                    <div className="profile-avatar">
                        A
                    </div>

                    <div>
                        <strong>Admin</strong>
                        <small>API Manager</small>
                    </div>

                </div>

            </div>

        </header>
    );
}

export default Topbar;