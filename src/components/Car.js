import React from "react";
import reactStringReplace from "react-string-replace";
import { Bar } from "react-chartjs-2";
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
      <div style={{ marginTop: 20 }}>
        <Bar
          options={{
            legend: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 10
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    autoSkip: false
                  }
                }
              ]
            }
          }}
          data={{
            labels: [
              "Styling",
              "Acceleration",
              "Handling",
              "Fun Factor",
              "Cool Factor",
              "Features",
              "Comfort",
              "Quality",
              "Practicality",
              "Value"
            ],
            datasets: [
              {
                label: "Score",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [
                  car.wStyling,
                  car.wAccel,
                  car.wHandling,
                  car.wFun,
                  car.wCool,
                  car.dFeatures,
                  car.dComfort,
                  car.dQuality,
                  car.dPracticality,
                  car.dValue
                ]
              }
            ]
          }}
        />
      </div>
      <div className={sortOption === "score" ? "active" : "score"}>
        {sortOption === "score" ? null : "✅ DougScore: "}{" "}
        <span className="number">{car.score}</span>
      </div>
    </li>
  );
};

export default Car;
