import Categories from './categories'
import Timer from './timer'

const Setup = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  showSection,
  createEntry,
  isRunning,
  setIsRunning
}) => {
  const display = { display: showSection.length ? 'none' : 'block' }
  return (
    <div style={display} className="setup">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Timer createEntry={createEntry} isRunning={isRunning} setIsRunning={setIsRunning} />
    </div>
  )
}

export default Setup
