import { useState } from 'react'
import categoryService from '../../services/categories'
import { tempId } from '../utility'
import itemService from '../../services/items'

const Categories = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  items,
  setItems
}) => {
  const [text, setText] = useState('')
  const selectedStyle = { background: 'black', color: 'white' }

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

  const removeCategory = () => {
    if (selectedCategory.id) {
      categoryService.remove(selectedCategory.id).then((res) => {
        if (res.status === 200) {
          setCategories(categories.filter(({ id }) => id !== selectedCategory.id))
          setSelectedCategory('')

          const updatedItems = items.filter(({ id }) => id !== selectedCategory.id)
          if (updatedItems.length) {
            itemService.deleteItem(selectedCategory.id).then(() => {
              setItems(updatedItems)
            })
          }
        }
      })
    }
  }

  return (
    <>
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
      <div>
        <input type="text" value={text} onChange={({ target }) => setText(target.value)}></input>
        <button onClick={createCategory}>create category</button>
        {selectedCategory.id && !selectedCategory.totalTime ? (
          <button onClick={removeCategory}>remove category</button>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Categories
