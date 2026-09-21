import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { useNavigate } from "react-router-dom";
import { getApis, checkApi, addApi, deleteApi } from "../services/apiService";
function APIs() {
    const { settings } = useSettings();
    const navigate = useNavigate();
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newApi, setNewApi] = useState({
        name: "",
        url: "",
        active: true
    });
    const [deletingApi, setDeletingApi] = useState(null);

    const [addingApi, setAddingApi] = useState(false);
    useEffect(() => {
        loadApis();
    }, []);
    const totalApis = apis.length;

    const healthyApis = apis.filter(
        (api) => api.status === "UP"
    ).length;

    const downApis = apis.filter(
        (api) => api.status === "DOWN"
    ).length;

    const averageResponseTime =
        apis.length > 0
            ? Math.round(
                apis.reduce(
                    (total, api) =>
                        total + (api.responseTime || 0),
                    0
                ) / apis.length
            )
            : 0;

    async function loadApis() {

        try {

            setLoading(true);
            setError("");

            // Get all registered APIs
            const data = await getApis();

            // Check health of every API
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

                        console.error(
                            `Health check failed for ${api.name}`,
                            error
                        );

                        return {
                            ...api,
                            status: "DOWN",
                            responseTime: 0
                        };

                    }

                })

            );

            setApis(apisWithHealth);

        } catch (err) {

            console.error(err);
            setError("Unable to load APIs");

        } finally {

            setLoading(false);

        }
    }
    async function handleAddApi(event) {

        event.preventDefault();

        try {

            setAddingApi(true);
            setError("");

            await addApi(newApi);

            // Clear form
            setNewApi({
                name: "",
                url: "",
                active: true
            });

            // Close form
            setShowAddForm(false);

            // Reload APIs from backend
            await loadApis();

        } catch (err) {

            console.error(err);
            setError("Unable to add API");

        } finally {

            setAddingApi(false);
        }
    }
    async function handleDelete(api) {

        if (settings.confirmDelete) {

            const confirmed = window.confirm(
                `Are you sure you want to delete "${api.name}"?`
            );

            if (!confirmed) return;
        }
        try {

            setDeletingApi(api.id);

            await deleteApi(api.id);

            await loadApis();

        } catch (error) {

            console.error("Failed to delete API", error);

            alert("Failed to delete API");

        } finally {

            setDeletingApi(null);

        }
    }
    const filteredApis = apis.filter((api) =>
        api.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="apis-page">

            {showAddForm && (
                <div className="add-api-modal-overlay">

                    <div className="add-api-modal">

                        <div className="add-api-modal-header">

                            <div>
                                <h3>Add New API</h3>
                                <p>
                                    Add an API endpoint to monitor
                                </p>
                            </div>

                            <button
                                type="button"
                                className="close-modal-button"
                                onClick={() => setShowAddForm(false)}
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleAddApi}>

                            <div className="form-field">

                                <label>API Name</label>

                                <input
                                    type="text"
                                    placeholder="e.g. GitHub"
                                    value={newApi.name}
                                    onChange={(e) =>
                                        setNewApi({
                                            ...newApi,
                                            name: e.target.value
                                        })
                                    }
                                    required
                                />

                            </div>


                            <div className="form-field">

                                <label>API URL</label>

                                <input
                                    type="url"
                                    placeholder="https://api.example.com"
                                    value={newApi.url}
                                    onChange={(e) =>
                                        setNewApi({
                                            ...newApi,
                                            url: e.target.value
                                        })
                                    }
                                    required
                                />

                            </div>


                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-api-button"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-api-button"
                                    disabled={addingApi}
                                >
                                    {addingApi ? "Adding..." : "Add API"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            <div className="apis-page-header">

                <div>
                    <h2>APIs</h2>

                    <p>
                        Manage and monitor your API endpoints
                    </p>
                </div>

                <button
                    className="add-api-button"
                    onClick={() => setShowAddForm(true)}
                >
                    + Add API
                </button>

            </div>


            {/* API SUMMARY */}

            <div className="api-summary-grid">

                <div className="api-summary-card">
                    <span>Total APIs</span>
                    <strong>{totalApis}</strong>
                </div>

                <div className="api-summary-card">
                    <span>Healthy</span>
                    <strong>{healthyApis}</strong>
                </div>

                <div className="api-summary-card">
                    <span>Down</span>
                    <strong>{downApis}</strong>
                </div>

                <div className="api-summary-card">
                    <span>Average Response</span>
                    <strong>{averageResponseTime} ms</strong>
                </div>

            </div>


            {/* API LIST */}

            <section className="apis-list-section">

                <div className="apis-list-header">

                    <div>
                        <h3>All Monitored APIs</h3>

                        <p>
                            Current status of your registered endpoints
                        </p>
                    </div>

                    <div className="apis-list-controls">

                        <div className="api-search">
                            <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Search APIs by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            className="refresh-button"
                            onClick={loadApis}
                        >
                            ↻ Refresh
                        </button>

                    </div>

                </div>

                <div className="apis-list">

                    {/* TABLE HEADINGS */}
                    <div className="api-list-header-row">

                        <div>API</div>

                        <div>URL</div>

                        <div>Status</div>

                        <div>Response Time</div>

                        <div>Action</div>

                    </div>


                    {loading && (
                        <div className="api-loading">
                            Loading APIs...
                        </div>
                    )}

                    {error && (
                        <div className="api-error">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="api-list-scroll">

                            <div className="api-list-track">

                                {[...filteredApis, ...filteredApis, ...filteredApis].map((api, index) => (
                                    <div
                                        className="api-list-row"
                                        key={`${api.id}-${index}`}
                                    >

                                        <div className="api-list-name">
                                            <div className="api-mini-icon">
                                                {api.name.charAt(0)}
                                            </div>

                                            <div>
                                                <strong>{api.name}</strong>
                                                <small>API Endpoint</small>
                                            </div>
                                        </div>

                                        <div className="api-list-url">
                                            {api.url}
                                        </div>

                                        <div>
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
                                        </div>

                                        <div className="api-list-response">
                                            {api.responseTime} ms
                                        </div>

                                        <div className="api-actions">

                                            <button
                                                className="api-action-button"
                                                onClick={() => navigate(`/apis/${api.id}`)}
                                            >
                                                View
                                            </button>

                                            <button
                                                className="api-delete-button"
                                                onClick={() => handleDelete(api)}
                                                disabled={deletingApi === api.id}
                                            >
                                                {deletingApi === api.id ? "Deleting..." : "Delete Api"}
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>
                    )}

                </div>

            </section>

        </div>
    );
}

export default APIs;