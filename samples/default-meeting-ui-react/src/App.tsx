import { useEffect, useState } from 'react';
import { useDyteClient } from '@dytesdk/react-web-core';
import { DyteMeeting } from '@dytesdk/react-ui-kit';

import logo from './assets/logo.svg';
import './App.scss';

function App() {
  const [state, setState] = useState<'idle' | 'meeting'>('idle');
  const [meeting, initMeeting] = useDyteClient();

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
    return (
      <div className="center-screen">
        <img src={logo} alt="Dyte Logo" className="logo" height={42} />
        <p>
          Open a <code>dyte-sample://</code> deep link to join a meeting.
        </p>
      </div>
    );
  }

  return <DyteMeeting meeting={meeting!} showSetupScreen />;
}

export default App;
