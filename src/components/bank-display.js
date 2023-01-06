import PropTypes from 'prop-types'
import { useState } from 'react'

const BankDisplay = (props) => {
  const [input, setInput] = useState('')

  const handleAddCategory = () => {
    props.setUserBank(props.bank.concat(input))
  }

  return (
    <div>
      banklist
      <div>
        <ul>
          {props.bank.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
        add new category
        <input type="text" value={input} onChange={({ target }) => setInput(target.value)}></input>
        <button onClick={handleAddCategory}>add</button>
      </div>
    </div>
  )
}

export default BankDisplay

BankDisplay.propTypes = {
  bank: PropTypes.array,
  setUserBank: PropTypes.func
}
