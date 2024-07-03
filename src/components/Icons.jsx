import PropTypes from 'prop-types'

import PlayOutlineIcon from '@mdi/react';
import ReplayIcon from '@mdi/react';
import GithubIcon from '@mdi/react';
import { mdiPlayOutline, mdiReplay, mdiGithub } from '@mdi/js';

import ballLogo from '../assets/icon.png';
import ball1 from '../assets/poke-ball.png';
import ball2 from '../assets/great-ball.png';
import ball3 from '../assets/ultra-ball.png';
import ball4 from '../assets/master-ball.png';

import gameOverIcon from '../assets/game-over.gif';
import newHighIcon from '../assets/new-high.gif';

const BallIcons = function ({level}) {
  const iconsArr = [ball1, ball2, ball3, ball4];
  const index = level <= 4 ? level - 1 : 4 - 1;

  return (
    <img src={iconsArr[index]} alt={`level-${level}`} className='level-icon'/>
  )
}
BallIcons.propTypes = {
  level: PropTypes.number
}

const GameOverIcon = function ({ newHigh }) {
  const imgAttributes = {
    src: newHigh ? newHighIcon : gameOverIcon,
    alt: newHigh ? 'New high score' : 'Game over',
    className: 'game-over-icon'
  }

  return (
    <img {...imgAttributes}/>
  )
}
GameOverIcon.propTypes = {
  newHigh: PropTypes.bool
}

const Logo = function () {
  return (
    <img src={ballLogo} alt="logo" className='page-logo'/>
  )
}


const PlayIcon = function () {
  return (
    <PlayOutlineIcon path={mdiPlayOutline}/>
  )
}

const RestartIcon = function () {
  return (
    <ReplayIcon path={mdiReplay}/>
  )
}

const Github = function () {
  return (
    <GithubIcon path={mdiGithub} size={1} />
  )
}

export {Logo, PlayIcon, RestartIcon, BallIcons, GameOverIcon, Github}