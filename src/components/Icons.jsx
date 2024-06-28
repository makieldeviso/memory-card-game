import PlayOutlineIcon from '@mdi/react';
import ReplayIcon from '@mdi/react';
import { mdiPlayOutline, mdiReplay } from '@mdi/js';

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

export {PlayIcon, RestartIcon}