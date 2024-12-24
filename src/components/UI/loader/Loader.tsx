import "./Loader.css"

const Loader = ({ isOverlay = true, text = "" }) => {
    return (
        <div className={isOverlay ? "loader-overlay" : "loader-inline"}>
            <div className="loader"></div>
            {text && ( 
                <p className="loader-text">{text}</p>
            )}
        </div>
    )
}

export default Loader
