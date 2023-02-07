const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  const selectedStyle = { background: 'black', color: 'white' }
  return (
    <div>
      {categories.map(({ name, id, totalTime }) => {
        return (
          <button
            style={selectedCategory.id === id ? selectedStyle : null}
            key={id}
            value={id}
            name={name}
            onClick={() => setSelectedCategory({ name, id, totalTime })}>
            {name} {totalTime}
          </button>
        )
      })}
    </div>
  )
}

export default Categories
