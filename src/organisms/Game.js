import React, { PureComponent } from 'react'
import makeOrganism from 'react-organism'
import Board from '../components/Board'
import HeaderCounter from '../components/HeaderCounter'
import Timer from '../components/Timer'
import * as gameModel from '../models/game'
import { gameStates } from '../models/base'

function render({
  gameState,
  columns,
  rows,
  snake1,
  foodXY,
  pointsCount = 0,
  startedAt,
  finishedAt,
  handlers
}, refs) {
  return <div ref={ refs.mainEl }>
    <header className='game-header mb-3'>
      <HeaderCounter count={ pointsCount } />
      <button
        className='button -raised -start'
        onMouseDown={ handlers.beginRestart}
        onClick={ handlers.completeRestart }
      >
        {
          (gameState === gameStates.gameOver) ? (
            <span role='img' aria-label='Game over: restart game'>
              😵
            </span>
          ) : (gameState === gameStates.winner) ? (
            <span role='img' aria-label='Restart game'>
              😎
            </span>
          ) : (gameState === gameStates.beginningMove) ? (
            <span role='img' aria-label='Restart game'>
              😮
            </span>
          ) : (
            <span role='img' aria-label='Start game'>
              😃
            </span>
          )
        }
      </button>
      <Timer
        startedAt={ startedAt }
        finishedAt={ finishedAt  }
      />
    </header>
    <Board
      gameState={ gameState }
      columns={ columns }
      rows={ rows }
      snake1={ snake1 }
      foodXY={ foodXY }
      onKeyChangeDirection={ handlers.changeSnakeDirection }
    />
  </div>
}

class Game extends PureComponent {
  setMainEl = (el) => { this.mainEl = el }

  render() {
    return render(this.props, { mainEl: this.setMainEl })
  }

  componentDidMount() {
    this.tickInterval = setInterval(() => {
      this.props.handlers.tick()
    }, 120)

    this.mainEl.focus()
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval)
  }
}

export default makeOrganism(Game, gameModel)
