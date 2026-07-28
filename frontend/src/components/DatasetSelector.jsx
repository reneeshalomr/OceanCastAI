export default function DatasetSelector({
  dataset,
  setDataset,
}) {

  const years = [
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
  ];


  return (
    <div
      style={{
        padding: "15px",
        background: "white",
        borderRadius: "10px",
        border: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >

      <label>
        <strong>
          Dataset Year:
        </strong>
      </label>

      <br />

      <select
        value={dataset}
        onChange={(e)=>setDataset(e.target.value)}
        style={{
          marginTop:"8px",
          padding:"8px",
          borderRadius:"6px",
        }}
      >

        {years.map((year)=>(

          <option
            key={year}
            value={`${year}_lowres.nc`}
          >
            {year}
          </option>

        ))}

      </select>

    </div>
  );
}