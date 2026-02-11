import { useState, useEffect } from "react";
import axios from "axios";
import AgentCard from "./components/AgentCard";

function App() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Backend se data laane ka function
    const fetchVillageState = async () => {
        try {
            // Backend URL (Make sure backend is running on port 8000)
            const response = await axios.get("http://127.0.0.1:8000/world");

            // Backend returns { "agents": [...], "environment": ... }
            if (response.data.agents) {
                setAgents(response.data.agents);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error connecting to Gaav:", err);
            setError("Failed to connect to the Village. Is Backend running?");
            setLoading(false);
        }
    };

    // 2. Page load hote hi data lao
    useEffect(() => {
        fetchVillageState();
    }, []);

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            {/* Header */}
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                    🌾 Project Gaav
                </h1>
                <p className="text-gray-600">
                    Digital Village Simulation Dashboard
                </p>

                <button
                    onClick={fetchVillageState}
                    className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition active:scale-95 shadow-lg"
                >
                    🔄 Refresh State
                </button>
            </header>

            {/* Content Area */}
            {loading && (
                <p className="text-center text-xl text-gray-500 animate-pulse">
                    Loading Village...
                </p>
            )}

            {error && (
                <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Grid of Agents */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {agents.map((agent) => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
