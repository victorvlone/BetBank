import { useEffect, useState } from "react";
import Styles from "./Bets.module.css";
function Bets() {
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  function validarCampos() {
    const nomeCasaInput = document.getElementById("nome-time-casa");
    const nomeForaInput = document.getElementById("nome-time-fora");

    if (!nomeCasaInput.value.trim() || !nomeForaInput.value.trim()) {
      return false;
    }

    const allInputs = document.querySelectorAll(
      `.${Styles.ft_input}, .${Styles.ht_input}`
    );

    let isFormValid = true;

    allInputs.forEach((input) => {
      if (input.value.trim() === "") {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  function getColorClass(value) {
    if (value >= 80) return Styles.green;
    if (value >= 60) return Styles.yellow;
    return Styles.red;
  }

  function analisarCasa() {
    const homeMatchesContainer = document.querySelectorAll(
      `.${Styles.matches_data_container}`
    )[0];
    if (!homeMatchesContainer) return { golsSofridos: 0, perdeuEmpatou: 0 };

    const matches = homeMatchesContainer.querySelectorAll(
      `.${Styles.match_container}`
    );

    let golsSofridos = 0;
    let perdeuEmpatou = 0;

    matches.forEach((match) => {
      const fts = match.querySelectorAll(`.${Styles.ft_input}`);
      if (fts.length === 2) {
        const casaFT = Number(fts[0].value) || 0;
        const foraFT = Number(fts[1].value) || 0;

        if (foraFT > 0) {
          golsSofridos++;
        }

        if (casaFT <= foraFT) {
          perdeuEmpatou++;
        }
      }
    });

    return { golsSofridos, perdeuEmpatou };
  }

  function analisarFora() {
    const awayMatchesContainer = document.querySelectorAll(
      `.${Styles.matches_data_container}`
    )[1];
    if (!awayMatchesContainer) return { golsMarcados: 0, venceuEmpatou: 0 };

    const matches = awayMatchesContainer.querySelectorAll(
      `.${Styles.match_container}`
    );

    let golsMarcados = 0;
    let venceuEmpatou = 0;

    matches.forEach((match) => {
      const fts = match.querySelectorAll(`.${Styles.ft_input}`);
      if (fts.length === 2) {
        const adversarioFT = Number(fts[0].value) || 0;
        const foraFT = Number(fts[1].value) || 0;

        if (foraFT > 0) {
          golsMarcados++;
        }

        if (foraFT >= adversarioFT) {
          venceuEmpatou++;
        }
      }
    });

    return { golsMarcados, venceuEmpatou };
  }

  function calcularApostaRecomendada(over05HT, over15, over25, ambasMarcam) {
    const { perdeuEmpatou: casaPE } = analisarCasa();
    const { venceuEmpatou: foraVE } = analisarFora();

    if (foraVE >= 4 && casaPE >= 4 && ambasMarcam >= 80 && over05HT >= 90) {
      return "Ambas Marcam";
    }
    if (over15 >= 90 && ambasMarcam >= 70 && over05HT >= 80 && over25 >= 70) {
      return "Over 1.5 Gols";
    }
    if (over05HT >= 80 && over25 >= 80 && ambasMarcam >= 80) {
      return "Over 2.5 Gols";
    }

    return "—";
  }

  function calcularIndicadores() {
    const matches = document.querySelectorAll(`.${Styles.match_container}`);

    let ambasMarcam = 0;
    let over15 = 0;
    let over25 = 0;

    matches.forEach((match) => {
      const fts = match.querySelectorAll(`.${Styles.ft_input}`);
      if (fts.length === 2) {
        const casa = Number(fts[0].value) || 0;
        const fora = Number(fts[1].value) || 0;
        const total = casa + fora;

        if (casa > 0 && fora > 0) ambasMarcam++;

        if (total >= 3) {
          over25++;
          over15++;
        } else if (total === 2) {
          over15++;
        }
      }
    });

    return { ambasMarcam, over15, over25 };
  }

  function calcularOver05HT() {
    const matches = document.querySelectorAll(`.${Styles.match_container}`);

    let over05 = 0;

    matches.forEach((match) => {
      const hts = match.querySelectorAll(`.${Styles.ht_input}`);

      if (hts.length === 2) {
        const casaHT = Number(hts[0].value) || 0;
        const foraHT = Number(hts[1].value) || 0;
        const totalHT = casaHT + foraHT;

        if (totalHT >= 1) {
          over05++;
        }
      }
    });

    return over05;
  }

  function limparCampos() {
    const allInputs = document.querySelectorAll(
      `.${Styles.ft_input}, .${Styles.ht_input}, .${Styles.input_team_name}`
    );

    allInputs.forEach((input) => {
      input.value = "";
    });
    
    const nomeCasaInput = document.getElementById("nome-time-casa");
    if (nomeCasaInput) {
      nomeCasaInput.focus();
    }
  }

  function handleAdd() {
    if (!validarCampos()) {
      setErrorMessage(true);
      return;
    }

    setErrorMessage(false);

    const nomeCasaInput = document.getElementById("nome-time-casa");
    const nomeForaInput = document.getElementById("nome-time-fora");

    const nomeCasa = nomeCasaInput ? nomeCasaInput.value || "Casa" : "Casa";
    const nomeFora = nomeForaInput ? nomeForaInput.value || "Fora" : "Fora";

    const { ambasMarcam, over15, over25 } = calcularIndicadores();
    const over05 = calcularOver05HT();

    const calcOver25 = (over25 / 10) * 100;
    const calcOver15 = (over15 / 10) * 100;
    const calcAmbasMarcam = (ambasMarcam / 10) * 100;
    const calcOver05HT = (over05 / 10) * 100;

    const apostaRecomendada = calcularApostaRecomendada(
      calcOver05HT,
      calcOver15,
      calcOver25,
      calcAmbasMarcam
    );

    const novaLinha = {
      jogo: `${nomeCasa} x ${nomeFora}`,
      casaVence: "",
      over15: calcOver15,
      over25: calcOver25,
      ambasMarcam: calcAmbasMarcam,
      over05HT: calcOver05HT,
      apostaRecomendada: apostaRecomendada,
      resultado: "",
    };

    setRows((prev) => [...prev, novaLinha]);

    console.log("Adicionando linha:", novaLinha);
    limparCampos();
  }
  useEffect(() => {
    const allInputs = document.querySelectorAll(
      `.${Styles.ft_input}, .${Styles.ht_input}, .${Styles.input_team_name}`
    );

    const hideError = () => {
      setErrorMessage(false);
    };

    const handleInput = (event) => {
      hideError();

      const input = event.target;

      const isGoalInput =
        input.classList.contains(Styles.ft_input) ||
        input.classList.contains(Styles.ht_input);

      if (isGoalInput && input.value.length >= 1) {
        const inputsClass = input.classList.contains(Styles.ft_input)
          ? Styles.ft_input
          : Styles.ht_input;

        const allOfType = document.querySelectorAll(`.${inputsClass}`);
        const index = Array.from(allOfType).indexOf(input);
        const next = allOfType[index + 1];
        if (next) next.focus();
      }
    };

    allInputs.forEach((input) => {
      input.addEventListener("input", handleInput);
    });

    return () => {
      allInputs.forEach((input) => {
        input.removeEventListener("input", handleInput);
      });
    };
  }, []);

  return (
    <div className="container">
      <div className={Styles.bets_container_content}>
        <div className={Styles.table_scroll}>
          <table className={Styles.table_container}>
            <thead>
              <tr>
                <th>Jogo</th>
                <th>Casa Vence</th>
                <th>Over 1.5 Gols</th>
                <th>Over 2.5 Gols</th>
                <th>Ambas Marcam</th>
                <th>Over 0.5 Gols HT</th>
                <th>Aposta Recomendada</th>
                <th>Resultado</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.jogo}</td>
                  <td>{r.casaVence}</td>
                  <td className={getColorClass(r.over15)}>{r.over15}%</td>
                  <td className={getColorClass(r.over25)}>{r.over25}%</td>
                  <td className={getColorClass(r.ambasMarcam)}>
                    {r.ambasMarcam}%
                  </td>
                  <td className={getColorClass(r.over05HT)}>{r.over05HT}%</td>
                  <td>{r.apostaRecomendada}</td>
                  <td>{r.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={Styles.matches_button_container}>
          <div className={Styles.home_away_container}>
            <div className={Styles.matches_data_container}>
              <div className={Styles.matches_container}>
                <p className={Styles.team_name}>
                  Ultimos 5 jogos do{" "}
                  <input
                    type="text"
                    className={Styles.input_team_name}
                    placeholder="Nome"
                    id="nome-time-casa"
                  />{" "}
                  <br />
                  em casa na competição
                </p>
                <div className={Styles.match_container} id="casa-jogo1">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input type="text" className={Styles.ht_input} />
                    <input type="text" className={Styles.ft_input} />
                  </div>
                  <div className={Styles.result_container}>
                    <input type="text" className={Styles.ft_input} />
                    <input type="text" className={Styles.ht_input} />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
                <div className={Styles.match_container} id="casa-jogo2">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ht_input}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ft_input}
                    />
                  </div>
                  <div className={Styles.result_container}>
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ft_input}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ht_input}
                    />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
                <div className={Styles.match_container} id="casa-jogo3">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ht_input}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ft_input}
                    />
                  </div>
                  <div className={Styles.result_container}>
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ft_input}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ht_input}
                    />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
                <div className={Styles.match_container} id="casa-jogo4">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ht_input}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ft_input}
                    />
                  </div>
                  <div className={Styles.result_container}>
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ft_input}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ht_input}
                    />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
                <div className={Styles.match_container} id="casa-jogo5">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ht_input}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ft_input}
                    />
                  </div>
                  <div className={Styles.result_container}>
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ft_input}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className={Styles.ht_input}
                    />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={Styles.matches_data_container}>
              <div className={Styles.matches_container}>
                <p className={Styles.team_name}>
                  Ultimos 5 jogos do{" "}
                  <input
                    type="text"
                    className={Styles.input_team_name}
                    placeholder="Nome"
                    id="nome-time-fora"
                  />{" "}
                  <br />
                  em casa na competição
                </p>
                <div className={Styles.match_container} id="fora-jogo1">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input type="text" className={Styles.ht_input} />
                    <input type="text" className={Styles.ft_input} />
                  </div>
                  <div className={Styles.result_container}>
                    <input type="text" className={Styles.ft_input} />
                    <input type="text" className={Styles.ht_input} />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
                <div className={Styles.match_container} id="fora-jogo2">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input type="text" className={Styles.ht_input} />
                    <input type="text" className={Styles.ft_input} />
                  </div>
                  <div className={Styles.result_container}>
                    <input type="text" className={Styles.ft_input} />
                    <input type="text" className={Styles.ht_input} />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
                <div className={Styles.match_container} id="fora-jogo3">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input type="text" className={Styles.ht_input} />
                    <input type="text" className={Styles.ft_input} />
                  </div>
                  <div className={Styles.result_container}>
                    <input type="text" className={Styles.ft_input} />
                    <input type="text" className={Styles.ht_input} />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
                <div className={Styles.match_container} id="fora-jogo4">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input type="text" className={Styles.ht_input} />
                    <input type="text" className={Styles.ft_input} />
                  </div>
                  <div className={Styles.result_container}>
                    <input type="text" className={Styles.ft_input} />
                    <input type="text" className={Styles.ht_input} />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
                <div className={Styles.match_container} id="fora-jogo5">
                  <div className={Styles.result_container}>
                    <i class="fi fi-ss-shield"></i>
                    <p>Casa</p>
                    <input type="text" className={Styles.ht_input} />
                    <input type="text" className={Styles.ft_input} />
                  </div>
                  <div className={Styles.result_container}>
                    <input type="text" className={Styles.ft_input} />
                    <input type="text" className={Styles.ht_input} />
                    <p>Fora</p>
                    <i class="fi fi-ss-shield"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleAdd}>Adicionar</button>
          {errorMessage && (
            <p className={Styles.error_message}>
              Preencha todos os nomes e todos os resultados de gols (HT e FT)
              para adicionar o jogo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Bets;
