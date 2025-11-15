import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navBar_container}>
      <div className={styles.container_content_icon}>
        <div className={styles.icon_container}>
          <i className="fi fi-rr-house-chimney nav-icon"></i>
        </div>
      </div>
      <div className={styles.container_content_icon}>
        <div className={styles.icon_container}>
          <i className="fi fi-rr-dice-alt nav-icon"></i>
        </div>
      </div>
      <div className={styles.container_content_icon}>
        <div className={styles.icon_container}>
          <i className="fi fi-rr-infinite-cycle nav-icon"></i>
        </div>
      </div>
      <div className={styles.container_content_icon}>
        <div className={styles.icon_container}>
          <i className="fi fi-br-goals nav-icon"></i>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
