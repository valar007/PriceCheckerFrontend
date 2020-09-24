import React, { useEffect, useState } from "react";
import { LineChart } from "react-chartkick";
import "./ChartComponent.css";
import "chart.js";

function ChartComponent(props: any) {
  const axios = require("axios");
  const [completeHistory, setCompleteHistory] = useState<any>([]);
  const [history, setHistory] = useState<any>([]);
  const [reload, setReload] = useState(true);
  const [historyRange, setHistoryRange] = useState(0);
  const setHistoryLength = (numberOfDays: number) => {
    setReload(true);
    setHistory([]);
    var t = [];
    for (var i = 0; i < completeHistory.length; i++) {
      var priceData: any;
      priceData = {};
      if (numberOfDays < Object.entries(completeHistory[i].data).length) {
        const temp: any = Object.entries(completeHistory[i].data);
        for (var j = 0; j < numberOfDays; j++) {
          priceData[temp[j][0]] = temp[j][1];
        }
      }
      t.push({ name: completeHistory[i].name, data: priceData });
    }
    setHistory(t);
    setReload(false);
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URI + "/"+ props.productSelected + "/history")
      .then((res: any) => {
        setCompleteHistory(res.data.history);
        setHistory(res.data.history);
        setHistoryRange(res.data.range);
      });
  }, [props.productSelected, axios]);
  return (
    <div className="chart-container">
      <p>Price History</p>
      <div>Click on the legend to toggle the vendors.</div>
      <div>
        {history !== [] && (
          <LineChart
            data={history}
            prefix="₹"
            curve={false}
            xtitle="Date"
            ytitle="Price"
            thousands=","
            round={2}
            zeros={true}
            messages={{ empty: "No data" }}
          />
        )}
      </div>
      {historyRange > 6 && (
        <button
          className="history-range-btn"
          onClick={() => setHistoryLength(7)}
        >
          Last 7 Days
        </button>
      )}
      {historyRange > 29 && (
        <button
          className="history-range-btn"
          onClick={() => setHistoryLength(30)}
        >
          Last 1 Month
        </button>
      )}
      {historyRange > 179 && (
        <button
          className="history-range-btn"
          onClick={() => setHistoryLength(180)}
        >
          Last 6 Months
        </button>
      )}
      {historyRange > 364 && (
        <button
          className="history-range-btn"
          onClick={() => setHistoryLength(365)}
        >
          Last Year
        </button>
      )}
      {historyRange !== 0 && (
        <button
          className="history-range-btn"
          onClick={() => setHistory(completeHistory)}
        >
          Complete History
        </button>
      )}
    </div>
  );
}

export default ChartComponent;
