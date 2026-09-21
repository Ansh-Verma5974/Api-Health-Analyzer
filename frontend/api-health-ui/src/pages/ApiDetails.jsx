import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    getApiById,
    checkApi,
    getApiUptime,
    getApiAnalysis,
    getRecentChecks
} from "../services/apiService";


function ApiDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [api, setApi] = useState(null);
    const [health, setHealth] = useState(null);
    const [uptime, setUptime] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [recentChecks, setRecentChecks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        loadApiDetails();
    }, [id]);


    async function loadApiDetails() {

        try {

            setLoading(true);
            setError("");

            const [
                apiData,
                healthData,
                uptimeData,
                analysisData,
                recentData
            ] = await Promise.all([
                getApiById(id),
                checkApi(id),
                getApiUptime(id),
                getApiAnalysis(id),
                getRecentChecks(id)
            ]);

            setApi(apiData);
            setHealth(healthData);
            setUptime(uptimeData);
            setAnalysis(analysisData);
            setRecentChecks(recentData);

        } catch (error) {

            console.error(
                "Failed to load API details",
                error
            );

            setError("Failed to load API details");

        } finally {

            setLoading(false);

        }
    }


    if (loading) {

        return (
            <div className="api-details-page">
                <p>Loading API details...</p>
            </div>
        );

    }


    if (error) {

        return (
            <div className="api-details-page">

                <p>{error}</p>

                <button
                    className="back-button"
                    onClick={() => navigate("/apis")}
                >
                    ← Back to APIs
                </button>

            </div>
        );

    }


    return (

        <div className="api-details-page">

            {/* Back button */}

            <button
                className="back-button"
                onClick={() => navigate("/apis")}
            >
                ← Back to APIs
            </button>


            {/* API heading */}

            <div className="api-details-heading">

                <div>

                    <h2>{api.name}</h2>

                    <p>{api.url}</p>

                </div>


                <div
                    className={
                        health.status === "UP"
                            ? "status-badge status-up"
                            : "status-badge status-down"
                    }
                >
                    {health.status}
                </div>

            </div>


            {/* Summary cards */}

            <div className="details-cards">

                <div className="details-card">

                    <span>Uptime</span>

                    <strong>
                        {Number(uptime).toFixed(2)}%
                    </strong>

                </div>


                <div className="details-card">

                    <span>Avg. Response</span>

                    <strong>
                        {Math.round(analysis.averageResponseTime)} ms
                    </strong>

                </div>


                <div className="details-card">

                    <span>Fastest</span>

                    <strong>
                        {analysis.fastestResponseTime} ms
                    </strong>

                </div>


                <div className="details-card">

                    <span>Slowest</span>

                    <strong>
                        {analysis.slowestResponseTime} ms
                    </strong>

                </div>

            </div>


            {/* Health Analysis */}

            <section className="health-analysis-section">

                <h3>Health Analysis</h3>


                <div className="health-analysis-card">

                    <div className="health-analysis-row">

                        <span className="health-analysis-label">
                            Health Status
                        </span>

                        <strong
                            className={
                                analysis.healthStatus === "HEALTHY"
                                    ? "health-analysis-value health-status-healthy"
                                    : analysis.healthStatus === "DEGRADED"
                                        ? "health-analysis-value health-status-degraded"
                                        : "health-analysis-value health-status-down"
                            }
                        >
                            {analysis.healthStatus}
                        </strong>

                    </div>


                    <div className="health-analysis-row">

                        <span className="health-analysis-label">
                            Last Status
                        </span>

                        <strong className="health-analysis-value">
                            {analysis.lastStatus}
                        </strong>

                    </div>


                    <div className="health-analysis-row">

                        <span className="health-analysis-label">
                            HTTP Status
                        </span>

                        <strong className="health-analysis-value">
                            {analysis.lastHttpStatus}
                        </strong>

                    </div>


                    <div className="health-analysis-row">

                        <span className="health-analysis-label">
                            Last Response
                        </span>

                        <strong className="health-analysis-value">
                            {Math.round(analysis.averageResponseTime)} ms
                        </strong>

                    </div>


                    <div className="health-analysis-row">

                        <span className="health-analysis-label">
                            Response Trend
                        </span>

                        <strong
                            className={
                                analysis.responseTimeTrend === "STABLE"
                                    ? "health-analysis-value trend-stable"
                                    : analysis.responseTimeTrend === "FASTER"
                                        ? "health-analysis-value trend-faster"
                                        : "health-analysis-value trend-slower"
                            }
                        >
                            {analysis.responseTimeTrend}
                        </strong>

                    </div>


                    <div className="health-analysis-row">

                        <span className="health-analysis-label">
                            Consecutive Failures
                        </span>

                        <strong className="health-analysis-value">
                            {analysis.consecutiveFailures}
                        </strong>

                    </div>

                </div>

            </section>

            {/* Alert */}

            {analysis.alert && (
                <section className="api-alert-section">

                    <div className="api-alert-icon">
                        !
                    </div>

                    <div className="api-alert-content">

                        <h3>Alert</h3>

                        <p>
                            {analysis.alertMessage}
                        </p>

                    </div>

                </section>
            )}

            {/* Recent Checks */}

            <section className="recent-checks-section">

                <h3>Recent Checks</h3>


                <div className="recent-checks-table-wrapper">

                    <table className="recent-checks-table">

                        <thead>

                        <tr>

                            <th>Time</th>

                            <th>Status</th>

                            <th>Response Time</th>

                        </tr>

                        </thead>


                        <tbody>

                        {recentChecks.map((check, index) => (

                            <tr key={check.id || index}>

                                <td>
                                    {new Date(
                                        check.checkedAt
                                    ).toLocaleTimeString()}
                                </td>


                                <td
                                    className={
                                        check.status === "UP"
                                            ? "check-status-up"
                                            : "check-status-down"
                                    }
                                >
                                    {check.status}
                                </td>


                                <td>
                                    {check.responseTime} ms
                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </section>

        </div>

    );
}


export default ApiDetails;