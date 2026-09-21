import { useEffect, useState } from "react";

import {
    getApis,
    getApiAnalysis,
    getApiHistory
} from "../services/apiService";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Analytics() {

    const [apis, setApis] = useState([]);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [selectedApi, setSelectedApi] = useState("all");
    const [performanceView, setPerformanceView] = useState("slowest");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    async function loadAnalytics() {

        try {
            setLoading(true);

            const apiData = await getApis();

            const data = await Promise.all(
                apiData.map(async (api) => {

                    try {

                        const [analysis, history] = await Promise.all([
                            getApiAnalysis(api.id),
                            getApiHistory(api.id)
                        ]);

                        return {
                            ...api,
                            analysis,
                            history
                        };

                    } catch (error) {

                        console.error(
                            `Failed to load analytics for ${api.name}`,
                            error
                        );

                        return {
                            ...api,
                            analysis: null,
                            history: []
                        };
                    }
                })
            );

            setApis(apiData);
            setAnalyticsData(data);

        } catch (error) {

            console.error(
                "Failed to load analytics",
                error
            );

        } finally {

            setLoading(false);

        }
    }

    if (loading) {
        return (
            <div className="analytics-page">
                <h2>Loading Analytics...</h2>
            </div>
        );
    }

    const selectedApis =
        selectedApi === "all"
            ? analyticsData
            : analyticsData.filter(
                (api) => String(api.id) === selectedApi
            );

    const trendData = selectedApis.flatMap((api) =>
        api.history.map((check) => ({
            time: new Date(check.checkedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),
            responseTime: check.responseTime,
            apiName: api.name
        }))
    );

    const allPerformanceData = analyticsData
        .filter((api) => api.analysis)
        .map((api) => ({
            name: api.name,
            average: Math.round(
                api.analysis.averageResponseTime || 0
            )
        }));

    const performanceData =
        performanceView === "all"
            ? allPerformanceData
            : performanceView === "fastest"
                ? [...allPerformanceData]
                    .sort((a, b) => a.average - b.average)
                    .slice(0, 10)
                : [...allPerformanceData]
                    .sort((a, b) => b.average - a.average)
                    .slice(0, 10);

    const distributionData = [
        {
            name: "Fast",
            value: analyticsData.reduce(
                (total, api) =>
                    total +
                    api.history.filter(
                        (check) => check.responseTime < 500
                    ).length,
                0
            )
        },
        {
            name: "Moderate",
            value: analyticsData.reduce(
                (total, api) =>
                    total +
                    api.history.filter(
                        (check) =>
                            check.responseTime >= 500 &&
                            check.responseTime <= 2000
                    ).length,
                0
            )
        },
        {
            name: "Slow",
            value: analyticsData.reduce(
                (total, api) =>
                    total +
                    api.history.filter(
                        (check) => check.responseTime > 2000
                    ).length,
                0
            )
        }
    ];
    const analyzedApis = analyticsData.filter(
        (api) => api.analysis
    );

    const mostReliableApi = analyzedApis.length
        ? analyzedApis.reduce((best, current) =>
            current.analysis.uptimePercentage >
            best.analysis.uptimePercentage
                ? current
                : best
        )
        : null;

    const mostFailuresApi = analyzedApis.length
        ? analyzedApis.reduce((worst, current) =>
            current.analysis.failedChecks >
            worst.analysis.failedChecks
                ? current
                : worst
        )
        : null;

    const slowestApi = analyzedApis.length
        ? analyzedApis.reduce((slowest, current) =>
            current.analysis.averageResponseTime >
            slowest.analysis.averageResponseTime
                ? current
                : slowest
        )
        : null;

    const trendCounts = analyzedApis.reduce(
        (counts, api) => {

            const trend = api.analysis.responseTimeTrend;

            if (trend === "FASTER") {
                counts.faster++;
            }

            if (trend === "SLOWER") {
                counts.slower++;
            }

            if (trend === "STABLE") {
                counts.stable++;
            }

            return counts;
        },
        {
            faster: 0,
            slower: 0,
            stable: 0
        }
    );
    return (
        <div className="analytics-page">

            <div className="analytics-heading">

                <div>
                    <h2>Performance Analytics</h2>

                    <p>
                        Analyze API performance, reliability and response trends.
                    </p>
                </div>

                <button
                    className="refresh-button"
                    onClick={loadAnalytics}
                    disabled={loading}
                >
                    ↻ {loading ? "Refreshing..." : "Refresh"}
                </button>

            </div>

            <section className="analytics-section">

                <div className="analytics-section-header">

                    <div>
                        <h3>Response Time Trend</h3>

                        <p>
                            Response-time behavior across your monitored APIs
                        </p>
                    </div>

                    <select
                        value={selectedApi}
                        onChange={(e) => setSelectedApi(e.target.value)}
                        className="analytics-api-selector"
                    >
                        <option value="all">
                            All APIs
                        </option>

                        {apis.map((api) => (
                            <option
                                key={api.id}
                                value={api.id}
                            >
                                {api.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div
                    style={{
                        width: "100%",
                        height: "400px",
                        marginTop: "20px"
                    }}
                >
                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart data={trendData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="time" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="responseTime"
                                stroke="#168cff"
                                strokeWidth={2}
                                dot={false}
                            />

                        </LineChart>

                    </ResponsiveContainer>
                </div>

            </section>

            <div className="analytics-graphs-grid">

                <section className="analytics-section">

                    <div className="analytics-section-header">

                        <div>
                            <h3>API Performance Comparison</h3>

                            <p>
                                Compare average response time across monitored APIs
                            </p>
                        </div>

                        <select
                            value={performanceView}
                            onChange={(e) =>
                                setPerformanceView(e.target.value)
                            }
                            className="analytics-api-selector"
                        >
                            <option value="slowest">
                                Top 10 Slowest
                            </option>

                            <option value="fastest">
                                Top 10 Fastest
                            </option>

                            <option value="all">
                                All APIs
                            </option>
                        </select>

                    </div>

                    <div
                        className="analytics-chart-container"
                    >
                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart
                                data={performanceData}
                                layout="vertical"
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 70,
                                    bottom: 10
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    type="number"
                                    tickFormatter={(value) => `${value} ms`}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={90}
                                />

                                <Tooltip
                                    formatter={(value) => [
                                        `${value} ms`,
                                        "Average Response"
                                    ]}
                                />

                                <Bar
                                    dataKey="average"
                                    fill="#168cff"
                                    radius={[0, 5, 5, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>
                    </div>

                </section>


                <section className="analytics-section">

                    <div className="analytics-section-header">
                        <div>
                            <h3>Response Distribution</h3>
                            <p>
                                Distribution of health checks by response time
                            </p>
                        </div>
                    </div>

                    <div
                        className="analytics-chart-container"
                    >
                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie
                                    data={distributionData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={95}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(1)}%`
                                    }
                                    labelLine={false}
                                >
                                    <Cell fill="#18b978" />
                                    <Cell fill="#e6a400" />
                                    <Cell fill="#e94343" />
                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>
                    </div>

                </section>

            </div>

            <section className="analytics-section">

                <div className="analytics-section-header">
                    <div>
                        <h3>Reliability Insights</h3>
                        <p>
                            Key performance observations from your monitored APIs
                        </p>
                    </div>
                </div>

                <div className="reliability-insights-grid">

                    {/* Most Reliable */}
                    <div className="reliability-card">

                        <div className="reliability-icon reliability-icon-green">
                            ✓
                        </div>

                        <div className="reliability-content">

                <span>
                    Most Reliable API
                </span>

                            <strong>
                                {mostReliableApi
                                    ? mostReliableApi.name
                                    : "--"}
                            </strong>

                            <small>
                                {mostReliableApi
                                    ? `${Number(
                                        mostReliableApi.analysis
                                            .uptimePercentage
                                    ).toFixed(2)}% uptime`
                                    : "No data available"}
                            </small>

                        </div>

                    </div>


                    {/* Most Failures */}
                    <div className="reliability-card">

                        <div className="reliability-icon reliability-icon-red">
                            !
                        </div>

                        <div className="reliability-content">

                <span>
                    Most Failures
                </span>

                            <strong>
                                {mostFailuresApi
                                    ? mostFailuresApi.name
                                    : "--"}
                            </strong>

                            <small>
                                {mostFailuresApi
                                    ? `${mostFailuresApi.analysis.failedChecks} failed checks`
                                    : "No data available"}
                            </small>

                        </div>

                    </div>


                    {/* Slowest */}
                    <div className="reliability-card">

                        <div className="reliability-icon reliability-icon-yellow">
                            ↗
                        </div>

                        <div className="reliability-content">

                <span>
                    Slowest API
                </span>

                            <strong>
                                {slowestApi
                                    ? slowestApi.name
                                    : "--"}
                            </strong>

                            <small>
                                {slowestApi
                                    ? `${Math.round(
                                        slowestApi.analysis
                                            .averageResponseTime
                                    )} ms average`
                                    : "No data available"}
                            </small>

                        </div>

                    </div>


                    {/* Performance Trend */}
                    <div className="reliability-card">

                        <div className="reliability-icon reliability-icon-blue">
                            ↔
                        </div>

                        <div className="reliability-content">

                <span>
                    Performance Trend
                </span>

                            <strong>
                                {trendCounts.slower > trendCounts.faster
                                    ? "Needs Attention"
                                    : trendCounts.faster > trendCounts.slower
                                        ? "Improving"
                                        : "Stable"}
                            </strong>

                            <small>
                                {trendCounts.faster} faster ·{" "}
                                {trendCounts.slower} slower ·{" "}
                                {trendCounts.stable} stable
                            </small>

                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
}

export default Analytics;