import "./Loader.css"

const Loader = ({ isOverlay = false }) => {
    return (
        <div className={isOverlay ? "loader-overlay" : "loader-inline"}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader
