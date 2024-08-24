import { useCallback, useState } from "react";
import logo from "../assets/logo.png";
import logoHutech from "../assets/hutech.png";
import Search from "antd/es/input/Search";
import PropTypes from "prop-types";
import ParticlesBackground from "./ParticalsBackground";
import { message } from "antd";

const Home = ({ handleSubmit, setIsSubmitted }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [tempSearch, setTempSearch] = useState("");

  const handleSearch = useCallback(() => {
    if (tempSearch) {
      handleSubmit(tempSearch);
      setIsSubmitted(true);
    } else {
      messageApi.info("Nhập từ khóa để tìm kiếm");
    }
  }, [handleSubmit, messageApi, setIsSubmitted, tempSearch]);

  return (
    <>
      {contextHolder}
      <ParticlesBackground />

      <div className="flex flex-col gap-y-10 items-center justify-center h-[80vh]">
        <div className="fixed right-0 top-0 flex flex-col items-center">
          <img src={logoHutech} width={150} />
        </div>
        <img src={logo} width={350} />
        <Search
          placeholder="6 anh em nhóm 7 đẹp trai nhất hành tinh gồm những ai ?"
          size="large"
          onChange={(e) => setTempSearch(e.target.value)}
          className="w-[50%]"
          onSearch={handleSearch}
        />
      </div>
    </>
  );
};

Home.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
  setIsSubmitted: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Home;
