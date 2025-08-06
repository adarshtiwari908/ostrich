// components/IntegrationCard.tsx
type LogType = {
    id: string;
    source: string;
    target: string;
    timestamp: string;
    status: "success" | "failed";
    message: string;
  };
  
  export const IntegrationCard = ({ log }: { log: LogType }) => {
    const isFailed = log.status === "failed";
  
    return (
      <div className="bg-yellow-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-yellow-700">
            {log.source} → {log.target}
          </h2>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              isFailed ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
            }`}
          >
            {log.status.toUpperCase()}
          </span>
        </div>
  
        <p className="text-sm text-gray-700 mb-1">{log.message}</p>
        <p className="text-xs text-gray-500">Last run: {new Date(log.timestamp).toLocaleString()}</p>
  
        {isFailed && (
          <button className="mt-4 px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Retry
          </button>
        )}
      </div>
    );
  };
  