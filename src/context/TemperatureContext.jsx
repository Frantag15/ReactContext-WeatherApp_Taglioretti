import { createContext, useContext, useState } from 'react';

const TemperatureContext = createContext();

export const useTemperature = () => {
    const context = useContext(TemperatureContext);
    if (context === undefined) {
        throw new Error('useTemperature must be used within a TemperatureProvider');
    }
    return context;
};

export const TemperatureProvider = ({ children }) => {
    const [unit, setUnit] = useState('C'); // Default to Celsius

    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
    };

    const value = {
        unit,
        toggleUnit,
    };

    return (
        <TemperatureContext.Provider value={value}>
            {children}
        </TemperatureContext.Provider>
    );
};
