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
}

// export const mockRepos: Repo[] = [
//   {
//     name: "client-portal-frontend",
//     lastUpdated: "2024-12-01",
//     description:
//       "React-based frontend for the Client Portal application with dashboard, billing, and messaging features.",
//   },
//   {
//     name: "inventory-api-service",
//     lastUpdated: "2025-01-14",
//     description:
//       "Node.js/Express backend for managing product inventory, suppliers, and stock tracking.",
//   },
//   {
//     name: "ecommerce-mobile-app",
//     lastUpdated: "2025-03-22",
//     description:
//       "Flutter-based mobile app for B2C e-commerce with cart, payment integration, and order history.",
//   },
//   {
//     name: "internal-timesheet-tool",
//     lastUpdated: "2025-04-03",
//     description:
//       "Company-internal tool for employees to log billable hours, sync with Jira, and export timesheets.",
//   },
//   {
//     name: "hr-onboarding-portal",
//     lastUpdated: "2025-05-27",
//     description:
//       "Web platform to manage new employee onboarding flows including document upload and training modules.",
//   },
//   {
//     name: "analytics-dashboard-backend",
//     lastUpdated: "2025-06-18",
//     description:
//       "Go-based API service that aggregates data and provides chart-ready analytics for client dashboards.",
//   },
// ];

// export const mockPRs: PullRequest[] = [
//   {
//     id: 315,
//     title: "Implement user authentication API endpoint",
//     author: "Carla Baba",
//     state: "OPEN",
//     authorAvatar: "https://i.pravatar.cc/40?img=1",
//     branch: "master",
//     updatedAt: "2 minutes ago",
//     createdAt: "3 hours ago",
//     description:
//       "Developed REST API for user login, registration, and token generation using JWT.",
//     reviewers: [{ name: "Maciej", avatar: "https://i.pravatar.cc/40?img=4" }],
//     comments: [
//       {
//         name: "Annika Rangarajan",
//         avatar: "/avatars/annika.png",
//         content: "Please add unit tests for the token expiration logic.",
//         time: "1 day ago",
//       },
//       {
//         name: "Maciej",
//         avatar: "https://i.pravatar.cc/40?img=4",
//         content:
//           "API response codes look good. Did you consider refresh tokens?",
//         time: "3 hours ago",
//       },
//     ],
//   },
//   {
//     id: 316,
//     title: "Add login form validation and error handling",
//     author: "Kim",
//     authorAvatar: "https://i.pravatar.cc/40?img=5",
//     branch: "master",
//     state: "MERGED",
//     updatedAt: "5 minutes ago",
//     createdAt: "4 hours ago",
//     description:
//       "Implemented frontend validation for login inputs and displayed appropriate error messages.",
//     reviewers: [
//       { name: "Carla Baba", avatar: "https://i.pravatar.cc/40?img=1" },
//       { name: "Maciej", avatar: "https://i.pravatar.cc/40?img=4" },
//     ],
//     comments: [
//       {
//         name: "Annika Rangarajan",
//         avatar: "/avatars/annika.png",
//         content: "Great work! The inline error messages improve UX a lot.",
//         time: "2 hours ago",
//       },
//       {
//         name: "Carla Baba",
//         avatar: "https://i.pravatar.cc/40?img=1",
//         content: "We might want to add support for accessibility alerts.",
//         time: "1 hour ago",
//       },
//       {
//         name: "Maciej",
//         avatar: "https://i.pravatar.cc/40?img=4",
//         content:
//           "Can you confirm that validation works on all supported browsers?",
//         time: "30 minutes ago",
//       },
//     ],
//   },
//   {
//     id: 317,
//     title: "Optimize database queries for user profile data",
//     author: "Maciej",
//     state: "DRAFT",
//     authorAvatar: "https://i.pravatar.cc/40?img=3",
//     branch: "master",
//     updatedAt: "24 minutes ago",
//     createdAt: "5 hours ago",
//     description:
//       "Refactored SQL queries to reduce latency when fetching user profiles and related metadata.",
//     reviewers: [
//       { name: "Carla Baba", avatar: "https://i.pravatar.cc/40?img=1" },
//       { name: "John", avatar: "https://i.pravatar.cc/40?img=2" },
//       { name: "Steve", avatar: "https://i.pravatar.cc/40?img=6" },
//     ],
//     comments: [
//       {
//         name: "John",
//         avatar: "https://i.pravatar.cc/40?img=2",
//         content: "The new indexes helped a lot, query time dropped by 40%.",
//         time: "3 hours ago",
//       },
//       {
//         name: "Steve",
//         avatar: "https://i.pravatar.cc/40?img=6",
//         content: "Can we add some benchmarks before and after the changes?",
//         time: "4 hours ago",
//       },
//       {
//         name: "Carla Baba",
//         avatar: "https://i.pravatar.cc/40?img=1",
//         content: "Make sure to run this on staging before merging.",
//         time: "2 hours ago",
//       },
//     ],
//   },
//   {
//     id: 318,
//     title: "Fix responsive layout issues on mobile devices",
//     author: "John",
//     authorAvatar: "https://i.pravatar.cc/40?img=1",
//     branch: "master",
//     state: "MERGED",
//     updatedAt: "10 minutes ago",
//     createdAt: "6 hours ago",
//     description:
//       "Adjusted CSS media queries and flexbox properties for mobile responsiveness.",
//     reviewers: [{ name: "Maciej", avatar: "https://i.pravatar.cc/40?img=4" }],
//     comments: [
//       {
//         name: "Maciej",
//         avatar: "https://i.pravatar.cc/40?img=4",
//         content: "Looks great on iPhone X and Pixel 4.",
//         time: "1 hour ago",
//       },
//       {
//         name: "Annika Rangarajan",
//         avatar: "/avatars/annika.png",
//         content: "Please test on landscape mode as well.",
//         time: "2 hours ago",
//       },
//     ],
//   },
//   {
//     id: 319,
//     title: "Add caching layer to reduce API response time",
//     author: "John",
//     authorAvatar: "https://i.pravatar.cc/40?img=2",
//     branch: "master",
//     state: "OPEN",
//     updatedAt: "15 minutes ago",
//     createdAt: "7 hours ago",
//     description:
//       "Implemented Redis caching for frequently accessed endpoints to improve backend performance.",
//     reviewers: [
//       { name: "Kim", avatar: "https://i.pravatar.cc/40?img=5" },
//       { name: "Maciej", avatar: "https://i.pravatar.cc/40?img=4" },
//     ],
//     comments: [
//       {
//         name: "Kim",
//         avatar: "https://i.pravatar.cc/40?img=5",
//         content: "Cache invalidation needs to be handled carefully here.",
//         time: "3 hours ago",
//       },
//       {
//         name: "John",
//         avatar: "https://i.pravatar.cc/40?img=2",
//         content: "Added basic cache TTL of 10 minutes for now.",
//         time: "2 hours ago",
//       },
//       {
//         name: "Maciej",
//         avatar: "https://i.pravatar.cc/40?img=4",
//         content: "Consider monitoring cache hit rates after deployment.",
//         time: "1 hour ago",
//       },
//       {
//         name: "Annika Rangarajan",
//         avatar: "/avatars/annika.png",
//         content: "Do we have tests covering cache expiry?",
//         time: "30 minutes ago",
//       },
//     ],
//   },
//   {
//     id: 320,
//     title: "Integrate Redux for global state management",
//     author: "Steve",
//     authorAvatar: "https://i.pravatar.cc/40?img=3",
//     branch: "master",
//     state: "OPEN",
//     updatedAt: "30 minutes ago",
//     createdAt: "8 hours ago",
//     description:
//       "Set up Redux store and implemented actions/reducers for handling user authentication state.",
//     reviewers: [
//       { name: "Kim", avatar: "https://i.pravatar.cc/40?img=4" },
//       { name: "John", avatar: "https://i.pravatar.cc/40?img=2" },
//       { name: "Steve", avatar: "https://i.pravatar.cc/40?img=6" },
//     ],
//     comments: [
//       {
//         name: "Steve",
//         avatar: "https://i.pravatar.cc/40?img=6",
//         content: "Redux integration works well with our current React setup.",
//         time: "1 hour ago",
//       },
//       {
//         name: "Kim",
//         avatar: "https://i.pravatar.cc/40?img=4",
//         content: "Please modularize actions to reduce file size.",
//         time: "2 hours ago",
//       },
//       {
//         name: "John",
//         avatar: "https://i.pravatar.cc/40?img=2",
//         content: "Could we add some middleware for async actions?",
//         time: "30 minutes ago",
//       },
//       {
//         name: "Annika Rangarajan",
//         avatar: "/avatars/annika.png",
//         content: "Don’t forget to update the docs for new state structure.",
//         time: "15 minutes ago",
//       },
//       {
//         name: "Steve",
//         avatar: "https://i.pravatar.cc/40?img=3",
//         content: "Docs updated in the latest commit.",
//         time: "5 minutes ago",
//       },
//     ],
//   },
// ];
