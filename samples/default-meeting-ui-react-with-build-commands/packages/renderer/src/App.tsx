import React, { useState } from 'react';
import Meeting from './components/Meeting';
import { addParticipant, createMeeting } from './lib/requests';
import useInputs from './lib/useInputs';

type CommonProps = {
  setAction: React.Dispatch<React.SetStateAction<MeetingAction>>;
};

function MeetingCreate({ setAction }: CommonProps) {
  const { values, onInput } = useInputs({ name: '', title: '' });

  return (
    <form
      className="w-full"
      onSubmit={async (e) => {
        e.preventDefault();

        if (values.name.trim() === '' && values.title.trim() === '') return;

        const data = await createMeeting({ title: values.title });
        if (data) {
          const authToken = await addParticipant({
            ...data,
            displayName: values.name,
            clientSpecificId: values.name + '-' + Math.random().toString(32).substring(2),
          });
          if (authToken) {
            setAction({
              type: 'meeting',
              data: {
                roomName: data.roomName,
                authToken: authToken,
              },
            });
          }
        }
      }}
    >
      <h2>Create a meeting</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
          onInput={onInput('name')}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Meeting Title"
          name="title"
          value={values.title}
          onInput={onInput('title')}
        />
      </div>
      <div className="form-group">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

function MeetingJoin({ setAction }: CommonProps) {
  const { values, onInput } = useInputs({ roomName: '', name: '' });

  return (
    <form
      className="w-full"
      onSubmit={async (e) => {
        e.preventDefault();

        if (values.name.trim() === '' && values.roomName.trim() === '') return;

        const authToken = await addParticipant({
          roomName: values.roomName,
          displayName: values.name,
          clientSpecificId: values.name + '-' + Math.random().toString(32).substring(2),
        });

        if (authToken) {
          setAction({
            type: 'meeting',
            data: {
              authToken,
              roomName: values.roomName,
            },
          });
        }
      }}
    >
      <h2>Join a meeting</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Room Name"
          name="roomName"
          value={values.roomName}
          onInput={onInput('roomName')}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
          onInput={onInput('name')}
        />
      </div>

      <div className="form-group">
        <button type="submit">Join</button>
      </div>
    </form>
  );
}

export type MeetingAction =
  | { type: 'create' | 'join' }
  | { type: 'meeting'; data: { authToken: string; roomName: string } };

const App = () => {
  const [action, setAction] = useState<MeetingAction>({ type: 'create' });

  if (action.type === 'meeting') {
    return <Meeting {...action.data} setAction={setAction} />;
  }

  return (
    <div className="flex h-full w-full flex-col place-items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-4">
        <div role="tabs" className="flex gap-2">
          <button
            className="rounded-full bg-zinc-800 px-4 py-2 text-zinc-200"
            role="tabitem"
            onClick={() => setAction({ type: 'create' })}
          >
            Create
          </button>
          <button
            className="rounded-full bg-zinc-800 px-4 py-2 text-zinc-200"
            role="tabitem"
            onClick={() => setAction({ type: 'join' })}
          >
            Join
          </button>
        </div>
        {action.type === 'create' && <MeetingCreate setAction={setAction} />}
        {action.type === 'join' && <MeetingJoin setAction={setAction} />}
      </div>
    </div>
  );
};

export default App;
