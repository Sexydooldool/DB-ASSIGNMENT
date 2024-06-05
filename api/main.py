from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from movieLens.routers import (
	movie_router,
	user_router,
	genre_router,
	rating_router
)


# Set API info
app = FastAPI(
    title="CSE3207 DB API",
    description="This is an example API of FastAPI, connected to MySQL DB.",
    contact={
        "name": "Junhyung Park",
        "email": "quixote1103@inha.edu",
    },
    docs_url="/v1/docs",
    redoc_url="/v1/redoc",
    openapi_url="/v1/openapi.json",
)

# Set CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4000",
    "http://localhost:19006",
    # Add your frontend URL here...
]

# Set middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
User APIs
Provides user CRUD APIs.
"""

app.include_router(movie_router, tags=["Movie Router"])
app.include_router(user_router, tags=["User Router"])
app.include_router(genre_router, tags=["Genre Router"])
app.include_router(rating_router, tags=["Rating Router"])
