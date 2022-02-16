import { timeFormat } from '../../helpers/timeFormat';
import './Modal.css';

const Modal = ({
  difficulty,
  fails,
  time,
  getPokemons,
  limit,
  isOpenModal,
  setIsOpenModal,
}) => {
  return (
    <>
      {isOpenModal && (
        <div onClick={() => setIsOpenModal(false)} className="overlay">
          <div className="containerModal">
            <div className="headerModal">
              <h1>Felicidades</h1>
            </div>
            <button
              onClick={() => setIsOpenModal(false)}
              className="buttonClose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            <div className="results">
              <p>
                Has terminado el memotest en la dificultad:{' '}
                <span>{difficulty}</span>
              </p>
              <p>
                Canditad de fallos: <span>{fails}</span>
              </p>
              <p>
                Tiempo que tardaste: <span>{timeFormat(time)}</span>
              </p>
            </div>
            <div className="containerButtonStartAgain">
              <button
                onClick={() => {
                  getPokemons(limit);
                  setIsOpenModal(false);
                }}
              >
                Volver a empezar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
