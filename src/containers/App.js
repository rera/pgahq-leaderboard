import React, { useState, useEffect } from 'react';
import styles from './App.module.scss'

import Api from '../data/Api'
import { DataContext } from '../data/DataContext'

import Leaderboard from '../components/Leaderboard/Leaderboard'
import AddPlayer from '../components/AddPlayer/AddPlayer'

const App = () => {
  const [ players, setPlayers ] = useState([])
  const [ initialized, setInitialized ] = useState(false)
  const [ loading, setLoading ] = useState(true)

  const apiCall = async (call, preparePlayers) => {
    setLoading(true)
    const data = await call()
    const _players = preparePlayers(data)
    setPlayers(_players)
    setLoading(false)
  }

  const data = {
    loadPlayers: () => {
      apiCall( () => Api.allPlayers(), data => {
        return data
      })
    },
    addPlayer: player => {
      apiCall( () => Api.addPlayer(player), data => {
        let _players = [...players]
        _players.push(data)
        return _players
      })
    },
    editPlayer: player => {
      apiCall( () => Api.editPlayer(player),
        data => [...players].map(p => p.id === data.id ? data : p)
      )
    },
    deletePlayer: id => {
      apiCall( () => Api.deletePlayer(id),
        data => [...players].filter(p => p.id !== data.id)
      )
    }
  }

  useEffect(() => {
    if (!initialized) {
      data.loadPlayers()
      setInitialized(true)
    }
  }, [initialized])

  return (
    <DataContext.Provider value={data}>
      <div id='app'>
        <header>
          <AddPlayer />
        </header>
        {loading ?
          <div className={styles.loading}></div>
          :
          <Leaderboard players={players} />
        }
      </div>
    </DataContext.Provider>
  );
}

export default App;
