import axios from 'axios'
import Player from '../Player.js'

const apiUrl = process.env.REACT_APP_API_URL

const createPlayer = (p) => {
  return new Player(p.id, p.firstName, p.lastName, p.score)
}

export default {
  allPlayers: async () => {
    try {
      const response = await axios.get(`${apiUrl}/players`)
      return response.data.data.map(p => createPlayer(p))
    } catch (error) {
      console.log(error)
    }
  },
  createPlayer: async (player) => {
    try {
      const response = await axios.post(`${apiUrl}/players`, {
        firstName: player.name.firstName,
        lastName: player.name.lastName,
        score: Number(player.score)
      })
      return createPlayer(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  },
  editPlayer: async (player) => {
    try {
      const response = await axios.put(`${apiUrl}/players/${player.id}`, {
        id: player.id,
        firstName: player.name.firstName,
        lastName: player.name.lastName,
        score: player.score
      })
      return createPlayer(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  },
  deletePlayer: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/players/${id}`)
      return createPlayer(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
}
