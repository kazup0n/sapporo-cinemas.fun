import { createStore } from 'redux'
import fetch from 'isomorphic-fetch'

const SET_SCHEDULES = 'SET_SCHEDULES';

const initialState = {
  schedules: [],
  allSchedules: null
}

export function cinemasSchedules(state = initialState, action){
  if(action.type === SET_SCHEDULES){
    return {
      schedules: action.schedules || [],
      allSchedules: action.allSchedules || {},
      date: action.date
    }
  }
  return state
}

function setSchedules(date, schedules, allSchedules){
  return {
    type: SET_SCHEDULES,
    schedules: schedules,
    allSchedules: allSchedules,
    date: date
  }
}



export function fetchCinemaSchedules(date){
  return (dispatch, getState) => {
    if(!getState().allSchedules){
      fetch('cinema_schedules.json').then((response)=>{
        response.json().then(allSchedules => {
          const schedules = allSchedules[date]
          dispatch(setSchedules(date, schedules, allSchedules))
        })
      })
    }else {
      const allSchedules = getState().allSchedules
      const schedules = allSchedules[date]
      dispatch(setSchedules(date, schedules, allSchedules))
    }
  }
}