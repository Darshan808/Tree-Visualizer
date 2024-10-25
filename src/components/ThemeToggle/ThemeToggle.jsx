import "./ThemeToggle.css";

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
};

export default ThemeToggle;