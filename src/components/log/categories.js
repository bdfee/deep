import { useState } from 'react'

const Categories = ({ categories, setCategories, selectedCategory, setSelectedCategory }) => {
  const [text, setText] = useState('')

  const selectedStyle = { background: 'black', color: 'white' }

  const createCategory = () => {
    const isCategoryExisting = categories.filter((category) => category === text)
    console.log(isCategoryExisting)
    if (!isCategoryExisting.length) {
      setCategories(categories.concat(text))
      setText('')
    }
  }

  return (
    <>
      <div>
        {categories.map((category) => {
          return (
            <button
              style={selectedCategory === category ? selectedStyle : null}
              key={category}
              value={category}
              onClick={({ target }) => setSelectedCategory(target.value)}>
              {category}
            </button>
          )
        })}
      </div>
      <div>
        <input type="text" value={text} onChange={({ target }) => setText(target.value)}></input>
        <button onClick={createCategory}>create category</button>
      </div>
    </>
  )
}

export default Categories
