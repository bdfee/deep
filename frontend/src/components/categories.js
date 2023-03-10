import { useState } from 'react'
import categoryService from '../services/categories'
import { tempId, formatTime } from './utility'
import itemService from '../services/items'

const Categories = ({
  categories,
  setCategories,
  setSelectedCategory,
  items,
  setItems,
  showSection
}) => {
  const [text, setText] = useState('')
  const [color, setColor] = useState('#000000')

  const createCategory = () => {
    const isCategoryExisting = categories.filter(({ name }) => name === text)
    if (!isCategoryExisting.length && text.length > 0) {
      const newCategory = { name: text, id: tempId(), totalTime: 0, color: color }
      categoryService.create(newCategory).then((res) => {
        setCategories(categories.concat(res.data))
        setText('')
      })
    }
  }

  const removeCategory = (id) => {
    const selectedId = Number(id)
    categoryService.remove(selectedId).then((res) => {
      if (res.status === 204) {
        setCategories(categories.filter(({ id }) => id !== selectedId))
        setSelectedCategory('')

        const updatedItems = items.filter(({ id }) => id !== selectedId)
        if (updatedItems.length) {
          itemService.deleteItem(selectedId).then(() => {
            setItems(updatedItems)
          })
        }
      }
    })
  }

  const display = { display: showSection === 'categories' ? 'block' : 'none' }
  return (
    <div style={display}>
      {categories.map(({ name, id, totalTime, color }) => {
        const swatchColor = { background: color }
        return (
          <div key={id} className="category">
            <div className="swatch" style={swatchColor}></div>
            <div className="category-name">
              <b>{name}</b>
            </div>
            <div>{formatTime(totalTime)}</div>
            <div className="category-remove">
              {!totalTime ? (
                <button className="category-btn" onClick={() => removeCategory(id)}>
                  remove
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        )
      })}

      <div className="category-create-row">
        <input
          type="text"
          value={text}
          onChange={({ target }) => setText(target.value)}
          className="category-create-input"></input>
        <input type="color" value={color} onChange={({ target }) => setColor(target.value)}></input>
        <button onClick={createCategory} className="category-create">
          create
        </button>
      </div>
    </div>
  )
}

export default Categories
