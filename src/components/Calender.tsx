import React, { useState, useEffect } from 'react';
import { CalendarViewProps, CalendarEvent } from './types/types';
import { parseEvents } from './utils';
import CalendarHeader from './CalendarHeader';
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Calendar: React.FC<CalendarViewProps> = ({ events, view = 'month', onViewChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [parsedEvents, setParsedEvents] = useState<CalendarEvent[]>(parseEvents(events));

    useEffect(() => {
        setParsedEvents(parseEvents(events));
    }, [events]);

    const handlePrevious = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            switch (view) {
                case 'day':
                    newDate.setDate(prevDate.getDate() - 1);
                    break;
                case 'week':
                    newDate.setDate(prevDate.getDate() - 7);
                    break;
                case 'month':
                    newDate.setMonth(prevDate.getMonth() - 1);
                    break;
            }
            return newDate;
        });
    };

    const handleNext = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            switch (view) {
                case 'day':
                    newDate.setDate(prevDate.getDate() + 1);
                    break;
                case 'week':
                    newDate.setDate(prevDate.getDate() + 7);
                    break;
                case 'month':
                    newDate.setMonth(prevDate.getMonth() + 1);
                    break;
            }
            return newDate;
        });
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4">
            <div className="flex justify-between items-center w-full py-2">
                <p className="font-bold text-xl text-gray-700">Your Todo's</p>
                <Button
                    variant="text"
                    sx={{ textTransform: 'capitalize', fontWeight: 600, bgcolor: 'white' }}
                    className="shadow"
                >
                    <AddIcon /> Create Schedule
                </Button>
            </div>
            <div style={{ minWidth: '1000px' }}>
                <CalendarHeader
                    currentDate={currentDate}
                    view={view}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onToday={handleToday}
                    onViewChange={onViewChange}
                />
                <div>
                    {view === 'day' && <DayView currentDate={currentDate} events={parsedEvents} />}
                    {view === 'week' && <WeekView currentDate={currentDate} events={parsedEvents} />}
                    {view === 'month' && <MonthView currentDate={currentDate} events={parsedEvents} />}
                </div>
            </div>
        </div >
    );
};

export default Calendar;
