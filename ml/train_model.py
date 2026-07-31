import joblib
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error


print("Loading training data...")

df = pd.read_csv("training_data_full.csv")

print(df.head())
print(f"\nTotal samples: {len(df):,}")


# --------------------------------------------------
# TIME-BASED SPLIT
# --------------------------------------------------
# Train:      2005-2021
# Validation: 2022-2023
# Test:       2024-2025
# --------------------------------------------------

train_df = df[df["year"] <= 2021]

val_df = df[
    (df["year"] >= 2022) &
    (df["year"] <= 2023)
]

test_df = df[df["year"] >= 2024]


features = [
    "year",
    "month",
    "lat",
    "lon",
]

target = "sst"


X_train = train_df[features]
y_train = train_df[target]

X_val = val_df[features]
y_val = val_df[target]

X_test = test_df[features]
y_test = test_df[target]


print("\nDataset split:")
print(f"Training samples:   {len(train_df):,}")
print(f"Validation samples: {len(val_df):,}")
print(f"Test samples:       {len(test_df):,}")


print("\nTraining Random Forest...")

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1,
)

model.fit(
    X_train,
    y_train,
)


# --------------------------------------------------
# VALIDATION
# --------------------------------------------------

print("\nEvaluating validation set...")

val_predictions = model.predict(
    X_val
)

val_mae = mean_absolute_error(
    y_val,
    val_predictions
)

val_rmse = (
    mean_squared_error(
        y_val,
        val_predictions
    ) ** 0.5
)


print(
    f"Validation MAE : "
    f"{val_mae:.3f} °C"
)

print(
    f"Validation RMSE: "
    f"{val_rmse:.3f} °C"
)


# --------------------------------------------------
# FINAL TEST
# --------------------------------------------------

print("\nEvaluating test set...")

test_predictions = model.predict(
    X_test
)

test_mae = mean_absolute_error(
    y_test,
    test_predictions
)

test_rmse = (
    mean_squared_error(
        y_test,
        test_predictions
    ) ** 0.5
)


print(
    f"Test MAE : "
    f"{test_mae:.3f} °C"
)

print(
    f"Test RMSE: "
    f"{test_rmse:.3f} °C"
)


# --------------------------------------------------
# SAVE MODEL
# --------------------------------------------------

joblib.dump(
    model,
    "sst_model.joblib"
)

print(
    "\nSaved model: "
    "sst_model.joblib"
)


# --------------------------------------------------
# SAVE METRICS
# --------------------------------------------------

metrics = {
    "validation_mae":
        round(val_mae, 3),

    "validation_rmse":
        round(val_rmse, 3),

    "test_mae":
        round(test_mae, 3),

    "test_rmse":
        round(test_rmse, 3),

    "training_samples":
        len(train_df),

    "validation_samples":
        len(val_df),

    "test_samples":
        len(test_df),
}


pd.DataFrame(
    [metrics]
).to_csv(
    "model_metrics.csv",
    index=False,
)

print(
    "Saved metrics: "
    "model_metrics.csv"
)