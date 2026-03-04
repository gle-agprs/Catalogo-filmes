/* container fixo no canto inferior esquerdo */
.tema-switch {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
}

/* esconder o checkbox real */
.tema-switch input {
  display: none;
}

/* fundo do switch */
.switch {
  width: 60px;
  height: 30px;
  background-color: var(--cinza-dark);
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* bolinha com ícone */
.switch::before {
  content: "🌙";
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: transform 0.3s ease, content 0.3s ease;
}

/* estado ativado */
.tema-switch input:checked + .switch {
  background-color: var(--azul);
}

.tema-switch input:checked + .switch::before {
  transform: translateX(30px);
  content: "☀️";
}

/* animação suave para troca de cores do site */
body {
  transition: background-color 0.4s ease, color 0.4s ease;
}
