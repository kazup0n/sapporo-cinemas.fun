import React from 'react';
import CinemaSchedules from './cinema_schedules.jsx'
import DatePicker from './date_picker.jsx'

export default (props)=>{
  return <div>
    <DatePicker onDateChange={props.onDateChange} />
    <CinemaSchedules schedules={props.schedules} />
    </div>
}