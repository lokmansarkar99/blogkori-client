export const posts = [
  {
    _id: 1,
    title: "Exploring Node.js for Beginners",
    content: "Learn the basics of Node.js and build simple APIs using Express.",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    categories: ["Programming", "Node.js", "Backend"],
    status: "approved",
    likes: ["6713e89f2d8f4c124d3c27ab"],
    dislikes: ["6713e89f2d8f4c124d3c27ab"],
    createdAt: "2025-10-19T12:30:45.123Z",
    updatedAt: "2025-10-19T12:30:45.123Z"
  },
  {
    _id: 2,
    title: "Understanding Mongoose ",
    content: "How Mongoose populate works for referencing other collections.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    categories: ["MongoDB", "Database"],
    status: "pending",
    likes: ["6713e89f2d8f4c124d3c27ab"],
    dislikes: ["6713e89f2d8f4c124d3c27ab"],
    createdAt: "2025-10-19T12:30:45.123Z",
    updatedAt: "2025-10-19T12:30:45.123Z"
  },
  {
    _id: 3,
    title: "Tailwind CSS vs Bootstrap",
    content: "We compare Tailwind CSS and Bootstrap for frontend developers.",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    categories: ["Frontend", "CSS", "UI Design"],
    status: "approved",
    likes: ["6713e89f2d8f4c124d3c27ab"],
    dislikes: ["6713e89f2d8f4c124d3c27ab"],
    createdAt: "2025-10-19T12:30:45.123Z",
    updatedAt: "2025-10-19T12:30:45.123Z"
  },
  {
    _id: 4,
    title: "Understanding Mongoose ",
    content: "How Mongoose populate works for referencing other collections.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    categories: ["MongoDB", "Database"],
    status: "pending",
    likes: ["6713e89f2d8f4c124d3c27ab"],
    dislikes: ["6713e89f2d8f4c124d3c27ab"],
    createdAt: "2025-10-19T12:30:45.123Z",
    updatedAt: "2025-10-19T12:30:45.123Z"
  },
  {
    _id: 5,
    title: "Tailwind CSS vs Bootstrap",
    content: "We compare Tailwind CSS and Bootstrap for frontend developers.",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    categories: ["Frontend", "CSS", "UI Design"],
    status: "approved",
    likes: ["6713e89f2d8f4c124d3c27ab"],
    dislikes: ["6713e89f2d8f4c124d3c27ab"],
    createdAt: "2025-10-19T12:30:45.123Z",
    updatedAt: "2025-10-19T12:30:45.123Z"
  },
  {
    _id: 6,
    title: "The Power of Consistency",
    user_id: "6713e89f2d8f4c124d3c27ab",
    content:
      "Consistency is the key to achieving long-term goals. Even small daily actions can lead to massive success over time.",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    image_id: "consistency_1729999999",
    categories: ["motivation", "self-improvement", "productivity"],
    status: "approved",
    likes: ["6713e89f2d8f4c124d3c27ab"],
    dislikes: ["6713e89f2d8f4c124d3c27ab"],
    createdAt: "2025-10-19T12:30:45.123Z",
    updatedAt: "2025-10-19T12:30:45.123Z"
  }
];

//comment  damy data
export const comments = [
  {
    __id: "1",
    post_id: "1",
    user_id: "u201",
    status: "approved",
    content: "Great post! I learned a lot about consistency and focus.",
    createdAt: "2025-10-15T12:30:00.000Z"
  },
  {
    __id: "2",
    post_id: "4",
    user_id: "u202",
    status: "pending",
    content: "Interesting perspective! Waiting for approval.",
    createdAt: "2025-10-16T08:10:00.000Z"
  },
  {
    __id: "3",
    post_id: "3",
    user_id: "u203",
    status: "suspended",
    content: "This comment was flagged due to inappropriate content.",
    createdAt: "2025-10-17T09:45:00.000Z"
  },
  {
    __id: "4",
    post_id: "4",
    user_id: "u203",
    status: "approved",
    content: "This comment was flagged due to inappropriate content.",
    createdAt: "2025-10-17T09:45:00.000Z"
  },
  {
    __id: "5",
    post_id: "5",
    user_id: "u203",
    status: "pending",
    content: "This comment was flagged due to inappropriate content.",
    createdAt: "2025-10-17T09:45:00.000Z"
  }
];
