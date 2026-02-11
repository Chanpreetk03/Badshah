from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize the App
app = FastAPI(title="Project Gaav Backend")

# --- CORS CONFIGURATION ---
# This allows your React Frontend (running on port 5173) 
# to talk to this Backend (running on port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- THE MOCK DATABASE (Temporary) ---
# For now, we store the village state in a simple variable.
# Later, this will come from the AI logic.
world_state = {
    "agents": [
        {
            "id": 1, 
            "name": "Ramu Kaka", 
            "role": "Farmer", 
            "x": 2, 
            "y": 2, 
            "emoji": "👨‍🌾", 
            "status": "Sleeping",
            "memory": "I need to buy seeds tomorrow."
        },
        {
            "id": 2, 
            "name": "Babu Bhaiya", 
            "role": "Shopkeeper", 
            "x": 5, 
            "y": 5, 
            "emoji": "🤑", 
            "status": "Counting Money",
            "memory": "Ramu owes me 50 rupees."
        },
        {
            "id": 3, 
            "name": "Chudail", 
            "role": "Ghost", 
            "x": 8, 
            "y": 1, 
            "emoji": "👻", 
            "status": "Hovering",
            "memory": "Waiting for someone to cross the peepal tree."
        }
    ],
    "environment": {
        "time": "Night",
        "weather": "Foggy"
    }
}

# --- ENDPOINTS ---

@app.get("/")
def health_check():
    """Just to check if server is alive"""
    return {"message": "Gaav is Live!", "status": "Active"}

@app.get("/world")
def get_world():
    """Returns the current state of the village (Agents + Environment)"""
    return world_state

@app.post("/next-turn")
def advance_turn():
    """
    This is where the AI Magic will happen later.
    For now, it just moves Ramu randomly to prove the frontend updates.
    """
    import random
    
    # Simulate movement for Ramu
    ramu = world_state["agents"][0]
    ramu["x"] = (ramu["x"] + random.choice([-1, 0, 1])) % 10 # Keep within 10x10 grid
    ramu["y"] = (ramu["y"] + random.choice([-1, 0, 1])) % 10
    ramu["status"] = "Wandering..."
    
    return {"message": "Time advanced!", "new_state": world_state}