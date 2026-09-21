import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import APIs from "./pages/APIs";
import ApiDetails from "./pages/ApiDetails";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import { SettingsProvider } from "./context/SettingsContext";
import Settings from "./pages/Settings";

function App() {
    const [theme, setTheme] = useState("dark");
    return (
        <SettingsProvider>
        <BrowserRouter>

            <MainLayout
                theme={theme}
                setTheme={setTheme}
            >

                <Routes>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/apis"
                        element={<APIs />}
                    />

                    <Route
                        path="/apis"
                        element={<APIs />}
                    />

                    <Route
                        path="/apis/:id"
                        element={<ApiDetails />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/history"
                        element={<History />}
                    />

                    <Route
                        path="/settings"
                        element={
                            <Settings
                                theme={theme}
                                setTheme={setTheme}
                            />
                        }
                    />

                </Routes>

            </MainLayout>

        </BrowserRouter>
        </SettingsProvider>
    );
}

export default App;