// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import { flagemojiToPNG } from "./CityItem";
import Message from "./Message";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodeingError, setGeoCodeingError] = useState("");
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCity = async () => {
      if (!lat && !lng) return;
      try {
        setGeoCodeingError("");
        setCountry("");
        setCityName("");
        setEmoji("");
        setIsGeoLoading(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log(data);
        if (!data.countryCode)
          throw new Error(
            "Please click on another place , it seems there is no city over the place you pointed to it"
          );
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        data.countryCode
          ? setEmoji(convertToEmoji(data.countryCode))
          : setEmoji("");
      } catch (error) {
        console.log(error);
        setGeoCodeingError(error.message);
      } finally {
        setIsGeoLoading(false);
      }
    };
    fetchCity();
  }, [lat, lng]);
  // {
  //   "cityName": "Berlin",
  //   "country": "Germany",
  //   "emoji": "🇩🇪",
  //   "date": "2027-02-12T09:24:11.863Z",
  //   "notes": "Amazing 😃",
  //   "position": {
  //     "lat": 52.53586782505711,
  //     "lng": 13.376933665713324
  //   },
  //   "id": 98443197
  // }
  async function submitHandler(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createCity(newCity);
    navigate("/app");
  }
  if (isGeoLoading) {
    return <Spinner />;
  }
  if (!lat && !lng)
    return <Message message={"Start By Clicking Somewhere on the Map"} />;

  if (geoCodeingError) {
    return <Message message={geoCodeingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading && styles.loading}`}
      onSubmit={submitHandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
