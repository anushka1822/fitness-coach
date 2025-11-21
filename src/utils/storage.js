const STORAGE_KEY = 'fitai_history';

export const savePlanToHistory = (plan, userData) => {
    const history = getHistory();

    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        plan,
        userData
    };

    const updatedHistory = [newEntry, ...history];

    const trimmedHistory = updatedHistory.slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
};

export const getHistory = () => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
};