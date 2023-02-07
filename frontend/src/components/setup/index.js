import Categories from './categories'
import Timer from './timer'

const Setup = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  items,
  setItems,
  createEntry,
  isRunning,
  setIsRunning
}) => {
  const display = { display: isRunning ? 'none' : 'block' }
  return (
    <div style={display}>
      <Categories
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        items={items}
        setItems={setItems}
      />
      <Timer createEntry={createEntry} isRunning={isRunning} setIsRunning={setIsRunning} />
    </div>
  )
}

export default Setup
