import React, { useEffect, useState } from 'react'
import "./App.css"
import axios from 'axios'

const App = () => {

  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [query, setQuery] = useState("")

  const getData = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        setData(res.data.results)
        setOriginalData(res.data.results)
      })
      .catch(err => {
        console.log("Error getting data: " + err)
      })
  }

  const handleSearch = () => {
    if (originalData.length == 0) {
      return;
    }
    if (query.length == 0) {
      setData(originalData)
      return;
    }
    const temp = [];
    originalData.forEach(element => {
      if (element.name.toLowerCase().includes(query.toLowerCase())) {
        temp.push(element)
      }
    });
    setData(temp)
  }
  useEffect(() => {
    setTimeout(() => {
      handleSearch()
    }, 1000);
  }, [query])
  useEffect(() => {
    return () => getData();
  }, [])

  return (
    <div>
      <h1 id='heading'>Pokemon Information</h1>
      <input type="text" value={query} onChange={(e) => {
        setQuery(e.target.value)
      }} />
      <div className='scrollar'>
        {data.length > 0 ? data.map((pokemon, id) => (
          <div className='card' key={id}>
            <img src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/0${pokemon.url.slice(34, pokemon.url.length - 1).padStart(2, 0)}.png`} alt="" />
            <h1>{pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1, pokemon.name.length)}</h1>
          </div>
        )) : null}
      </div>
    </div>
  )
}

export default App