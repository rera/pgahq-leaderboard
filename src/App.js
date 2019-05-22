import React, { useState, useEffect } from 'react'
import { PlayerContext } from './data/DataContext'
import Leaderboard from './components/Leaderboard'
import NewPlayer from './components/NewPlayer'
import api from './data/api'

const App = (props) => {
  const [players, setPlayers] = useState([])
  const [initialized, setInitialized] = useState(false)
  const [loading, setLoading] = useState(true)

  const apiCall = async (call, formatResponse) => {
    setLoading(true)
    const data = await call()
    await setPlayers( formatResponse(data) )
    setLoading(false)
  }

  const data = {
    loadPlayers: () => {
      apiCall(
        () => api.allPlayers(),
        (data) => data
      )
    },
    addPlayer: (player) => {
      apiCall(
        () => api.createPlayer(player),
        (data) => players.concat(data)
      )
    },
    editPlayer: (player) => {
      apiCall(
        () => api.editPlayer(player),
        (data) => players.filter(a => a.id !== data.id).concat(data)
      )
    },
    deletePlayer: (player) => {
      apiCall(
        () => api.deletePlayer(player.id),
        (data) => players.filter(a => a.id !== data.id)
      )
    }
  }

  useEffect(() => {
    if (!initialized) {
      data.loadPlayers()
      setInitialized(true)
    }
  }, [initialized, data])

  return (
    <div id='page' className={loading ? 'loading' : 'loaded'}>
      <PlayerContext.Provider value={data}>
        <header>
          <NewPlayer />
        </header>
        <Leaderboard players={players} />
      </PlayerContext.Provider>
    </div>
  )
}
export default App
