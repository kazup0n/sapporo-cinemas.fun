import React from 'react';

const TimeList = (props) => {
  const schedules = props.schedules.map(s => <li key={s[0]+'-' +s[1]}>{s[0]}〜{s[1]}</li>)
  return <ul className="list-unstyled">{schedules}</ul>
}

const CinemaRow = (props) => {
  const {title, theater, schedules} = props.cinema
  const link = `https://www.google.co.jp/search?q=${title}`
  return <tr>
    <td><a href={link} target={'_blank'}>{title}</a></td>
    <td>{theater}</td>
    <td><TimeList schedules={schedules} /></td>
    </tr>
}

export default (props) => {
  const rows = props.schedules.map(s=><CinemaRow key={s.title} cinema={s} />)

  return <table className="table table-striped table-responsive table-sm">
    <thead>
        <tr>
          <th>Title</th>
          <th>theater</th>
          <th>Schedules</th>
        </tr>
        {rows}
    </thead>
    </table>
}