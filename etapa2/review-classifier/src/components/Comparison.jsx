import React from 'react'
import { Card } from 'react-bootstrap'

const Comparison = ({ value, prediction, option }) => {

  const setColors = (val, pred) => {
    return (Math.abs(val - pred) > 1)? {backgroundColor:'red', color: 'white'}:{backgroundColor:'green'}
  }

  return (
    <Card>
        { (option === "Yes")? 
            (<Card.Title className='differenceValue' style={setColors(value, prediction)}>
                Difference: { Math.abs(value - prediction) }
            </Card.Title>)
            : 
            <>
            </> 
        }
        
        <table className='vsTable'>
            <thead sm={6}>
                <tr>
                    <th>Predicted Score</th>
                    { (option === "Yes")? <th>Provided Score</th> : <></> }
                </tr>
            </thead>
            <tbody sm={6}>
                <tr>
                    <td>{ prediction }</td>
                    { (option === "Yes")? <td>{ value }</td> : <></> }
                </tr>
            </tbody>
        </table>
    </Card>
  )
}

export default Comparison