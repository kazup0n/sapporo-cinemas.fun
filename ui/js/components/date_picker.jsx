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
      <label>Pick a date (e.g. 2017-02-24): </label>
      <input type="date" className="form-control" placeholder="2017-02-24" onChange={onDateChange} />
    </div>
    </form>)
}
