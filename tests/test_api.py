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
    assert data["samples"] == 1520000
    assert data["mae"] == 0.391
    assert data["rmse"] == 0.609