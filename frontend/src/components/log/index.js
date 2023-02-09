import { formatTime } from '../utility'

const Log = ({ log, showSection }) => {
  const display = { display: showSection === 'log' ? 'block' : 'none' }
  return (
    <div style={display}>
      {log.map((session) => {
        return (
          <div key={session.id} className="log-entry">
            {new Date(session.date).toLocaleString()}
            {session.items.map((item) => {
              return (
                <div key={item.id} className="log-item">
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
