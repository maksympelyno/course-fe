import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getTeamLoser, getTeamWinner } from "../services/TeamService";
import { getTeamStatsChart } from "../services/TeamStatsService";
import styles from "../styles/Statistic.module.css"; // Імпорт стилів
ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [loser, setLoser] = useState({});
  const [winner, setWinner] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [chartData, setChartData] = useState({
    labels: ["Win", "Lose", "Draw"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ["rgba(50,205,50, 0.35)", "rgba(139,0,0, 0.35)", "rgba(255, 206, 86, 0.35)"],
        borderColor: ["rgba(59, 0, 35, 1)", "rgba(59, 0, 35, 1)", "rgba(59, 0, 35, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getData = () => {
    getTeamLoser()
      .then((data) => {
        setLoser(...data);
      })
      .catch((error) => {
        console.log(error);
      });

    getTeamWinner()
      .then((data) => {
        setWinner(...data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getSearchData = (query) => {
    getTeamStatsChart(query)
      .then((dataSearch) => {
        if (!isNaN(dataSearch[0].wins)) {
          setChartData((prevState) => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0], // зберігаємо інші властивості датасету без змін
                data: [dataSearch[0].wins, dataSearch[0].losses, dataSearch[0].draws], // оновлюємо дані
              },
            ],
          }));
        }
      })
      .catch((error) => {
        toast.error("Something went wrong.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const handleSearch = (teamChart) => {
    getSearchData(teamChart);
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.row}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <p className={styles.title}>The most winns</p>
            <p className={styles.teamName}>{winner.team_name}</p>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <p className={styles.title}>The most losses</p>
            <p className={styles.teamName}>{loser.team_name}</p>
          </div>
        </div>
      </div>

      <div className={styles.search}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter team name"
          className={styles.input}
        />
        <button onClick={() => handleSearch(searchQuery)} className={styles.button}>
          Search
        </button>
      </div>
      <div className={styles.chart}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default Statistics;
