import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const Navigate = useNavigate();
  return (
    <div onClick={() => Navigate("/calculate-bmi")}>
      <img
        src="https://s3-alpha.figma.com/hub/file/1104003948/5675237c-2620-45de-a5c1-2ed3893c7a56-cover.png"
        alt="err"
      />
    </div>
  );
};

export default NotFound;


