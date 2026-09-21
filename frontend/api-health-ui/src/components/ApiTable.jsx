import { useNavigate } from "react-router-dom";
function ApiTable({ apis, autoScroll }) {    const navigate = useNavigate();
    return (
        <section className="api-table-section">

            <div className="section-header">

                <div>
                    <h3>Monitored APIs</h3>

                    <p>
                        Current health of your monitored endpoints
                    </p>
                </div>

                <button
                    className="view-all-button"
                    onClick={() => navigate("/apis")}
                >
                    View all →
                </button>

            </div>


            <div className="api-table-wrapper">

                <table className="api-table">

                    <thead>

                    <tr>
                        <th>API</th>
                        <th>Endpoint</th>
                        <th>Status</th>
                        <th>Response Time</th>
                    </tr>

                    </thead>

                </table>


                <div
                    className={
                        autoScroll
                            ? "api-table-scroll"
                            : "api-table-scroll no-auto-scroll"
                    }
                >
                    <table className="api-table">

                        <tbody>

                        {[...apis, ...apis, ...apis].map((api, index) => (

                            <tr key={`${api.name}-${index}`}>

                                <td>
                                    <div className="api-name">

                                        <div className="api-mini-icon">
                                            {api.name.charAt(0)}
                                        </div>

                                        <strong>
                                            {api.name}
                                        </strong>

                                    </div>
                                </td>

                                <td>
                        <span className="api-url">
                            {api.url}
                        </span>
                                </td>

                                <td>

                        <span
                            className={`api-status ${
                                api.status === "UP"
                                    ? "status-up"
                                    : "status-down"
                            }`}
                        >

                            <span className="status-indicator"></span>

                            {api.status}

                        </span>

                                </td>

                                <td>
                        <span className="response-time">
                            {api.responseTime} ms
                        </span>
                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </section>
    );
}

export default ApiTable;