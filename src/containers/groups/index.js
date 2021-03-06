import React from 'react';
import TeamFlag from '../../components/TeamFlag.js';
import TeamCard from '../../components/TeamCard';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.url = `https://worldcup.sfg.io/teams/group_results`;
    this.state = { data: [], error: '' };
  }

  componentWillUnmount() {
    document.querySelector('.loading__wrapper').classList.remove('loaded');
  }

  componentDidMount() {
    let localslip = this;
    let data = {};

    fetch(this.url)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        data = result;
        setTimeout(function() {
          localslip.setState({ data: data });
          document.querySelector('.loading__wrapper').classList.add('loaded');
        }, 2000);
      })
      .catch(function(err) {
        document.querySelector('.loading__wrapper').classList.add('loaded');
        console.log(err);
      });
  }

  render() {
    if (this.state.data.length > 0) {
      var TeamNodes = this.state.data.map(function(g, i) {
        var teamGroup = g;
        var list = teamGroup.ordered_teams.map(function(t, j) {
          var team = t;
          console.log(team);
          return (
            <tr key={j}>
              <td>
                <TeamFlag code={team.fifa_code} size={16} />
                {team.country}
              </td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goals_for}</td>
              <td>{team.goals_against}</td>
              <td>{team.goal_differential}</td>
              <td>{team.points}</td>
            </tr>
          );
        });

        return (
          <div className="card card--square group" key={i}>
            <header className="card__header">
              <h2 className="card__title card__title--large">
                <small>Groupe</small> {teamGroup.letter}
              </h2>
            </header>
            <div className="card__content">
              <table className="card__scores">
                <thead>
                  <tr>
                    <th>Equipe</th>
                    <th>V</th>
                    <th>N</th>
                    <th>D</th>
                    <th>BP</th>
                    <th>BC</th>
                    <th>GA</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>{list}</tbody>
              </table>
            </div>
          </div>
        );
      });
    }
    return <section className="teamList display--column">{TeamNodes}</section>;
  }
}

export default Groups;
