import FloatingBarChart from './floating-bar'

const Log = ({ showSection }) => {
  const display = { display: showSection === 'log' ? 'block' : 'none' }

  const data = [
    {
      name: 'sample data',
      color: '#000000',
      start: '2023-03-07T00:34:48',
      end: '2023-03-07T13:34:51'
    },
    {
      name: 'sample data',
      color: '#000000',
      start: '2023-03-07T15:34:48',
      end: '2023-03-07T19:34:51'
    },
    {
      name: 'project number 2',
      color: '#1966e0',
      start: '2023-03-06T10:34:53',
      end: '2023-03-06T13:34:54'
    },
    {
      name: 'project number 3',
      color: '#911ae0',
      start: '2023-03-05T11:34:56',
      end: '2023-03-05T13:35:01'
    },
    {
      name: 'sample data',
      color: '#000000',
      start: '2023-03-04T01:34:48',
      end: '2023-03-04T16:34:51'
    },
    {
      name: 'project number 2',
      color: '#1966e0',
      start: '2023-03-03T10:34:53',
      end: '2023-03-03T13:34:54'
    },
    {
      name: 'project number 3',
      color: '#911ae0',
      start: '2023-03-02T11:34:56',
      end: '2023-03-02T16:35:01'
    },
    {
      name: 'project number 3',
      color: '#911ae0',
      start: '2023-03-01T11:34:56',
      end: '2023-03-01T13:35:01'
    }
  ]

  // log.map((session) =>
  //   session.items.map((item) =>
  //     item.entries.map(([start, stop]) => {
  //       data.push({
  //         name: item.name,
  //         date: start.toDateString(),
  //         start: start.toTimeString(),
  //         end: stop.toTimeString()
  //       })
  //     })
  //   )
  // )

  // console.log(data)

  return (
    <div style={display}>
      <FloatingBarChart data={data} />
    </div>
  )
}

export default Log
