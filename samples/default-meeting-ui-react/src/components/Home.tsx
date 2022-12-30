import { APP_PROTOCOL } from '../../electron/config';
import logo from '../assets/logo.svg';

const protocol = APP_PROTOCOL;

export default function Home() {
  return (
    <div className="center-screen">
      <img src={logo} alt="Dyte Logo" className="logo" height={42} />
      <p className="text-center">
        Open a <code>{protocol}://?authToken=&lt;your-token&gt;</code> deep link
        to join a meeting.
      </p>
    </div>
  );
}
