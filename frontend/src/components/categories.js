import { useState } from 'react'
import categoryService from '../services/categories'
import { tempId } from './utility'
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

  const createCategory = () => {
    const isCategoryExisting = categories.filter(({ name }) => name === text)
    if (!isCategoryExisting.length && text.length > 0) {
      const newCategory = { name: text, id: tempId(), totalTime: 0 }
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
      <h2>categories</h2>
      <ul>
        {categories.map(({ name, id, totalTime }) => {
          return (
            <li key={id}>
              {name} {totalTime}{' '}
              {!totalTime ? (
                <button onClick={() => removeCategory(id)}>remove category</button>
              ) : (
                ''
              )}
            </li>
          )
        })}
      </ul>
      <input type="text" value={text} onChange={({ target }) => setText(target.value)}></input>
      <button onClick={createCategory}>create category</button>
    </div>
  )
}

export default Categories
