import { motion } from 'framer-motion';
import { Clock, Trash2, ChevronRight, Activity } from 'lucide-react';

export default function HistorySidebar({ history, onLoadPlan, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mt-12 mb-8"
    >
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="text-blue-400" size={20} /> Recent Plans
        </h3>
        <button
          onClick={onClear}
          className="text-red-400 text-sm hover:text-red-300 hover:bg-red-500/10 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
        >
          <Trash2 size={14} /> Clear History
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {history.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onLoadPlan(entry.plan)}
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl cursor-pointer hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-blue-600/10 transition-all duration-500" />

            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="font-bold text-white text-lg">{entry.userData.goal}</p>
                <p className="text-xs text-blue-200 font-medium mt-1">{entry.date}</p>
              </div>
              <div className="bg-white/10 p-2 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <ChevronRight size={16} />
              </div>
            </div>

            <div className="mt-4 flex gap-2 text-xs text-gray-400 relative z-10">
              <span className="bg-black/30 px-2 py-1 rounded border border-white/5">
                {entry.userData.level}
              </span>
              <span className="bg-black/30 px-2 py-1 rounded border border-white/5">
                {entry.userData.diet}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}