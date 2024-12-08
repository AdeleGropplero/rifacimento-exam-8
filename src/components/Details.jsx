import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { lat, lon, name, state } = useParams();
  const [main, setMain] = useState(null);
  const [nextDays, setNextDays] = useState([]);
  const [date, setDate] = useState("");

  const getWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4cfaf734407de24d9d0d720549cbb2c7`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data.list);
        setMain(data.list[0]);
        setNextDays(data.list);
      });
  };

  useEffect(() => {
    getWeather();
  }, [lat, lon]);

  useEffect(() => {
    if (main) {
      const date = new Date(main.dt * 1000);
      const readable = date.toLocaleString();
      setDate(readable);
      console.log(readable);
    }
  }, [main]);

  return (
    <>
      <div>
        Città cercata {name}, {state}
      </div>
    </>
  );
};
export default Details;
