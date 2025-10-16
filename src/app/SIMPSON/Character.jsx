import { useEffect, useState } from "react";

export default function Character({ url }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div className="text-2xl">⏳ Cargando...</div>;

  return (
    <div className="flex flex-col items-center text-center gap-3 transition-all duration-500">
      <h2 className="text-2xl font-semibold text-yellow-400">{data.name}</h2>
      <img
        className="h-48 w-48 rounded-xl shadow-lg border-2 border-yellow-400 bg-white"
        src={`https://cdn.thesimpsonsapi.com/500${data.portrait_path}`}
        alt={data.name}
      />
    </div>
  );
}
