import React from 'react';

const AgentCard = ({ agent }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-indigo-500 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div className="text-5xl">{agent.emoji}</div>
        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          ID: {agent.id}
        </span>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
        <p className="text-sm text-gray-500 font-medium">{agent.role}</p>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-20 font-semibold">📍 Location:</span>
          <span>({agent.x}, {agent.y})</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-20 font-semibold">💤 Status:</span>
          <span className="text-blue-600">{agent.status}</span>
        </div>
      </div>
      
      {/* Memory Snippet (Agar backend bhej raha ho) */}
      {agent.memory && (
        <div className="mt-3 p-2 bg-yellow-50 text-xs text-yellow-800 rounded border border-yellow-200 italic">
          "{agent.memory}"
        </div>
      )}
    </div>
  );
};

export default AgentCard;