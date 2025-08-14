import { useState } from 'react';
import ScheduleForm from '../components/ScheduleForm';
import CalendarView from '../components/CalendarView';

export default function Home() {
  const [schedules, setSchedules] = useState([]);

  const addSchedule = (schedule) => {
    setSchedules([...schedules, { id: Date.now(), ...schedule }]);
  };

  const updateSchedule = (id, updated) => {
    setSchedules(schedules.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h1>ナナちゃんのスケジューラー</h1>
      <ScheduleForm onSave={addSchedule} />
      <CalendarView
        schedules={schedules}
        onUpdate={updateSchedule}
        onDelete={deleteSchedule}
      />
    </div>
  );
}
