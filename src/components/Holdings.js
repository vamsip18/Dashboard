import React from "react";
// import { holdings } from "../data/data";
import { useState, useEffect } from "react";
import axios from "axios";
import { VerticalChart } from "./VerticalChart";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings")
      .then((res) => {
        setHoldings(res.data);
        console.log(res.data);
      })
  }, []);

  const labels=holdings.map((stock) => stock["name"]);

      const data = {
        labels,
        datasets: [
          {
            label: "stock Price",
            data: holdings.map((stock) => stock.price.toFixed(2)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          {holdings.map((stock, index) => {
            const currVal = stock.qty * stock.price;
            const isProfit = currVal - stock.avg * stock.qty > 0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index} >
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currVal.toFixed(2)}</td>
                <td className={profClass}>{(currVal - stock.avg * stock.qty).toFixed(2)}</td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            )
          })
          }
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalChart data={data} />
    </>
  );
};

export default Holdings;
