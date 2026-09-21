import { useSettings } from "../context/SettingsContext";

function Settings({ theme, setTheme }) {

    const {
        settings,
        updateSetting
    } = useSettings();

    return (
        <div className="settings-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="settings-heading">

                <div>
                    <h2>Settings</h2>

                    <p>
                        Manage your API Health Analyzer preferences
                    </p>
                </div>

            </div>


            {/* =========================
                APPEARANCE
            ========================= */}

            <section className="settings-section">

                <div className="settings-section-header">

                    <div>
                        <h3>Appearance</h3>

                        <p>
                            Customize how the dashboard looks
                        </p>
                    </div>

                </div>


                <div className="settings-row">

                    <div>
                        <strong>Theme</strong>

                        <span>
                            Choose between light and dark mode
                        </span>
                    </div>


                    <div className="settings-theme-buttons">

                        <button
                            className={
                                theme === "light"
                                    ? "settings-theme-button active"
                                    : "settings-theme-button"
                            }
                            onClick={() => setTheme("light")}
                        >
                            ☀ Light
                        </button>


                        <button
                            className={
                                theme === "dark"
                                    ? "settings-theme-button active"
                                    : "settings-theme-button"
                            }
                            onClick={() => setTheme("dark")}
                        >
                            🌙 Dark
                        </button>

                    </div>

                </div>

            </section>


            {/* =========================
                DASHBOARD BEHAVIOR
            ========================= */}

            <section className="settings-section">

                <div className="settings-section-header">

                    <div>
                        <h3>Dashboard Behavior</h3>

                        <p>
                            Control how API data is refreshed
                        </p>
                    </div>

                </div>


                {/* AUTO REFRESH */}

                <div className="settings-row">

                    <div>
                        <strong>Auto Refresh</strong>

                        <span>
                            Automatically refresh dashboard API health data
                        </span>
                    </div>


                    <button
                        className={
                            settings.autoRefresh
                                ? "settings-toggle active"
                                : "settings-toggle"
                        }
                        onClick={() =>
                            updateSetting(
                                "autoRefresh",
                                !settings.autoRefresh
                            )
                        }
                    >

                        <span className="settings-toggle-circle"></span>

                        {settings.autoRefresh
                            ? "ON"
                            : "OFF"}

                    </button>

                </div>


                {/* REFRESH INTERVAL */}

                <div className="settings-row">

                    <div>
                        <strong>Refresh Interval</strong>

                        <span>
                            How often the dashboard checks for updated data
                        </span>
                    </div>


                    <select
                        className="settings-select"
                        value={settings.refreshInterval}
                        onChange={(e) =>
                            updateSetting(
                                "refreshInterval",
                                Number(e.target.value)
                            )
                        }
                    >

                        <option value={30}>
                            30 seconds
                        </option>

                        <option value={60}>
                            1 minute
                        </option>

                        <option value={300}>
                            5 minutes
                        </option>

                    </select>

                </div>

            </section>


            {/* =========================
                API MANAGEMENT
            ========================= */}

            <section className="settings-section">

                <div className="settings-section-header">

                    <div>
                        <h3>API Management</h3>

                        <p>
                            Customize API list behavior
                        </p>
                    </div>

                </div>


                {/* DELETE CONFIRMATION */}

                <div className="settings-row">

                    <div>
                        <strong>Confirm Before Delete</strong>

                        <span>
                            Ask for confirmation before deleting an API
                        </span>
                    </div>


                    <button
                        className={
                            settings.confirmDelete
                                ? "settings-toggle active"
                                : "settings-toggle"
                        }
                        onClick={() =>
                            updateSetting(
                                "confirmDelete",
                                !settings.confirmDelete
                            )
                        }
                    >

                        <span className="settings-toggle-circle"></span>

                        {settings.confirmDelete
                            ? "ON"
                            : "OFF"}

                    </button>

                </div>


                {/* AUTO SCROLL */}

                <div className="settings-row">

                    <div>
                        <strong>Auto-scroll API List</strong>

                        <span>
                            Continuously scroll API rows on Home Page
                        </span>
                    </div>


                    <button
                        className={
                            settings.autoScroll
                                ? "settings-toggle active"
                                : "settings-toggle"
                        }
                        onClick={() =>
                            updateSetting(
                                "autoScroll",
                                !settings.autoScroll
                            )
                        }
                    >

                        <span className="settings-toggle-circle"></span>

                        {settings.autoScroll
                            ? "ON"
                            : "OFF"}

                    </button>

                </div>

            </section>


            {/* =========================
                MONITORING
            ========================= */}

            <section className="settings-section">

                <div className="settings-section-header">

                    <div>
                        <h3>Monitoring</h3>

                        <p>
                            API monitoring information
                        </p>
                    </div>

                </div>


                <div className="settings-row">

                    <div>
                        <strong>Health Monitoring</strong>

                        <span>
                            Automatic API health checks are enabled
                        </span>
                    </div>

                    <div className="settings-status">
                        Active
                    </div>

                </div>


                <div className="settings-row">

                    <div>
                        <strong>Response Time Tracking</strong>

                        <span>
                            Track API response time for every health check
                        </span>
                    </div>

                    <div className="settings-status">
                        Active
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Settings;