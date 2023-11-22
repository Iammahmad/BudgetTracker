import React, { useState, useEffect } from 'react';

interface DatePickerProps {
  onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    onChange(dateValue);
  };

  return (
    <div className="date-picker-container">
      <input
        type="date"
        id="datepicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
