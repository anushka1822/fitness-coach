import { motion } from 'framer-motion';
import { Download, RefreshCw, Dumbbell, Utensils } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { WorkoutPDF } from './WorkoutPDF';
import AIImage from './AIImage';
import VoiceControl from './VoiceControl';

export default function PlanDisplay({ plan, onReset }) {
  const cardClass = "bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-sm h-full flex flex-col";
  const itemClass = "flex gap-5 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-all cursor-default";

  return (
    <div className="w-full max-w-6xl p-4 pb-20 animate-in fade-in duration-700">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-center mb-8 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 italic tracking-wide">"{plan.motivation}"</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">{plan.userAnalysis}</p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-blue-500/5 blur-3xl -z-0 pointer-events-none" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={cardClass}
        >
          <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Dumbbell className="text-blue-500" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">Workout Routine</h3>
            </div>
            <VoiceControl
              text={`Here is your workout plan. ${plan.workout.map(e => e.exerciseName + ' for ' + e.sets + ' sets').join('. ')}`}
              label="Listen"
            />
          </div>

          <div className="space-y-4 flex-1">
            {plan.workout.map((ex, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(39, 39, 42, 1)' }}
                className={itemClass}
              >
                <AIImage query={ex.imageQuery} alt={ex.exerciseName} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-semibold text-white truncate pr-2">{ex.exerciseName}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs font-medium bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700">{ex.sets} Sets</span>
                    <span className="text-xs font-medium bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700">{ex.reps} Reps</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                    🕒 Rest: {ex.rest}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={cardClass}
        >
          <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Utensils className="text-green-500" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">Diet Plan</h3>
            </div>
            <VoiceControl
              text={`Here is your diet plan. ${plan.diet.map(e => e.mealName + ', ' + e.foodItems).join('. ')}`}
              label="Listen"
            />
          </div>

          <div className="space-y-4 flex-1">
            {plan.diet.map((meal, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(39, 39, 42, 1)' }}
                className={itemClass}
              >
                <AIImage query={meal.imageQuery} alt={meal.mealName} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-semibold text-white">{meal.mealName}</h4>
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 whitespace-nowrap ml-2">
                      {meal.calories}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{meal.foodItems}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-zinc-800 px-6 py-3 rounded-lg hover:bg-zinc-700 text-white text-sm font-medium transition-all border border-zinc-700"
        >
          <RefreshCw size={18} /> Regenerate Plan
        </button>

        <PDFDownloadLink
          document={<WorkoutPDF plan={plan} />}
          fileName="FitAI_Plan.pdf"
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg hover:bg-zinc-200 text-black text-sm font-bold transition-all shadow-lg shadow-white/5"
        >
          {({ loading }) =>
            loading ? 'Preparing...' : <><Download size={18} /> Download PDF</>
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}