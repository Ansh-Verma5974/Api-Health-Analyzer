
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout({ children, theme, setTheme }) {    return (
    <div className={`app-layout ${theme}-theme`}>
            <Sidebar />

            <main className="main-content">

                <Topbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <div className="page-content">
                    {children}
                </div>

            </main>

        </div>
    );
}

export default MainLayout;