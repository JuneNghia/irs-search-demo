import logo from "./assets/logo.png";
import logoHutech from "./assets/hutech.png";
import { Alert, Checkbox, Divider, message, Spin, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Search from "antd/es/input/Search";
import Home from "./components/Home";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTop10, setShowTop10] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleShowTop10 = useCallback(() => {
    setShowTop10((prev) => !prev);
  }, []);

  const handleSearch = useCallback(
    (tempSearch) => {
      setIsLoading(true);

      if (tempSearch) {
        setSearchValue(tempSearch);
      }

      if (!tempSearch && isSubmitted && !searchValue) {
        messageApi.info("Nhập từ khóa để tìm kiếm");
        setIsLoading(false)
        return
      }

      axios
        .get("https://irs-search-be.onrender.com/search", {
          params: {
            query: isSubmitted ? searchValue.trim() : tempSearch.trim(),
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          <Alert
            message="Lỗi tải dữ liệu"
            description={`Lỗi: ${err}`}
            type="error"
          />;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [isSubmitted, messageApi, searchValue]
  );

  useEffect(() => {
    const filterData = showTop10 ? data.slice(0, 10) : data;

    setFilteredData(filterData);
  }, [data, showTop10]);

  return isSubmitted ? (
    <div className="relative">
      {contextHolder}
      <div className="absolute right-0 top-0 flex flex-col items-center">
        <img src={logoHutech} width={150} />
      </div>

      <div className="container mx-auto px-10 py-8 xl:py-4">
        <div className="flex gap-x-10">
          <img
            src={logo}
            onClick={() => location.reload()}
            className="select-none w-[150px] xl:w-[200px] 2xl:w-[250px] cursor-pointer"
          />
          <div className="w-full h-full self-end mb-1">
            <div className="flex items-center gap-x-4">
              <Search
                loading={isLoading}
                disabled={isLoading}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={handleSearch}
                size="large"
                style={{
                  width: "70%",
                  fontSize: `40px !important`,
                }}
              />

              <div>
                <Checkbox checked={showTop10} onChange={handleShowTop10}>
                  Hiển thị top 10
                </Checkbox>
              </div>
            </div>
            <div className="text-gray-500 mt-2">
              Tìm thấy {data.length} kết quả
            </div>
          </div>
        </div>

        {isLoading ? (
          <Spin tip="Đang tải" size="large">
            <div className="mt-[20%]" />
          </Spin>
        ) : (
          <div className="mx-[20%] mt-10">
            {filteredData.length ? (
              filteredData.map((item, index) => (
                <div className="mb-6" key={index}>
                  <Typography.Title level={3}>
                    {index + 1}. {item.title}
                  </Typography.Title>
                  <Typography.Link href={item.url} target="blank">
                    {item.url}
                  </Typography.Link>
                  <br />
                  <Typography.Text>
                    Trọng số TF-IDF:{" "}
                    <span className="text-[1.5rem]">
                      {item.cosine}-{item.euclid}
                    </span>
                  </Typography.Text>
                  <br />
                  <Typography.Text>
                    Trọng số PageRank:{" "}
                    <span className="text-[1.5rem]">{item.rank}</span>
                  </Typography.Text>
                  {index !== data.length - 1 && (
                    <Divider style={{ backgroundColor: "black" }} />
                  )}
                </div>
              ))
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Home handleSubmit={handleSearch} setIsSubmitted={setIsSubmitted} />
  );
}

export default App;
