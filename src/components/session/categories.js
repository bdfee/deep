import { useState } from 'react'
import categoryServices from '../../services/categories'

const tempId = () => (Math.random() * 100).toFixed(0).toString()

const Categories = ({ categories, setCategories, selectedCategory, setSelectedCategory }) => {
  const [text, setText] = useState('')

  const selectedStyle = { background: 'black', color: 'white' }

  const createCategory = () => {
    const isCategoryExisting = categories.filter((category) => category.name === text)
    if (!isCategoryExisting.length && text.length > 0) {
      const newCategory = { name: text, id: tempId() }
      categoryServices.create(newCategory).then((res) => {
        setCategories(categories.concat(res.data))
        setText('')
      })
    }
  }

  const removeCategory = () => {
    if (selectedCategory.id) {
      categoryServices.remove(selectedCategory.id).then((res) => {
        if (res.status === 200) {
          setCategories(categories.filter((category) => category.id !== selectedCategory.id))
        }
      })
    }
  }

  return (
    <>
      <div>
        {categories.map(({ name, id }) => {
          return (
            <button
              style={selectedCategory.id === id ? selectedStyle : null}
              key={id}
              value={id}
              name={name}
              onClick={({ target }) => setSelectedCategory({ name: name, id: target.value })}>
              {name}
            </button>
          )
        })}
      </div>
      <div>
        <input type="text" value={text} onChange={({ target }) => setText(target.value)}></input>
        <button onClick={createCategory}>create category</button>
        <button onClick={removeCategory}>remove category</button>
      </div>
    </>
  )
}

export default Categories
