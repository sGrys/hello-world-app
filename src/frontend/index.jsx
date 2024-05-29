import React, { useEffect, useState } from "react";
import ForgeReconciler, { Text, Strong, DynamicTable, Stack, Inline, Box, Badge, Icon } from "@forge/react";
import { invoke } from "@forge/bridge";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke("getNotes", {}).then((data) => {
      setData(Array.isArray(data) ? data : []);
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);

  const head = {
    cells: [
      { key: "module", content: "Module", isSortable: true, width: 20 },
      { key: "type", content: "Type", isSortable: false, width: 10 },
      { key: "description", content: "Description", isSortable: false }
    ]
  };

  const getIconOrBadge = (type) => {
    if (type.toLowerCase() === "feature") {           return <Icon glyph="suitcase" label="Feature" />;}
    else if (type.toLowerCase() === "bug") {          return <Icon glyph="warning" label="Bug" />;}
    else if (type.toLowerCase() === "task") {         return <Icon glyph="task" label="Task" />;}
    else if (type.toLowerCase() === "enhancement") {  return <Icon glyph="add" label="Enhancement" />;}
    else {return null;}
  };

  const rows = data ? data.flatMap(item => 
    (item.items || []).sort((a, b) => a.module.localeCompare(b.module)).map((moduleItem, index) => ({
      key: `${item.versionNumber}-${moduleItem.module}-${index}`,
      cells: [
        {
          key: "module", 
          content: (
            <Stack alignBlock="start">
              <Box padding="space.200">
                <Text>{moduleItem.module}</Text>
              </Box>
            </Stack>
          )
        },
        {
          key: "type",
          content: (
              <Box padding="space.200">
                {getIconOrBadge(moduleItem.type)}
              </Box>
          )
        },
        {
          key: "description",
          content: (
            <Stack space="space.100">
              <Strong>{moduleItem.title}</Strong>
              <Text>{moduleItem.description}</Text>
            </Stack>
          )
        }
      ]
    }))
  ) : [];

  const highlightedRows = rows.map((_, index) => index).filter(index => index % 2 === 0);

  return (
    <Stack space="large">
      {data ? data.map(item => (
        <Box key={item.versionNumber} padding="space.200">
          <Strong>{`${item.name}`}</Strong>
          <Text>{`Release date: ${item.releaseDate}`}</Text>
          <DynamicTable
            head={head}
            rows={rows.filter(row => row.key.startsWith(`${item.versionNumber}-`))}
            highlightedRowIndex={highlightedRows}
            emptyView="No data to display"
          />
        </Box>
      )) : (
        <Text>Loading data...</Text>
      )}
    </Stack>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);