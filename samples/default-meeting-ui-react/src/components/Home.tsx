import logo from '../assets/logo.svg';

export default function Home() {
  return (
    <div className="center-screen">
      <img src={logo} alt="Dyte Logo" className="logo" height={42} />
      <p className="text-center">
        If you've set your APP_PROTOCOL to dyte-sample, open a{' '}
        <code>dyte-sample://?authToken=&lt;your-token&gt;</code> deep link to
        join a meeting.
      </p>
    </div>
  );
}
