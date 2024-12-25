import "./Loader.css"

const Loader = ({ isOverlay = true, text = "" }) => {
    return (
        <div className={isOverlay ? "loader-overlay" : "loader-inline"}>
            <div className="loader"></div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    )
}
export default Loader
// export default Loader

// import styles from "./Loader.module.css" // Импортируйте CSS-модуль

// const Loader = ({ isOverlay = true, text = "" }) => {
//     return (
//         <div className={isOverlay ? styles["loader-overlay"] : styles["loader-overlay"]}>
//             <div className={styles["loader"]}></div>
//            {/* {text && <p className={styles["loader-text"]}>{text}</p>} */}
//         </div>
//     )
// }

// export default Loader

// import styles from "./Loader.module.css"

// const Loader = () => {
//     return (
//         <div className={styles["loader-overlay"]}>
//             <div className={styles.loader}></div>
//         </div>
//     )
// }

// export default Loader
