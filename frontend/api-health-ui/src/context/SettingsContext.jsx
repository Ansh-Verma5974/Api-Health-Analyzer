import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

const DEFAULT_SETTINGS = {
    autoRefresh: true,
    refreshInterval: 60,
    confirmDelete: true,
    autoScroll: true
};

function getSavedSettings() {
    try {
        const saved = localStorage.getItem("apiHealthSettings");

        if (saved) {
            return {
                ...DEFAULT_SETTINGS,
                ...JSON.parse(saved)
            };
        }
    } catch (error) {
        console.error("Failed to load settings", error);
    }

    return DEFAULT_SETTINGS;
}

export function SettingsProvider({ children }) {

    const [settings, setSettings] = useState(getSavedSettings);

    useEffect(() => {
        localStorage.setItem(
            "apiHealthSettings",
            JSON.stringify(settings)
        );
    }, [settings]);

    function updateSetting(key, value) {
        setSettings((current) => ({
            ...current,
            [key]: value
        }));
    }

    return (
        <SettingsContext.Provider
            value={{
                settings,
                updateSetting
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error(
            "useSettings must be used inside SettingsProvider"
        );
    }

    return context;
}