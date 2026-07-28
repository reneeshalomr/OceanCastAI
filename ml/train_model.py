import pandas as pd
from pathlib import Path
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error
import joblib


DATA_FILE = Path("ml/training_data.csv")
MODEL_FILE = Path("ml/saved_models/sst_model.joblib")


def main():

    print("Loading training data...")

    df = pd.read_csv(DATA_FILE)

    print(df.head())

    # Features
    X = df[
        [
            "year",
            "month",
            "lat",
            "lon"
        ]
    ]

    # Target
    y = df["sst"]


    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )


    print("Training Random Forest...")

    model = RandomForestRegressor(
        n_estimators=100,
        random_state=42,
        n_jobs=-1
    )


    model.fit(
        X_train,
        y_train
    )


    print("Evaluating model...")


    predictions = model.predict(
        X_test
    )


    mae = mean_absolute_error(
        y_test,
        predictions
    )

    rmse = mean_squared_error(
        y_test,
        predictions
    ) ** 0.5


    print(
        f"MAE: {mae:.3f} °C"
    )

    print(
        f"RMSE: {rmse:.3f} °C"
    )


    MODEL_FILE.parent.mkdir(
        exist_ok=True
    )


    joblib.dump(
        model,
        MODEL_FILE
    )


    print(
        f"Saved model: {MODEL_FILE}"
    )


if __name__ == "__main__":
    main()