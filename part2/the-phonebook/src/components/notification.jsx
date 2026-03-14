const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return type ? (
    <div className="notification" style={{ color: "green" }}>
      {message}
    </div>
  ) : (
    <div className="notification" style={{ color: "red" }}>
      {message}
    </div>
  );
};

export default Notification;
