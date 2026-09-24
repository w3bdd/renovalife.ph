from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import List, Optional, Annotated
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc)

    def to_mongo(self):
        return self.model_dump(by_alias=True, exclude={"id"}, exclude_none=True)


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=30)
    email: Optional[str] = Field(default=None, max_length=160)
    enquiry_type: str = Field(min_length=2, max_length=60)
    shift_preference: Optional[str] = Field(default=None, max_length=30)
    preferred_date: Optional[str] = Field(default=None, max_length=30)
    message: Optional[str] = Field(default=None, max_length=2000)


class Enquiry(BaseDocument):
    name: str
    phone: str
    email: Optional[str] = None
    enquiry_type: str
    shift_preference: Optional[str] = None
    preferred_date: Optional[str] = None
    message: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "renovalife-api"}


@api_router.post("/enquiries", response_model=Enquiry, response_model_by_alias=False, status_code=201)
async def create_enquiry(payload: EnquiryCreate):
    enquiry = Enquiry(**payload.model_dump())
    result = await db.enquiries.insert_one(enquiry.to_mongo())
    doc = await db.enquiries.find_one({"_id": result.inserted_id})
    return Enquiry.from_mongo(doc)


@api_router.get("/enquiries", response_model=List[Enquiry], response_model_by_alias=False)
async def list_enquiries():
    docs = await db.enquiries.find().sort("created_at", -1).to_list(200)
    return [Enquiry.from_mongo(d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# Direct-run entrypoint for self-hosted (VPS) deployments:
#   python server.py            -> serves on 0.0.0.0:8001 (or $HOST / $PORT)
# In this workspace the app is supervisor-managed and this block is unused.
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "server:app",
        host=os.environ.get("HOST", "0.0.0.0"),
        port=int(os.environ.get("PORT", "8001")),
    )
