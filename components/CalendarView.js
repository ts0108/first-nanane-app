import { useState } from 'react';

export default function CalendarView({ schedules, onUpdate, onDelete }) {
  const [view, setView] = useState('day');
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const changeDate = (delta) => {
    const d = new Date(currentDate);
    if (view === 'day') d.setDate(d.getDate() + delta);
    if (view === 'week') d.setDate(d.getDate() + 7 * delta);
    if (view === 'month') d.setMonth(d.getMonth() + delta);
    setCurrentDate(d);
  };

  const toKey = (d) => d.toISOString().slice(0, 10);
  const schedulesForDate = (date) => schedules.filter((s) => s.date === toKey(date));

  const handleEdit = (s) => {
    const title = prompt('タイトル', s.title);
    const start = prompt('開始時間', s.start);
    const end = prompt('終了時間', s.end);
    if (title && start && end) onUpdate(s.id, { title, start, end });
  };

  const DayView = () => (
    <ul>
      {schedulesForDate(currentDate).map((s) => (
        <li key={s.id}>
          {s.title} {s.start}-{s.end}
          <button onClick={() => handleEdit(s)}>編集</button>
          <button onClick={() => onDelete(s.id)}>削除</button>
        </li>
      ))}
    </ul>
  );

  const WeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [...Array(7)].map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
    return (
      <div>
        {days.map((d) => (
          <div key={toKey(d)}>
            <strong>{d.toDateString()}</strong>
            <ul>
              {schedulesForDate(d).map((s) => (
                <li key={s.id}>
                  {s.title} {s.start}-{s.end}
                  <button onClick={() => handleEdit(s)}>編集</button>
                  <button onClick={() => onDelete(s.id)}>削除</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const MonthView = () => {
    const first = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const last = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];
    for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {days.map((d) => (
          <div key={toKey(d)} style={{ border: '1px solid #ccc', minHeight: 80 }}>
            <strong>{d.getDate()}</strong>
            <ul>
              {schedulesForDate(d).map((s) => (
                <li key={s.id}>
                  {s.title}
                  <button onClick={() => handleEdit(s)}>編集</button>
                  <button onClick={() => onDelete(s.id)}>削除</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => setView('day')}>1日</button>
        <button onClick={() => setView('week')}>1週間</button>
        <button onClick={() => setView('month')}>1ヶ月</button>
      </div>
      <div>
        <button onClick={() => changeDate(-1)}>前へ</button>
        <span>{currentDate.toDateString()}</span>
        <button onClick={() => changeDate(1)}>次へ</button>
      </div>
      {view === 'day' && <DayView />}
      {view === 'week' && <WeekView />}
      {view === 'month' && <MonthView />}
    </div>
  );
}
