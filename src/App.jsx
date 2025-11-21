import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import PlanDisplay from './components/PlanDisplay';
import Loading from './components/Loading';
import { generatePlan } from './utils/gemini';
import './App.css';
import HistorySidebar from './components/HistorySidebar';
import { savePlanToHistory, getHistory, clearHistory } from './utils/storage';

function App() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleGenerate = async (userData) => {
    setLoading(true);
    try {
      const data = await generatePlan(userData);
      setPlan(data);

      savePlanToHistory(data, userData);
      setHistory(getHistory());

    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen text-white selection:bg-zinc-700 selection:text-white flex flex-col items-center relative">
      <nav className="w-full border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md px-6 py-4 mb-8 flex justify-center sticky top-0 z-50">
        <div className="w-full max-w-5xl flex items-center gap-2">
          <div className="bg-white text-black p-1 rounded-md">
            <span className="text-xl font-bold block leading-none">F</span>
          </div>
          <h1 className="text-lg font-semibold text-white tracking-tight">FitAI</h1>
        </div>
      </nav>

      <main className="w-full max-w-5xl px-4 pb-12 flex flex-col items-center z-10">
        {loading && <Loading />}

        {!loading && !plan && (
          <>
            <UserForm onSubmit={handleGenerate} />
            <HistorySidebar
              history={history}
              onLoadPlan={setPlan}
              onClear={handleClearHistory}
            />
          </>
        )}

        {!loading && plan && (
          <PlanDisplay plan={plan} onReset={() => setPlan(null)} />
        )}
      </main>
    </div>
  );
}
export default App;