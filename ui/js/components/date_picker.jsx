import React from 'react';

export default (props) =>{
  const onDateChange = (e) => {
    const date = e.target.value
    if(date){
      props.onDateChange(date)
    }
  }
  return (<form>
    <div className="form-group">
      <label>Pick a date: </label>
      <input type="date" className="form-control" onChange={onDateChange} />
    </div>
    </form>)
}
