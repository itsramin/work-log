const Btn = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className="btn">
      {title}
    </div>
  );
};

export default Btn;
