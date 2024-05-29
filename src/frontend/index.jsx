import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Strong, DynamicTable, Stack, Inline, Box, Icon, Spinner, Lozenge, xcss } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getNotes', {}).then((data) => {
      console.log('Fetched data:', data);
      setData(Array.isArray(data) ? data : []);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const head = {
    cells: [
      { key: 'type', content: '', isSortable: false, width: 10 },
      { key: 'description', content: '', isSortable: false, width: 90 }
    ]
  };

  const getIcon = (type) => {
    if (type.toLowerCase() === "feature") {
      return <Icon size="medium" glyph="suitcase" label="Feature" />;
    } else if (type.toLowerCase() === "bug") {
      return <Icon size="medium" glyph="warning" label="Bug" />;
    } else if (type.toLowerCase() === "task") {
      return <Icon size="medium" glyph="task" label="Task" />;
    } else if (type.toLowerCase() === "enhancement") {
      return <Icon size="medium" glyph="add" label="Enhancement" />;
    } else {
      return null;
    }
  };

  const groupByModule = (items) => {
    if (!items) return [];

    const grouped = items.reduce((acc, item) => {
      if (!acc[item.module]) {
        acc[item.module] = [];
      }
      acc[item.module].push(item);
      return acc;
    }, {});

    return Object.entries(grouped).map(([module, moduleItems]) => ({
      module,
      items: moduleItems,
    }));
  };

  const releaseBoxStyle = xcss({
    borderColor: 'color.border.accent.gray',
    borderWidth: 'border.width',
    borderStyle: 'solid',
    borderRadius: 'border.radius',
    backgroundColor: 'color.background.input.hovered'
  });

  const moduleBoxStyle = xcss({
    borderColor: 'color.border.accent.gray',
    borderWidth: 'border.width',
    borderStyle: 'solid',
    borderRadius: 'border.radius', 
    marginBottom: 'space.200',
    backgroundColor: 'color.background.input.pressed'
  });

  const moduleBoxCol1Style = xcss({
    width: '200px',
    marginRight: 'space.100'
  });

  const moduleBoxCol2Style = xcss({
    width: '795px',
    borderLeftColor: 'color.border.accent.gray',
    borderLeftWidth: 'border.width',
    borderLeftStyle: 'solid'
  });

  return (
    <Stack space="space.250" grow="fill">
      {data ? data.map(item => (
        <Box key={item.versionNumber} padding="space.100" xcss={releaseBoxStyle}>
          <Strong>{`${item.name}`}</Strong>
          <Text>{`Release date: ${item.releaseDate}`}</Text>
          {groupByModule(item.items).map((group, index) => (
            <Box xcss={moduleBoxStyle}> 
              <Inline key={`${item.versionNumber}-${group.module}-${index}`} alignBlock="start" alignInline="stretch">
                <Box padding="space.200" xcss={moduleBoxCol1Style}>
                  <Lozenge appearance="inprogress" isBold>{group.module}</Lozenge>
                </Box>
                <Box xcss={moduleBoxCol2Style}>
                  <DynamicTable
                    rows={group.items.map((moduleItem, moduleIndex) => ({
                      key: `${item.versionNumber}-${moduleItem.module}-${moduleIndex}`,
                      cells: [
                        {
                          key: 'type',
                          width: 5,
                          content: (
                            <Box padding="space.200">{getIcon(moduleItem.type)}</Box>
                          )
                        },
                        {
                          key: 'description',
                          width: 95,
                          content: (
                            <Stack space="space.100">
                              <Strong>{moduleItem.title}</Strong>
                              <Text>{moduleItem.description}</Text>
                            </Stack>
                          )
                        }
                      ]
                    }))}
                    highlightedRowIndex={group.items.map((_, index) => index).filter(index => index % 2 === 0)}
                    emptyView="No data to display"
                  />
                </Box>
              </Inline>
            </Box>
          ))}
        </Box>
      )) : (
        <Inline space="space.100" alignBlock="center" alignInline="center">
          <Spinner size="large" />
        </Inline>  
      )}
    </Stack>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);