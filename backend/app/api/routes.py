from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
def status():
    return {
        "service": "OceanCastAI API",
        "status": "online"
    }