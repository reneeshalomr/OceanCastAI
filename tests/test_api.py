from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["status"] == "running"


def test_status():
    response = client.get("/status")

    assert response.status_code == 200
    assert response.json()["status"] == "online"


def test_model_metrics():
    response = client.get("/model/metrics")

    assert response.status_code == 200

    data = response.json()

    assert data["model"] == "Random Forest SST Predictor"

    assert data["training_period"] == "2005-2021"
    assert data["validation_period"] == "2022-2023"
    assert data["test_period"] == "2024-2025"

    assert data["training_samples"] == 1040000
    assert data["validation_samples"] == 240000
    assert data["test_samples"] == 240000

    assert data["validation_mae"] == 0.532
    assert data["validation_rmse"] == 0.808

    assert data["test_mae"] == 0.551
    assert data["test_rmse"] == 0.823

    assert data["evaluation_strategy"] == "Temporal holdout"