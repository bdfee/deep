const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-setup">
      {categories.map(({ name, id, totalTime, color }) => {
        const selectedStyle = { background: color, color: 'white' }
        const style = { background: 'white', border: `solid 2px ${color}` }
        return (
          <button
            className="category-button"
            style={selectedCategory.id === id ? selectedStyle : style}
            key={id}
            value={id}
            name={name}
            onClick={() =>
              selectedCategory.id === id
                ? setSelectedCategory('')
                : setSelectedCategory({ name, id, totalTime, color })
            }>
            {name}
          </button>
        )
      })}
    </div>
  )
}

export default Categories
