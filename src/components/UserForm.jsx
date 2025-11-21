import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, MapPin, Utensils, HeartPulse, ChevronRight } from 'lucide-react';

export default function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', height: '', weight: '',
    goal: 'Weight Loss', level: 'Beginner', location: 'Gym',
    diet: 'Vegetarian', medical: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const inputClass = "w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none placeholder:text-zinc-600";
  const labelClass = "block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-xl"
    >
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Physical Profile</h2>
        <p className="text-zinc-400 text-sm">Enter your metrics to calibrate the AI model.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <label className={labelClass}>Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-zinc-500" size={16} />
              <input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={`${inputClass} pl-10`} />
            </div>
          </motion.div>
          <motion.div variants={item}>
            <label className={labelClass}>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
              {['Male', 'Female', 'Other'].map(o => <option key={o}>{o}</option>)}
            </select>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {['age', 'height', 'weight'].map((field) => (
            <motion.div key={field} variants={item}>
              <label className={labelClass}>{field} {field === 'height' ? '(cm)' : field === 'weight' ? '(kg)' : ''}</label>
              <input type="number" name={field} value={formData[field]} onChange={handleChange} placeholder="0" className={inputClass} />
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <label className={labelClass}>Current Level</label>
            <select name="level" value={formData.level} onChange={handleChange} className={inputClass}>
              {['Beginner', 'Intermediate', 'Advanced'].map(o => <option key={o}>{o}</option>)}
            </select>
          </motion.div>
          <motion.div variants={item}>
            <label className={labelClass}>Primary Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} className={inputClass}>
              {['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility'].map(o => <option key={o}>{o}</option>)}
            </select>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <label className={labelClass}>Location</label>
            <select name="location" value={formData.location} onChange={handleChange} className={inputClass}>
              {['Gym', 'Home', 'Outdoor'].map(o => <option key={o}>{o}</option>)}
            </select>
          </motion.div>
          <motion.div variants={item}>
            <label className={labelClass}>Dietary Preference</label>
            <select name="diet" value={formData.diet} onChange={handleChange} className={inputClass}>
              {['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Keto', 'Paleo'].map(o => <option key={o}>{o}</option>)}
            </select>
          </motion.div>
        </div>

        <motion.div variants={item}>
          <label className={labelClass}>Medical Conditions (Optional)</label>
          <input name="medical" value={formData.medical} onChange={handleChange} placeholder="None" className={inputClass} />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={(e) => { if (!formData.age || !formData.weight) { alert("Please fill Age/Weight"); return; } onSubmit(formData); }}
          className="w-full bg-white text-black hover:bg-zinc-200 font-medium py-4 rounded-lg text-sm transition-colors flex justify-center items-center gap-2 mt-4"
        >
          <Activity size={18} /> Generate Program <ChevronRight size={18} />
        </motion.button>

      </form>
    </motion.div>
  );
}