import { useEffect, useRef, useState } from 'react';
import DyteClient from '@dytesdk/web-core/inlined';
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { MeetingAction } from '@/App';
import { ENV } from '../lib/requests';

type CommonProps = {
  setAction: React.Dispatch<React.SetStateAction<MeetingAction>>;
};

type Props = {
  authToken: string;
  roomName: string;
} & CommonProps;

export default function Meeting({ authToken, roomName, setAction }: Props) {
  const runOnce = useRef(false);
  const [meeting, setMeeting] = useState<DyteClient>();

  useEffect(() => {
    (async () => {
      if (!runOnce.current) {
        const m = await (DyteClient.init || window.DyteClient.init)({
          roomName,
          authToken,
          defaults: { audio: false, video: false },
          apiBase: `https://api.${ENV === 'app' ? 'cluster' : 'staging'}.dyte.in`,
        });
        setMeeting(m);

        m.self.on('roomLeft', () => {
          setAction({ type: 'create' });
        });
      }
    })();
  }, []);

  const url = `https://${ENV}.dyte.io/${roomName}`;

  return (
    <div className="box-border flex h-full w-full flex-col bg-black">
      <header className="flex items-center justify-center border-b border-zinc-800 bg-black px-6 py-2 text-zinc-200">
        <button
          onClick={() => {
            (window as any).openLinkInBrowser(url);
          }}
          className="text-sm underline-offset-2 hover:underline"
        >
          {url}
        </button>
      </header>
      <DyteMeeting
        mode="fill"
        meeting={meeting!}
        showSetupScreen
        className="box-border flex-grow"
      />
    </div>
  );
}
