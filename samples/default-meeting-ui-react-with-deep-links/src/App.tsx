import { useEffect, useState } from 'react';
import { useDyteClient } from '@dytesdk/react-web-core';
import { DyteMeeting } from '@dytesdk/react-ui-kit';

import './App.scss';
import Home from './components/Home';

function App() {
  const [state, setState] = useState<'idle' | 'meeting'>('idle');
  const [meeting, initMeeting] = useDyteClient({});

  useEffect(() => {
    console.log(window.location.href);
    const url = new URL(window.location.href);

    const authToken = url.searchParams.get('authToken');
    const roomName = url.searchParams.get('roomName') || '';

    if (!authToken) {
      return;
    }

    initMeeting({
      authToken,
      roomName,
    });
    setState('meeting');
  }, []);

  if (!meeting && state === 'idle') {
    return <Home />;
  }

  return <DyteMeeting meeting={meeting!} showSetupScreen />;
}

export default App;
