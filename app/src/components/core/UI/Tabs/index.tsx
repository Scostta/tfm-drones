import React from 'react';
import {
  Tabs as ChakraTabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react';
import { tabStyles } from './styles';

type TabType = {
  id: number;
  component: React.FC;
  title: string;
};

export interface TabsProps {
  tabs: TabType[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs = [] }) => {
  return (
    <ChakraTabs align="center" variant="unstyled" isLazy>
      <TabList>
        {tabs.map(({ id, title }) => (
          <Tab {...tabStyles} key={id}>
            {title}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map(({ id, component: Component }) => (
          <TabPanel key={id} p={0}>
            <Component />
          </TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  );
};
