from pathlib import Path
import xarray as xr
import pandas as pd
import numpy as np


DATA_FOLDER = Path("backend/data")
OUTPUT_FILE = Path("ml/training_data.csv")


def process_file(filepath):

    print(f"Processing {filepath.name}")

    ds = xr.open_dataset(filepath)

    sst = ds["analysed_sst"]

    # Convert Kelvin to Celsius
    sst = sst

    # Downsample to reduce training size
    sst = sst[:, ::20, ::20]

    data = sst.values

    samples = []

    for month in range(12):

        grid = data[month]

        lat_size, lon_size = grid.shape

        for i in range(lat_size):
            for j in range(lon_size):

                value = grid[i, j]
                

                # Remove missing ocean values
                if np.isnan(value):
                    continue
                
                if value < -2 or value > 45:
                    continue

                samples.append(
                    {
                        "year": int(filepath.stem.split("_")[0]),
                        "month": month + 1,
                        "lat": float(ds.lat.values[i * 20]),
                        "lon": float(ds.lon.values[j * 20]),
                        "sst": float(value),
                    }
                )

    ds.close()

    return samples


def main():

    all_samples = []

    files = sorted(
        DATA_FOLDER.glob("*_lowres.nc")
    )

    print(
        f"Found {len(files)} datasets"
    )

    for file in files:

        samples = process_file(file)

        all_samples.extend(samples)


    df = pd.DataFrame(all_samples)

    print(df.head())

    print(
        f"Total samples: {len(df)}"
    )


    df.to_csv(
        OUTPUT_FILE,
        index=False
    )


    print(
        f"Saved: {OUTPUT_FILE}"
    )


if __name__ == "__main__":
    main()