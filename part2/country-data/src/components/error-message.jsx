const ErrorMessage = (message) => {
  return (
    <div
      style={{
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {`There was an error fetching ${message.message} data.`}
    </div>
  );
};

export default ErrorMessage;
