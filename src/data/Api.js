import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const createPlayer = (p) => {
  return {
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    score: p.score
  }
}

export default {
  allPlayers: async () => {
    try {
      const response = await axios.get(`/players`)
      return response.data.data.map(p => createPlayer(p))
    } catch (error) {
      console.log(error)
    }
  },
  addPlayer: async (player) => {
    try {
      const response = await axios.post(`/players`, {
        firstName: player.firstName,
        lastName: player.lastName,
        score: Number(player.score)
      })
      return createPlayer(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  },
  editPlayer: async (player) => {
    try {
      const response = await axios.put(`/players/${player.id}`, {
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        score: player.score
      })
      return createPlayer(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  },
  deletePlayer: async (id) => {
    try {
      const response = await axios.delete(`/players/${id}`)
      return createPlayer(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
}
