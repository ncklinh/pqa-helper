// src/mockData.ts

export interface Repo {
  name: string;
  updated_on: string;
  created_on: string;
  description: string;
}

export interface WorkSpace {
  uuid: string;
  name: string;
  slug: string;
  is_private: boolean;
  type: string;
  created_on: string;
  links: { avatar: { href: string } };
}

export interface PullRequest {
  id: number;
  title: string;
  author: { display_name: string; links: { avatar: { href: string } } };
  authorAvatar: string;
  branch: string;
  state: string;
  updated_on: string;
  created_on: string;
  description: string;
  reviewers: { name: string; links: { avatar: { href: string } } }[];
  source: {
    branch: {
      name: string;
    };
  };
  destination: {
    branch: {
      name: string;
    };
  };
  comments: Comment[];
}

export interface Comment {
  user: {
    account_id: string;
    display_name: string;
    nickname: string;
    uuid: string;
    type: string;
    links: { avatar: { href: string } };
  };
  avatar: string;
  content: {
    html: string;
    markup: string;
    raw: string;
    type: string;
  };
  created_on: string;
  pullrequest: {
    draft: boolean;
    id: number;

    title: string;
    type: string;
  };
  id: number;
  parent: {
    id: number;
    links: { avatar: { href: string } };
  };
}

export type CommentNode = Comment & { replies: CommentNode[] };
