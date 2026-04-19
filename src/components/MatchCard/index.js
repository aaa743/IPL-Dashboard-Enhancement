import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = matchDetails

  const statusClassName = matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className='match-item'>
      <img
        src={competingTeamLogo}
        className='competing-team-logo'
        alt={`competing team ${competingTeam}`}
      />
      <p className='competing-team-name'>{competingTeam}</p>
      <p className='result'>{result}</p>
      <p className={`match-status ${statusClassName}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
