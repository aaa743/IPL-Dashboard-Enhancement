import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieChart from '../PieChart'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatchesData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerURL: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(each =>
        this.getFormattedData(each),
      ),
    }

    setTimeout(() => {
      this.setState({teamMatchesData: formattedData, isLoading: false})
    }, 500)
  }

  getPieChartData = () => {
    const {teamMatchesData} = this.state
    const {latestMatchDetails, recentMatches} = teamMatchesData
    const allMatches = [latestMatchDetails, ...recentMatches]

    const won = allMatches.filter(m => m.matchStatus === 'Won').length
    const lost = allMatches.filter(m => m.matchStatus === 'Lost').length
    const drawn = allMatches.filter(m => m.matchStatus === 'Drawn').length

    return [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]
  }

  render() {
    const {isLoading, teamMatchesData} = this.state
    const {match} = this.props
    const {id} = match.params

    return (
      <div className={`team-matches-container ${id.toLowerCase()}`}>
        {isLoading ? (
          <div data-testid='loader' className='loader-container'>
            <Loader type='Oval' color='#ffffff' height={50} width={50} />
          </div>
        ) : (
          <div className='responsive-container'>
            <img
              src={teamMatchesData.teamBannerURL}
              alt='team banner'
              className='team-banner'
            />
            <LatestMatch latestMatchData={teamMatchesData.latestMatchDetails} />
            <PieChart data={this.getPieChartData()} />
            <ul className='recent-matches-list'>
              {teamMatchesData.recentMatches.map(each => (
                <MatchCard key={each.id} matchDetails={each} />
              ))}
            </ul>
            <button
              type='button'
              className='back-button'
              onClick={() => this.props.history.push('/')}
            >
              Back
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
