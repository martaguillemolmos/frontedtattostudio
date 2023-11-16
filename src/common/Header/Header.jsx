
import { Group, Code, ScrollArea } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import './NavbarNested.module.css';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
  },
];

export const Header = () => {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className='navbar'>
      <div className='header'>
        <Group justify="space-between">
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className='links'>
        <div className='linksInner'>{links}</div>
      </ScrollArea>

    </nav>
  );
}
