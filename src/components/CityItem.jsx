import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";

export const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;
  const { currentCity, removeCity } = useCities();

  const deleteCityHandler = (e) => {
    e.preventDefault();
    console.log("test");
    removeCity(id);
  };
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={deleteCityHandler} className={styles.deleteBtn}>
          x
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
