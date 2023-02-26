const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  const selectedStyle = { background: 'black', color: 'white' }
  return (
    <div className="category-setup">
      {categories.map(({ name, id, totalTime }) => {
        return (
          <button
            className="category-button"
            style={selectedCategory.id === id ? selectedStyle : null}
            key={id}
            value={id}
            name={name}
            onClick={() =>
              selectedCategory.id === id
                ? setSelectedCategory('')
                : setSelectedCategory({ name, id, totalTime })
            }>
            {name}
          </button>
        )
      })}
    </div>
  )
}

export default Categories
