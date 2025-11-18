'use client';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { useEffect, useState } from 'react';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

interface CalendarHeaderProps {
  hideYear?: boolean;
  hideMonth?: boolean;
  hideWeek?: boolean;
  hideDay?: boolean;
  displayFormat?: string;
}

interface CalendarProps {
  variant?: 'month' | 'week' | 'year';
  headerProps?: CalendarHeaderProps;
  currentDate?: Date;
  minDate?: Date;
  selectedDays?: Array<Date>;
  onDateChange?: (newDate: Date) => void;
  onSelectDay?: (selectedDays: Array<Date>) => void;
  canSelect?: boolean;
  canNavigate?: boolean;
  multiSelect?: boolean;
}

const dateSelectorRootClass =
  'p-1 px-4 text-center font-primary hover:sm:bg-black/30 rounded flex flex-col items-center justify-center duration-300 cursor-pointer';

const CustomCalendar: React.FC<CalendarProps> = ({
  variant = 'month',
  headerProps,
  currentDate: externalDate,
  selectedDays: initialSelectedDays = [],
  onDateChange,
  onSelectDay: handleSelectDay,
  canSelect = true,
  multiSelect = false,
  canNavigate = false,
  minDate,
}) => {
  const {
    hideDay = false,
    hideMonth = variant === 'year' || false,
    hideWeek = false,
    hideYear = false,
    displayFormat,
  } = headerProps || {};

  const dateHeaderFormat =
    displayFormat ||
    (hideDay
      ? hideMonth
        ? 'YYYY'
        : 'MMMM YYYY'
      : hideMonth
        ? 'DD YYYY'
        : hideYear
          ? hideWeek
            ? 'dddd, MMMM D'
            : '[Week] W, YYYY'
          : 'dddd, MMMM D, YYYY');

  const [selectedDays, setSelectedDays] = useState<Array<Date>>([
    ...initialSelectedDays,
  ]);
  const [currentDate, setCurrentDate] = useState(
    dayjs(
      externalDate || (!multiSelect && initialSelectedDays.length > 0)
        ? initialSelectedDays[0]
        : new Date()
    )
  );

  useEffect(() => {
    if (externalDate) {
      setCurrentDate(dayjs(externalDate));
    }
  }, [externalDate]);

  const handlePrev = () => {
    if (!canNavigate) return;

    if (minDate && dayjs(currentDate).isBefore(minDate)) return;

    setCurrentDate((prev) => {
      const newDate = prev.subtract(1, variant);
      const focusedDay =
        selectedDays.length > 0 ? dayjs(selectedDays[0]) : prev;
      const newFocusedDay =
        focusedDay.date() <= newDate.daysInMonth()
          ? focusedDay.date()
          : newDate.daysInMonth();
      const updatedDate = newDate.date(newFocusedDay);
      if (onDateChange) onDateChange(updatedDate.toDate());
      return updatedDate;
    });
  };

  const handleNext = () => {
    if (!canNavigate) return;
    setCurrentDate((prev) => {
      const newDate = prev.add(1, variant);
      const focusedDay =
        selectedDays.length > 0 ? dayjs(selectedDays[0]) : prev;
      const newFocusedDay =
        focusedDay.date() <= newDate.daysInMonth()
          ? focusedDay.date()
          : newDate.daysInMonth();
      const updatedDate = newDate.date(newFocusedDay);

      if (onDateChange) onDateChange(updatedDate.toDate());
      return updatedDate;
    });
  };

  const onSelectDay = (date: Date) => {
    if (!canSelect) return;
    setCurrentDate(dayjs(date));
    setSelectedDays((prevSelectedDays) => {
      if (!multiSelect) return [date];
      const updated = [...prevSelectedDays];
      const index = updated.findIndex((v) => v.getTime() === date.getTime());
      if (index !== -1) updated.splice(index, 1);
      else updated.push(date);
      return updated;
    });
    if (onDateChange) onDateChange(dayjs(date).toDate());
    if (handleSelectDay) handleSelectDay(selectedDays);
  };

  return (
    <div className="w-full select-none p-4">
      {canNavigate && (
        <div className="mb-4 flex items-center justify-between">
          <button onClick={handlePrev}>
            <LeftOutlined />
          </button>
          <h2 className="font-secondary text-lg font-bold">
            {selectedDays.length > 0 && multiSelect ? (
              <>{selectedDays.length} dates selected</>
            ) : (
              currentDate.format(dateHeaderFormat)
            )}
          </h2>
          <button onClick={handleNext}>
            <RightOutlined />
          </button>
        </div>
      )}

      {variant === 'month' && (
        <MonthView
          date={currentDate}
          selectedDays={selectedDays.map((date_item) => dayjs(date_item))}
          onSelectDay={onSelectDay}
        />
      )}
      {variant === 'week' && (
        <WeekView
          date={currentDate}
          selectedDays={selectedDays.map((date_item) => dayjs(date_item))}
          onSelectDay={onSelectDay}
        />
      )}
      {variant === 'year' && <YearView date={currentDate} />}
    </div>
  );
};

const MonthView: React.FC<{
  date: dayjs.Dayjs;
  selectedDays: dayjs.Dayjs[];
  onSelectDay?: (selectedDay: Date) => void;
}> = ({ date, selectedDays, onSelectDay }) => {
  const startOfMonth = date.startOf('month');
  const startOfWeek = startOfMonth.startOf('week');

  const days = Array.from({ length: 42 }, (_, i) => startOfWeek.add(i, 'day'));

  const handleSelectDay = (day: dayjs.Dayjs) => {
    if (onSelectDay) {
      onSelectDay(day.toDate());
    }
  };

  const weeks = Array.from({ length: 7 }, (_, i) =>
    dayjs().startOf('week').add(i, 'day')
  );

  return (
    <div className="grid grid-cols-7 gap-2">
      <div className="col-span-7 grid grid-cols-7 gap-2">
        {weeks.map((val, index) => (
          <div
            className="flex flex-col items-center justify-center p-1 px-4 text-center font-primary"
            key={index}
          >
            {val.format('ddd')}
          </div>
        ))}
      </div>

      {days.map((day) => (
        <div
          key={day.toString()}
          className={classNames(dateSelectorRootClass, {
            'bg-black text-white':
              selectedDays.some((selected) => selected.isSame(day, 'day')) ||
              day.isSame(date, 'day'),
          })}
          onClick={() => handleSelectDay(day)}
        >
          {day.format('D')}
        </div>
      ))}
    </div>
  );
};

const WeekView: React.FC<{
  date: dayjs.Dayjs;
  selectedDays: dayjs.Dayjs[];
  onSelectDay?: (selectedDay: Date) => void;
}> = ({ date, selectedDays, onSelectDay }) => {
  const startOfWeek = date.startOf('week');
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

  const handleSelectDay = (day: dayjs.Dayjs) => {
    if (onSelectDay) {
      onSelectDay(day.toDate());
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <div
          key={day.toString()}
          className={classNames(dateSelectorRootClass, {
            'bg-black text-white':
              selectedDays.some((selected) => selected.isSame(day, 'day')) ||
              day.isSame(date, 'day'),
          })}
          onClick={() => handleSelectDay(day)}
        >
          <p className="font-medium">{day.format('dd')}</p>
          <p>{day.format('D')}</p>
        </div>
      ))}
    </div>
  );
};

const YearView: React.FC<{ date: dayjs.Dayjs }> = ({ date }) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    date.startOf('year').add(i, 'month')
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      {months.map((month) => (
        <div
          key={month.toString()}
          className={classNames(dateSelectorRootClass)}
        >
          {month.format('MMM')}
        </div>
      ))}
    </div>
  );
};

export default CustomCalendar;
