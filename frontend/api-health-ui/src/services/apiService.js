const API_BASE_URL = "http://localhost:8081";

export async function getApis() {
    const response = await fetch(`${API_BASE_URL}/api/monitors`);

    if (!response.ok) {
        throw new Error("Failed to fetch APIs");
    }

    return response.json();
}
export async function checkApi(id) {

    const response = await fetch(
        `${API_BASE_URL}/api/monitors/${id}/check`
    );

    if (!response.ok) {
        throw new Error("Failed to check API");
    }

    return response.json();
}
export async function addApi(api) {

    const response = await fetch(
        `${API_BASE_URL}/api/monitors`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(api)
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add API");
    }

    return response.json();
}
export async function getApiById(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/monitors/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch API");
    }

    return response.json();
}
export async function getApiUptime(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/monitors/${id}/uptime`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch API uptime");
    }

    return response.json();
}
export async function getApiAnalysis(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/monitors/${id}/analysis`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch API analysis");
    }

    return response.json();
}
export async function getRecentChecks(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/monitors/${id}/recent`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recent checks");
    }

    return response.json();
}
export async function getApiHistory(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/monitors/${id}/history`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch API history");
    }

    return response.json();
}
export async function deleteApi(id) {
    const response = await fetch(
        `${API_BASE_URL}/api/monitors/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete API");
    }

    return response.text();
}
