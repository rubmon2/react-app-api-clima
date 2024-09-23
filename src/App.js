import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const url = `http://api.openweathermap.org/data/2.5/weather`;
  const apiKey = "90456b154f43117b7c0c2ab0bc964300";
  const difKelvin = 273.15;

  // estados
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);

  // form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchClima();
  };

  // fetch function
  const fetchClima = async () => {
    try {
      const response = await fetch(`${url}?q=${ciudad}&appid=${apiKey}`);
      const data = await response.json();
      setClima(data);
      console.log(data);
    } catch (error) {
      console.error("esto es un", error);
    }
  };

  // input change
  const onInputChange = (event) => {
    setCiudad(event.target.value);
  };

  return (
    <>
      <h1 className="text-center">Clima para tu semana</h1>
      <div className="d-flex flex-column align-items-center">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center mb-4"
        >
          <label className="form-label">Ciudad</label>
          <input
            type="text"
            className="form-control mb-3"
            name="ciudad"
            value={ciudad}
            style={{ width: "300px" }}
            placeholder="Tu Ciudad"
            onChange={onInputChange}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
          >
            Buscar
          </button>
        </form>

        {clima && clima.main && (
          <div className="text-center mt-4 p-3 border rounded" style={{ width: "300px", backgroundColor: "#f8f9fa" }}>
            <h2>{clima.name}</h2>
            <p>
              Temperatura: {parseInt(clima.main.temp - difKelvin)}ºC
            </p>
            <p>Condición meteorológica: {clima.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          </div>
        )}
      </div>
    </>
  );
};

//practicas 
