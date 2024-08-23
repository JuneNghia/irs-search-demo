import logo from "./assets/logo.png";
import { Button, Checkbox, Divider, Typography } from "antd";
import { useCallback, useState } from "react";
import axios from "axios";
import Search from "antd/es/input/Search";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = useCallback(() => {
    axios
      .get("https://irs-search-be.onrender.com/search", {
        params: {
          query: searchValue,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, [searchValue]);

  return (
    <div className="container mx-auto px-10 py-8 xl:py-4">
      <div className="flex gap-x-10">
        <img
          src={logo}
          className="select-none w-[150px] xl:w-[200px] 2xl:w-[250px]"
        />
        <div className="w-full h-full self-end mb-1">
          <div className="flex items-center gap-x-4">
            <Search
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ width: "50%" }}
              onSubmit={handleSubmit}
            />

            <Button onClick={handleSubmit}>Tìm kiếm</Button>

            <div>
              <Checkbox>Hiển thị top 10</Checkbox>
            </div>
          </div>
          <div className="text-gray-500 mt-2">
            Tìm thấy {data.length} kết quả
          </div>
        </div>
      </div>

      <div className="mx-[20%] mt-10">
        {data.map((item, index) => (
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
              <span className="text-[1.5rem]">{item.cosine}-{item.euclid}</span>
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
        ))}
      </div>
    </div>
  );
}

export default App;
