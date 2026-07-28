import { useState, useEffect } from "react";

import Header from "../components/Header";
import MapView from "../components/MapView";
import SSTChart from "../components/SSTChart";
import InfoCard from "../components/InfoCard";
import ForecastCard from "../components/ForecastCard";
import ModelCard from "../components/ModelCard";
import DatasetSelector from "../components/DatasetSelector";
import AnomalyCard from "../components/AnomalyCard";

import {
  getPoint,
  getTimeSeries,
  getForecast,
  getModelMetrics,
  getAnomaly,
} from "../services/api";


export default function Dashboard() {

  const [dataset, setDataset] = useState("2021_lowres.nc");

  const [month, setMonth] = useState(1);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [result, setResult] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [timeseries, setTimeseries] = useState(null);

  const [anomaly, setAnomaly] = useState(null);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    async function loadMetrics() {

      try {

        const data = await getModelMetrics();

        setMetrics(data);

      } catch(error) {

        console.error(
          "Unable to load metrics:",
          error
        );

      }

    }

    loadMetrics();

  }, []);



  async function loadOceanData(lat, lon) {

    setLoading(true);

    try {

      const point = await getPoint(
        dataset,
        month,
        lat,
        lon
      );


      const history = await getTimeSeries(
        dataset,
        lat,
        lon
      );


      const prediction = await getForecast(
        dataset,
        month,
        lat,
        lon
      );

      const anomalyData = await getAnomaly(
        dataset
      );


      setResult(point);
      setTimeseries(history);
      setForecast(prediction);
      setAnomaly(anomalyData);

    } catch(error) {

      console.error(error);

      alert(
        "Unable to load ocean data."
      );

    }


    setLoading(false);

  }



  return (

    <div
      style={{
        maxWidth:"1400px",
        margin:"30px auto",
        padding:"20px",
        fontFamily:"Arial"
      }}
    >

      <Header />


      <DatasetSelector
        dataset={dataset}
        setDataset={setDataset}
      />


      <div
        style={{
          display:"grid",
          gridTemplateColumns:"2fr 1fr",
          gap:"20px",
          marginTop:"20px"
        }}
      >

        <MapView

          onLocationSelect={async(location)=>{

            const lat =
              Number(location.lat.toFixed(2));

            const lon =
              Number(location.lng.toFixed(2));


            setLatitude(lat);
            setLongitude(lon);


            await loadOceanData(
              lat,
              lon
            );

          }}

        />


        <div>


          <InfoCard
            title="🌡 Current SST"
            value={
              result
              ? `${result.sst_celsius} °C`
              : "--"
            }
            subtitle={
              result
              ? `${result.latitude}, ${result.longitude}`
              : "Click anywhere on the map"
            }
          />


          <ForecastCard
            forecast={forecast}
          />


          <AnomalyCard
            anomaly={anomaly}
          />

          <ModelCard
            metrics={metrics}
          />


          <div
            style={{
              marginTop:"20px",
              padding:"20px",
              background:"#fff",
              borderRadius:"12px",
              boxShadow:"0 4px 12px rgba(0,0,0,.1)"
            }}
          >

            <h3>
              Controls
            </h3>


            <label>
              Month
            </label>

            <br/>


            <select
              value={month}
              onChange={(e)=>
                setMonth(
                  Number(e.target.value)
                )
              }
            >

              {[...Array(12)].map(
                (_,i)=>(
                  <option
                    key={i+1}
                    value={i+1}
                  >
                    {i+1}
                  </option>
                )
              )}

            </select>


            <br/>
            <br/>


            <button
              onClick={()=>
                loadOceanData(
                  latitude,
                  longitude
                )
              }
            >

              {
                loading
                ? "Loading..."
                : "Refresh"
              }

            </button>


          </div>


        </div>


      </div>


      <div
        style={{
          marginTop:"30px"
        }}
      >

        <SSTChart
          data={timeseries}
        />

      </div>


    </div>

  );

}