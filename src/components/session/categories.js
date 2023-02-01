import { useState } from 'react'
import categoryService from '../../services/categories'

const tempId = () => (Math.random() * 100).toFixed(0).toString()

const Categories = ({ categories, setCategories, selectedCategory, setSelectedCategory }) => {
  const [text, setText] = useState('')
  const selectedStyle = { background: 'black', color: 'white' }

  const createCategory = () => {
    const isCategoryExisting = categories.filter(({ name }) => name === text)
    if (!isCategoryExisting.length && text.length > 0) {
      const newCategory = { name: text, id: tempId(), submitted: false }
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
        }
      })
    }
  }

  return (
    <>
      <div>
        {categories.map(({ name, id, submitted }) => {
          return (
            <button
              style={selectedCategory.id === id ? selectedStyle : null}
              key={id}
              value={id}
              name={name}
              onClick={() => setSelectedCategory({ name: name, id: id, submitted: submitted })}>
              {name}
            </button>
          )
        })}
      </div>
      <div>
        <input type="text" value={text} onChange={({ target }) => setText(target.value)}></input>
        <button onClick={createCategory}>create category</button>
        {selectedCategory.id && !selectedCategory.submitted ? (
          <button onClick={removeCategory}>remove category</button>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Categories
