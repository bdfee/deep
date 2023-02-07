import { formatTime } from '../utility'

const Log = ({ log, showSection }) => {
  const display = { display: showSection === 'log' ? 'block' : 'none' }
  return (
    <div style={display}>
      <h2>log</h2>
      {log.map((session) => {
        return (
          <div key={session.id}>
            <h4>{session.id}</h4> {new Date(session.date).toLocaleString()}
            {session.items.map((item) => {
              return (
                <div key={item.id}>
                  {item.name} - {formatTime(item.totalTime)}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Log
