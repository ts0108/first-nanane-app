import { useState } from 'react';

export default function ScheduleForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('10:00');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, date, start, end });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
      <button type="submit">追加</button>
    </form>
  );
}
