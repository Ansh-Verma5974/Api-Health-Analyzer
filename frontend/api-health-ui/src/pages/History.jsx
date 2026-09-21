import { useEffect, useState } from "react";

import {
    getApis,
    getApiHistory
} from "../services/apiService";

function History() {

    const [apis, setApis] = useState([]);
    const [history, setHistory] = useState([]);
    const [selectedApi, setSelectedApi] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(50);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {

        try {

            setLoading(true);
            setError("");

            const apiData = await getApis();

            const historyData = await Promise.all(
                apiData.map(async (api) => {

                    try {

                        const checks = await getApiHistory(api.id);

                        return checks.map((check) => ({
                            ...check,
                            apiName: api.name
                        }));

                    } catch (error) {

                        console.error(
                            `Failed to load history for ${api.name}`,
                            error
                        );

                        return [];

                    }
                })
            );

            setApis(apiData);

            setHistory(
                historyData
                    .flat()
                    .sort(
                        (a, b) =>
                            new Date(b.checkedAt) -
                            new Date(a.checkedAt)
                    )
            );

        } catch (error) {

            console.error(
                "Failed to load history",
                error
            );

            setError("Failed to load history");

        } finally {

            setLoading(false);

        }
    }

    const filteredHistory = history.filter((check) => {
        const matchesApi =
            selectedApi === "all" ||
            String(check.apiId) === selectedApi;

        const matchesSearch =
            check.apiName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return matchesApi && matchesSearch;
    });
    const visibleHistory = filteredHistory.slice(
        0,
        visibleCount
    );

    if (loading) {

        return (
            <div className="history-page">
                <h2>Loading History...</h2>
            </div>
        );

    }

    if (error) {

        return (
            <div className="history-page">
                <h2>History</h2>
                <p>{error}</p>
            </div>
        );

    }

    return (
        <div className="history-page">

            <div className="history-heading">

                <div>
                    <h2>API History</h2>

                    <p>
                        Review health checks and API activity over time
                    </p>
                </div>

                <div className="history-controls">


                    <select
                        value={selectedApi}
                        onChange={(e) =>
                        { setSelectedApi(e.target.value);
                            setVisibleCount(50);
                        }}
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

                    <div className="api-search">
                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search APIs by name..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setVisibleCount(50);
                            }}
                        />
                    </div>

                    <button
                        className="refresh-button"
                        onClick={loadHistory}
                    >
                        ↻ Refresh
                    </button>

                </div>

            </div>


            <section className="history-section">

                <div className="history-section-header">

                    <div>
                        <h3>Health Check History</h3>

                        <p>
                            {filteredHistory.length} checks recorded
                        </p>
                    </div>

                </div>


                <div className="history-table-wrapper">

                    <table className="history-table">

                        <thead>

                        <tr>
                            <th>API</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>HTTP Status</th>
                            <th>Response Time</th>
                        </tr>

                        </thead>

                        <tbody>

                        {visibleHistory.map(
                            (check, index) => (

                                <tr
                                    key={
                                        check.id ||
                                        `${check.apiId}-${check.checkedAt}-${index}`
                                    }
                                >

                                    <td>
                                        <strong>
                                            {check.apiName}
                                        </strong>
                                    </td>

                                    <td>
                                        {new Date(
                                            check.checkedAt
                                        ).toLocaleString()}
                                    </td>

                                    <td>

                                            <span
                                                className={
                                                    check.status === "UP"
                                                        ? "history-status-up"
                                                        : "history-status-down"
                                                }
                                            >
                                                {check.status}
                                            </span>

                                    </td>

                                    <td>
                                        {check.httpStatus || "--"}
                                    </td>

                                    <td>
                                        {check.responseTime} ms
                                    </td>

                                </tr>

                            )
                        )}

                        </tbody>

                    </table>

                </div>

                {visibleCount < filteredHistory.length && (
                    <div className="history-load-more">

                        <button
                            className="refresh-button"
                            onClick={() =>
                                setVisibleCount(
                                    (count) => count + 50
                                )
                            }
                        >
                            Load More
                        </button>

                        <span>
            Showing {visibleHistory.length} of{" "}
                            {filteredHistory.length} checks
        </span>

                    </div>
                )}

            </section>

        </div>
    );
}

export default History;