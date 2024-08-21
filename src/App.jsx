import logo from "./assets/logo.png";
import { AutoComplete, Checkbox, Divider, Input, Typography } from "antd";
import { useState } from "react";

const list = [
  {
    url: "https://www.chotot.com/",
    title: "Chợ Tốt",
    score: {
      tfIdf: 0.077,
      pageRank: 0.8,
    },
  },
  {
    url: "https://chothuoctot.vn",
    title: "Chợ Thuốc Tốt",
    score: {
      tfIdf: 0.047,
      pageRank: 0.5,
    },
  },
  {
    url: "https://www.thegioididong.com/",
    title: "Thế Giới Di Động",
    score: {
      tfIdf: 0.065,
      pageRank: 0.9,
    },
  },
  {
    url: "https://www.lazada.vn/",
    title: "Lazada",
    score: {
      tfIdf: 0.059,
      pageRank: 0.7,
    },
  },
  {
    url: "https://www.sendo.vn/",
    title: "Sendo",
    score: {
      tfIdf: 0.052,
      pageRank: 0.6,
    },
  },
  {
    url: "https://tiki.vn/",
    title: "Tiki",
    score: {
      tfIdf: 0.071,
      pageRank: 0.85,
    },
  },
  {
    url: "https://shopee.vn/",
    title: "Shopee",
    score: {
      tfIdf: 0.082,
      pageRank: 0.88,
    },
  },
  {
    url: "https://www.bachhoaxanh.com/",
    title: "Bách Hóa Xanh",
    score: {
      tfIdf: 0.053,
      pageRank: 0.65,
    },
  },
  {
    url: "https://www.vatgia.com/",
    title: "Vật Giá",
    score: {
      tfIdf: 0.049,
      pageRank: 0.55,
    },
  },
  {
    url: "https://www.fptshop.com.vn/",
    title: "FPT Shop",
    score: {
      tfIdf: 0.068,
      pageRank: 0.75,
    },
  },
  {
    url: "https://vnexpress.net/",
    title: "VnExpress",
    score: {
      tfIdf: 0.073,
      pageRank: 0.9,
    },
  },
];

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [options, setOptions] = useState([]);

  console.log(selectedItem);

  const handleSearch = (value) => {
    setSearchValue(value);
    setOptions(
      list
        .filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
        .map((item) => ({
          value: item.title,
          label: item.title,
        }))
    );
  };

  const onSelect = (value) => {
    const selected = list.find((item) => item.title === value);
    setSelectedItem(selected);
  };

  return (
    <div className="container mx-auto px-10 py-8 xl:py-4">
      <div className="flex gap-x-10">
        <img
          src={logo}
          className="select-none w-[150px] xl:w-[200px] 2xl:w-[250px]"
        />
        <div className="w-full h-full self-end mb-1">
          <div className="flex items-center gap-x-4">
            <AutoComplete
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
              value={searchValue}
              onChange={setSearchValue}
              style={{ width: "50%" }}
            >
              <Input.Search
                size="large"
                placeholder="Nhập từ khóa để tìm kiếm"
                enterButton
                onSearch={(value) => {
                  const selected = list.find((item) =>
                    item.title.toLowerCase().includes(value.toLowerCase())
                  );
                  setSelectedItem(selected);
                }}
              />
            </AutoComplete>

            <div>
              <Checkbox>Hiển thị top 10</Checkbox>
            </div>
          </div>
          <div className="text-gray-500 mt-2">
            Tìm thấy {list.length} kết quả
          </div>
        </div>
      </div>

      <div className="mx-[20%] mt-10">
        {list.map((item, index) => (
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
              <span className="text-[1.5rem]">{item.score.tfIdf}</span>
            </Typography.Text>
            <br />
            <Typography.Text>
              Trọng số PageRank:{" "}
              <span className="text-[1.5rem]">{item.score.pageRank}</span>
            </Typography.Text>
            {index !== list.length - 1 && (
              <Divider style={{ backgroundColor: "black" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
