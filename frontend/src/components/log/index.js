import { formatTime } from '../utility'

const Log = ({ log }) => {
  return (
    <div>
      <h2>log</h2>
      {log.map((session) => {
        return (
          <div key={session.id}>
            <h4>{session.id}</h4> {session.date.toLocaleString()}
            {session.items.map((item) => {
              return (
                <div key={item.category.id}>
                  {item.category.name} - {formatTime(item.totalTime)}
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