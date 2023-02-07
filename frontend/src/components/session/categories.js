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
        if (res.status === 204) {
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
        <select name="category" id="category-select">
          <option value="">select category</option>
          {categories.map(({ name, id, totalTime }) => {
            return (
              <option
                key={id}
                value={id}
                name={name}
                onSelect={() => setSelectedCategory({ name, id, totalTime })}>
                {name}
              </option>
            )
          })}
        </select>
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
