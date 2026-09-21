import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";import ApiTable from "../components/ApiTable";
import { getApis, checkApi } from "../services/apiService";
function Dashboard() {
    const { settings } = useSettings();
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(true);
    const totalApis = apis.length;

    const healthyApis = apis.filter(
        (api) => api.status === "UP"
    ).length;

    const failedApis = apis.filter(
        (api) => api.status === "DOWN"
    ).length;

    const uptime =
        totalApis > 0
            ? ((healthyApis / totalApis) * 100).toFixed(2)
            : "0.00";
    const statistics = [
        {
            title: "Total APIs",
            value: totalApis,
            description: "Monitored APIs",
            icon: "🗐"
        },
        {
            title: "Healthy APIs",
            value: healthyApis,
            description: "Currently operational",
            icon: "✅"
        },
        {
            title: "Failed APIs",
            value: failedApis,
            description: "Need attention",
            icon: "⚠️"
        },
        {
            title: "Uptime",
            value: `${uptime}%`,
            description: "Current availability",
            icon: "🎯"
        }
    ];
    useEffect(() => {

        loadDashboardData();

        if (!settings.autoRefresh) {
            return;
        }

        const interval = setInterval(() => {
            loadDashboardData();
        }, settings.refreshInterval * 1000);

        return () => {
            clearInterval(interval);
        };

    }, [
        settings.autoRefresh,
        settings.refreshInterval
    ]);

    async function loadDashboardData() {

        try {

            setLoading(true);

            const data = await getApis();

            const apisWithHealth = await Promise.all(

                data.map(async (api) => {

                    try {

                        const health = await checkApi(api.id);

                        return {
                            ...api,
                            status: health.status,
                            responseTime: health.responseTime
                        };

                    } catch (error) {

                        return {
                            ...api,
                            status: "DOWN",
                            responseTime: 0
                        };

                    }

                })

            );

            setApis(apisWithHealth);

        } catch (error) {

            console.error(
                "Failed to load dashboard data",
                error
            );

        } finally {

            setLoading(false);

        }
    }
    return (
        <div className="dashboard">

            <div className="dashboard-heading">

                <div>
                    <h2>API Health Analyzer</h2>

                    <p>
                        Monitor and analyze the health of your APIs
                    </p>
                </div>

                <button
                    className="refresh-button"
                    onClick={loadDashboardData}
                >
                    ↻ Refresh
                </button>

            </div>


            <div className="statistics-grid">

                {statistics.map((stat) => (

                    <div
                        className="stat-card"
                        key={stat.title}
                    >

                        <div className="stat-card-top">

                            <div className="stat-icon">
                                {stat.icon}
                            </div>

                            <span className="stat-title">
                                {stat.title}
                            </span>

                        </div>

                        {stat.title === "Uptime" ? (
                            <div className="uptime-card-content">

                                <div
                                    className="uptime-ring"
                                    style={{
                                        "--uptime": `${uptime}%`
                                    }}
                                >
                                    <div className="uptime-ring-center">
                                        <strong>{uptime}%</strong>
                                        <span>UPTIME</span>
                                    </div>
                                </div>

                                <div className="uptime-card-info">
                                    <span>Current availability</span>

                                    <strong>
                                        {healthyApis} of {totalApis} APIs operational
                                    </strong>
                                </div>

                            </div>
                        ) : (
                            <>
                                <div className="stat-value">
                                    {stat.value}
                                </div>

                                <div className="stat-description">
                                    {stat.description}
                                </div>
                            </>
                        )}

                    </div>

                ))}

            </div>


            <ApiTable
                apis={apis}
                autoScroll={settings.autoScroll}
            />

        </div>
    );
}

export default Dashboard;