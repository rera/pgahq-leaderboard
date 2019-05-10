import axios from 'axios'
import Player from '../Player.js'

const apiUrl = process.env.REACT_APP_API_URL

export default {
  allPlayers: async () => {
    try {
      const response = await axios.get(`${apiUrl}/players`)
      const players = response.data.data.reduce((a, p) => {
        a.push(new Player(p.id, p.firstName, p.lastName, p.score))
        return a
      }, [])
      return players
    } catch (error) {
      // @TODO: handle error
    }
  },
  createPlayer: async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/players`, {
        firstName: data.firstName,
        lastName: data.lastName,
        score: data.score
      })
      const p = response.data.data[0]
      const player = new Player(p.id, p.firstName, p.lastName, p.score)
      return player
    } catch (error) {
      // @TODO: handle error
    }
  },
  deletePlayer: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/players/${id}`)
			const p = response.data.data[0]
			const player = new Player(p.id, p.firstName, p.lastName, p.score)
			return player
    } catch (error) {
      // @TODO: handle error
    }
  }
}
