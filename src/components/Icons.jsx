import PropTypes from 'prop-types'

import PlayOutlineIcon from '@mdi/react';
import ReplayIcon from '@mdi/react';
import { mdiPlayOutline, mdiReplay } from '@mdi/js';

import ball1 from '../assets/poke-ball.png';
import ball2 from '../assets/great-ball.png';
import ball3 from '../assets/ultra-ball.png';
import ball4 from '../assets/master-ball.png';

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

export {PlayIcon, RestartIcon, BallIcons}