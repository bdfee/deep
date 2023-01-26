const Categories = ({ categoryList, selectedCategory, setSelectedCategory }) => {
  const selectedStyle = { background: 'black', color: 'white' }
  return categoryList.map((category) => {
    return (
      <button
        style={selectedCategory === category ? selectedStyle : null}
        key={category}
        value={category}
        onClick={({ target }) => setSelectedCategory(target.value)}>
        {category}
      </button>
    )
  })
}

export default Categories
