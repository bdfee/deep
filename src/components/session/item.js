import Entry from './entry'

const Item = ({ category, entries, totalTime, removeItem, removeEntry }) => {
  const { id, name } = category
  return (
    <ul key={id} id={id}>
      {name} {totalTime}
      <button
        onClick={({ target }) => {
          removeItem(target.parentElement.id)
        }}>
        remove
      </button>
      {entries.map((entry, index) => (
        <Entry
          key={id + index}
          categoryId={id}
          entry={entry}
          index={index}
          removeEntry={removeEntry}
        />
      ))}
    </ul>
  )
}

export default Item
