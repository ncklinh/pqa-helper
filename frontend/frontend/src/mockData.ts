// src/mockData.ts

export interface Repo {
  name: string;
  lastUpdated: string;
  description: string;
}

export const mockRepos: Repo[] = [
  {
    name: 'BmfFontToGMX',
    lastUpdated: '2016-10-01',
    description: "Converts AngelCode BMFont .fnt files to GameMaker: Studio's GMX files.",
  },
  {
    name: 'ExtGmxToGml8',
    lastUpdated: '2016-06-11',
    description: '[very partially] convert GameMaker: Studio extensions to GML scripts for <= 8.1.',
  },
  {
    name: 'GmxDataSync',
    lastUpdated: '2016-06-11',
    description: 'Extracts sprite/sound/background assets into a GameMaker project.',
  },
  {
    name: 'GmxGen',
    lastUpdated: '2016-08-28',
    description: 'Updates GameMaker extensions with macros and docs from source files.',
  },
  {
    name: 'ntbc',
    lastUpdated: '2016-06-16',
    description: 'Helps with background/shadow color mods for Nuclear Throne.',
  },
  {
    name: 'NTT-Assemble',
    lastUpdated: '2016-10-14',
    description: 'Patcher/reassembler module for Nuclear Throne Together.',
  },
];

export interface PullRequest {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  branch: string;
  updatedAt: string;
  reviewers: { name: string; avatar: string }[];
}

export const mockPRs: PullRequest[] = [
    {
      id: 315,
      title: 'Add support for POP3 protocol',
      author: 'Carla Baba',
      authorAvatar: 'https://i.pravatar.cc/40?img=1',
      branch: 'master',
      updatedAt: '2 minutes ago',
      reviewers: [
        { name: 'Maciej', avatar: 'https://i.pravatar.cc/40?img=4' },
      ],
    },
    {
      id: 316,
      title: 'Add support for IMAP protocol',
      author: 'Carla Baba',
      authorAvatar: 'https://i.pravatar.cc/40?img=1',
      branch: 'master',
      updatedAt: '2 minutes ago',
      reviewers: [
        { name: 'Kim', avatar: 'https://i.pravatar.cc/40?img=5' },
        { name: 'Maciej', avatar: 'https://i.pravatar.cc/40?img=4' },
      ],
    },
    {
      id: 318,
      title: 'Add support for SMTP protocol',
      author: 'Kim Tan',
      authorAvatar: 'https://i.pravatar.cc/40?img=3',
      branch: 'master',
      updatedAt: '24 minutes ago',
      reviewers: [
        { name: 'Maciej', avatar: 'https://i.pravatar.cc/40?img=4' },
        { name: 'John', avatar: 'https://i.pravatar.cc/40?img=2' },
        { name: 'Steve', avatar: 'https://i.pravatar.cc/40?img=6' },
      ],
    },
    {
      id: 315,
      title: 'Add support for POP3 protocol',
      author: 'Carla Baba',
      authorAvatar: 'https://i.pravatar.cc/40?img=1',
      branch: 'master',
      updatedAt: '2 minutes ago',
      reviewers: [
        { name: 'Maciej', avatar: 'https://i.pravatar.cc/40?img=4' },
      ],
    },
    {
      id: 316,
      title: 'Add support for IMAP protocol',
      author: 'Carla Baba',
      authorAvatar: 'https://i.pravatar.cc/40?img=1',
      branch: 'master',
      updatedAt: '2 minutes ago',
      reviewers: [
        { name: 'Kim', avatar: 'https://i.pravatar.cc/40?img=5' },
        { name: 'Maciej', avatar: 'https://i.pravatar.cc/40?img=4' },
      ],
    },
    {
      id: 318,
      title: 'Add support for SMTP protocol',
      author: 'Kim Tan',
      authorAvatar: 'https://i.pravatar.cc/40?img=3',
      branch: 'master',
      updatedAt: '24 minutes ago',
      reviewers: [
        { name: 'Maciej', avatar: 'https://i.pravatar.cc/40?img=4' },
        { name: 'John', avatar: 'https://i.pravatar.cc/40?img=2' },
        { name: 'Steve', avatar: 'https://i.pravatar.cc/40?img=6' },
      ],
    },
  ];