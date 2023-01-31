import { useState } from 'react'

const tempId = () => (Math.random() * 100).toFixed(0).toString()

const Categories = ({ categories, setCategories, selectedCategory, setSelectedCategory }) => {
  const [text, setText] = useState('')
  const selectedStyle = { background: 'black', color: 'white' }

  const createCategory = () => {
    const isCategoryExisting = categories.filter(({ name }) => name === text)
    if (!isCategoryExisting.length && text.length > 0) {
      const newCategory = { name: text, id: tempId() }
      setCategories(categories.concat(newCategory))
      setText('')
    }
  }

  const removeCategory = () => {
    if (selectedCategory.id) {
      setCategories(categories.filter(({ id }) => id !== selectedCategory.id))
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
