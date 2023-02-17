export const ENV: 'staging' | 'app' = 'app';
const API_BASE = `https://${ENV}.dyte.in`;

interface MeetingCreateForm {
  title: string;
}

const createMeeting = async (
  values: MeetingCreateForm
): Promise<null | { meetingId: string; roomName: string }> => {
  const payload: any = {
    title: values.title,
    authorization: {
      waitingRoom: false,
    },
  };

  const res = await fetch(`${API_BASE}/api/meeting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    alert(`Something went wrong while creating a meeting. \nTry again in some time.`);
    return null;
  }

  const data = await res.json();

  const {
    meeting: { id: meetingId, roomName },
  } = data;

  return { meetingId, roomName };
};

interface AddParticipantParams {
  meetingId?: string;
  roomName?: string;
  clientSpecificId?: string;
  displayName?: string;
  isHost?: boolean;
  isWebinar?: boolean;
}

const addParticipant = async ({
  meetingId,
  roomName,
  clientSpecificId,
  displayName,
  isHost = false,
  isWebinar = false,
}: AddParticipantParams): Promise<null | string> => {
  const payload = {
    clientSpecificId,
    isHost,
    isWebinar,
    displayName,
    ...(isHost ? { meetingId } : { roomName }),
  };

  const res = await fetch(`${API_BASE}/api/participant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    alert(`Something went wrong while adding participant. \nTry again in some time.`);
    return null;
  }

  const data = await res.json();

  return data.authResponse.authToken;
};

export { createMeeting, addParticipant };
export type { MeetingCreateForm };
