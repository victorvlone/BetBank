import styles from "./Header.module.css"
function Header(){
    return(
        <header className={styles.header_container}>

            <img src="../assets/images/logo.png" alt="" className={styles.logo_icon} />
        </header>
    )
}
export default Header;