import styles from "./Cycles.module.css";

function Cycles() {
  return (
    <section className="container">
      <div className={styles.cycles_content}>
        <div className={styles.cycles_container}>
          <div className={styles.cycles_names}>
            <p>Stake Inicial de Cada Ciclo:</p>
            <p>Objetivo jogo por jogo:</p>
            <p>Parar com % de lucro:</p>
            <p>Objetivo do Ciclo Chegar ate:</p>
            <p>Saldo Atual do Ciclo:</p>
            <p>Lucro do Ciclo:</p>
            <p>Saque Teórico:</p>
          </div>
          <div className={styles.cycle_number}>
            <h4>Ciclo 1</h4>
            <hr />
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
          </div>
          <div className={styles.cycle_number}>
            <h4>Ciclo 2</h4>
            <hr />
          </div>
          <div className={styles.cycle_number}>
            <h4>Ciclo 3</h4>
            <hr />
          </div>
          <div className={styles.cycle_number}>
            <h4>Ciclo 4</h4>
            <hr />
          </div>
          <div className={styles.cycle_number}>
            <h4>Ciclo 5</h4>
            <hr />
          </div>
        </div>
        <div className={styles.cycle_data_container}>
          <div className={styles.cycle_data_div}>
            <div className={styles.cycle_content}>
              <h4>Stake Inicial</h4>
              <h2>R$5,00</h2>
            </div>
            <div className={styles.cycle_content}>
              <h4>Obj. Jogo</h4>
            </div>
          </div>
          <div className={styles.cycle_data_div}>
            <div className={styles.cycle_content}>
              <h4>Lucro Teórico</h4>
            </div>
            <div className={styles.cycle_content}>
              <h4>Lucro Teórico %</h4>
            </div>
          </div>
          <div className={styles.cycle_data_div}>
            <div className={styles.cycle_content}>
              <h4>Lucro Atual</h4>
            </div>
            <div className={styles.cycle_content}>
              <h4>Lucro Final</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Cycles;
