import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const formattedData = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageURL: eachTeam.team_image_url,
    }))

    setTimeout(() => {
      this.setState({teamsData: formattedData, isLoading: false})
    }, 500)
  }

  render() {
    const {teamsData, isLoading} = this.state

    return (
      <div className='home-container'>
        <div className='ipl-logo-container'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png'
            alt='ipl logo'
            className='ipl-logo'
          />
          <h1 className='header'>IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid='loader' className='loader-container'>
            <Loader type='Oval' color='#ffffff' height={50} width={50} />
          </div>
        ) : (
          <ul className='teams-list'>
            {teamsData.map(eachTeam => (
              <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
