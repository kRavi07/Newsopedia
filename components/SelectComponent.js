import { View } from "react-native";
import React, { memo, useState, useEffect, useContext } from "react";
import { Select } from "native-base";
import { CheckIcon } from "native-base";
import axios from "axios";
import { getSources } from "../API/util";
import { NewsContext } from "../API/Context";
const MemoizedSelectItem = memo(({ label, value }) => (
  <Select.Item label={label} value={value} />
));

const SelectComponent = () => {
  const [sources, setSources] = useState([]);
  const [sourceLoading, setSourceLoading] = useState(false);

  const { searchSource, setSearchSource } = useContext(NewsContext);
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const { data } = await axios.get(getSources());
        const filteredSources = data.sources.filter(
          (source) => source.language === "en"
        );
        setSourceLoading(false);
        setSources(filteredSources);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSources();
  }, []);

  return (
    <View style={{ width: "100%" }}>
      <Select
        selectedValue={searchSource}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Choose News Source"
        _selectedItem={{
          bg: "teal.600",
          color: "text.600",
          endIcon: <CheckIcon size="5" />,
        }}
        _placeholder={{
          color: "white.500",
        }}
        color="white"
        mt={1}
        onValueChange={(itemValue) => setSearchSource(itemValue)}
      >
        {sourceLoading ? (
          <Select.Item label="Loading..." value="Loading..." />
        ) : (
          sources.map((source) => (
            <MemoizedSelectItem
              key={source.id}
              label={`${source.name}(${source.country}) `}
              value={source.id}
            />
          ))
        )}
      </Select>
    </View>
  );
};

export default SelectComponent;
