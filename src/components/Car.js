import React from "react";
import reactStringReplace from "react-string-replace";
import "./Car.css";

const Car = ({ car, sortOption, search }) => {
  return (
    <li className="Car">
      <div>
        <h3>
          {search ? (
            reactStringReplace(car.name, search, (match, i) => (
              <span key={i} className="hl">
                {match}
              </span>
            ))
          ) : (
            <span>{car.name}</span>
          )}
        </h3>
      </div>
      <div className={sortOption === "wTotal" ? "active" : "weekend"}>
        {sortOption === "wTotal" ? null : "🏖️ Weekend Score: "}{" "}
        <span className="number">{car.wTotal}</span>
      </div>
      <div className={sortOption === "dTotal" ? "active" : "daily"}>
        {sortOption === "dTotal" ? null : "🏢 Daily Score: "}{" "}
        <span className="number">{car.dTotal}</span>
      </div>
      <div className={sortOption === "score" ? "active" : "score"}>
        {sortOption === "score" ? null : "✅ DougScore: "}{" "}
        <span className="number">{car.score}</span>
      </div>
    </li>
  );
};

export default Car;
