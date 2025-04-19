## API Documentation

Here's how to use the new APIs:

### 1. Generate a Roadmap

- **Endpoint**: `POST /roadmap`
- **Payload**:

```json
{
  "prompt": "nextjs",
  "userId": "user123" // Optional, if provided will save the roadmap
}
```


- **Response**:

```json
{
  "learningPath": { /* Generated roadmap data */ },
  "roadmapId": "60f8a1b3e6b3f1c2d3e4f5a6" // If userId was provided
}
```




### 2. Create a Roadmap Manually

- **Endpoint**: `POST /roadmaps`
- **Payload**:

```json
{
  "userId": "user123",
  "learningPath": {
    "name": "Learning Next.js",
    "description": "A comprehensive path to learn Next.js",
    "estimatedTime": "3 months",
    "topics": [
      {
        "name": "Basics",
        "description": "Fundamentals of Next.js",
        "estimatedTime": "2 weeks",
        "subtopics": [
          {
            "name": "Setup",
            "description": "Setting up Next.js",
            "estimatedTime": "1 day",
            "technologiesAndConcepts": ["Node.js", "npm"],
            "prerequisites": ["JavaScript basics"],
            "resources": ["Next.js docs"]
          }
        ]
      }
    ]
  },
  "prompt": "nextjs" // Optional
}
```


- **Response**:

```json
{
  "roadmap": { /* Created roadmap data with ID */ },
  "message": "Roadmap created successfully"
}
```




### 3. Get a Specific Roadmap

- **Endpoint**: `GET /roadmaps/<roadmap_id>`
- **Response**:

```json
{
  "roadmap": { /* Roadmap data */ }
}
```




### 4. List All Roadmaps for a User

- **Endpoint**: `GET /roadmaps?userId=user123`
- **Response**:

```json
{
  "roadmaps": [
    { /* Roadmap 1 data */ },
    { /* Roadmap 2 data */ }
  ]
}
```




### 5. Update a Roadmap

- **Endpoint**: `PUT /roadmaps/<roadmap_id>`
- **Payload**:

```json
{
  "learningPath": { /* Updated roadmap data */ },
  "nodes": [ /* Updated node positions and data */ ],
  "edges": [ /* Updated edge connections */ ]
}
```


- **Response**:

```json
{
  "roadmap": { /* Updated roadmap data */ },
  "message": "Roadmap updated successfully"
}
```




### 6. Update Roadmap Progress

- **Endpoint**: `PUT /roadmaps/<roadmap_id>/progress`
- **Payload**:

```json
{
  "progress": {
    "overall": 75,
    "topics": {
      "topic1": {
        "status": "completed",
        "progress": 100
      },
      "topic2": {
        "status": "in-progress",
        "progress": 50
      }
    }
  }
}
```


- **Response**:

```json
{
  "message": "Progress updated successfully"
}
```




### 7. Delete a Roadmap

- **Endpoint**: `DELETE /roadmaps/<roadmap_id>`
- **Response**:

```json
{
  "message": "Roadmap deleted successfully"
}
```




## Frontend Integration

To integrate with your React frontend, you'll need to update your API calls. Here's an example of how to update the roadmap visualization component to save progress:

```typescript
// Example function to save roadmap progress
const saveRoadmapProgress = async (roadmapId, nodes, edges) => {
  try {
    // Extract progress data from nodes
    const progress = {
      overall: calculateOverallProgress(nodes),
      topics: {}
    };
    
    // Map node progress to topics
    nodes.forEach(node => {
      if (node.data.status) {
        progress.topics[node.id] = {
          status: node.data.status,
          progress: node.data.progress || 0
        };
      }
    });
    
    // Save to backend
    const response = await fetch(`http://localhost:5001/roadmaps/${roadmapId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nodes,
        edges,
        progress
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to save progress');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving roadmap progress:', error);
    throw error;
  }
};
```

This backend implementation provides a complete solution for storing and managing roadmap data, including progress tracking, which will integrate seamlessly with your existing frontend.

# Sample Response for Roadmap Generate API

```json
{
    "learningPath": {
        "name": "Next.js Learning Path for Beginners",
        "description": "A comprehensive learning path to master Next.js, starting from installation to advanced concepts. This path leverages the Next.js official documentation as the primary resource.",
        "estimatedTime": "50-75 hours",
        "topics": [
            {
                "name": "Getting Started with Next.js",
                "description": "Setting up your development environment, creating your first Next.js application, and understanding basic project structure.",
                "estimatedTime": "10 hours",
                "subtopics": [
                    {
                        "name": "Installation and Setup",
                        "description": "Learn how to install Node.js, npm or yarn, and create a new Next.js app using `create-next-app`.  (Referencing: `/docs/app/getting-started/installation` from the provided excerpt)",
                        "estimatedTime": "2 hours",
                        "technologiesAndConcepts": [
                            "Node.js",
                            "npm or yarn",
                            "CLI"
                        ],
                        "prerequisites": [
                            "Basic understanding of JavaScript",
                            "Familiarity with the command line"
                        ],
                        "resources": [
                            "Next.js Official Documentation: Getting Started",
                            "https://nodejs.org/",
                            "https://www.npmjs.com/"
                        ]
                    },
                    {
                        "name": "Project Structure and File System",
                        "description": "Understanding the default directory structure of a Next.js application, including `pages`, `public`, `styles` directories.",
                        "estimatedTime": "3 hours",
                        "technologiesAndConcepts": [
                            "File System",
                            "Project Organization"
                        ],
                        "prerequisites": [
                            "Completed Installation and Setup"
                        ],
                        "resources": [
                            "Next.js Official Documentation: File-system routing"
                        ]
                    },
                    {
                        "name": "Running Your First App",
                        "description": "Learn how to run your Next.js application locally and explore the basic structure of a page component.",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "Development server",
                            "Page components"
                        ],
                        "prerequisites": [
                            "Completed Project Structure and File System"
                        ],
                        "resources": [
                            "Next.js Official Documentation: Getting Started",
                            "Next.js Official Documentation: Pages"
                        ]
                    }
                ]
            },
            {
                "name": "Pages and Routing",
                "description": "Mastering Next.js's file-system based routing and creating dynamic routes.",
                "estimatedTime": "15 hours",
                "subtopics": [
                    {
                        "name": "File-system Routing",
                        "description": "Understanding how Next.js maps file paths to routes.",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "Routing",
                            "File System"
                        ],
                        "prerequisites": [
                            "Completed Getting Started"
                        ],
                        "resources": [
                            "Next.js Official Documentation: Routing",
                            "Next.js Official Documentation: Pages"
                        ]
                    },
                    {
                        "name": "Dynamic Routes and Data Fetching",
                        "description": "Learn to create pages with dynamic segments in their URLs and fetch data for those pages using `getStaticProps` and `getStaticPaths`.",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "Dynamic Routes",
                            "Data Fetching",
                            "getStaticProps",
                            "getStaticPaths"
                        ],
                        "prerequisites": [
                            "Completed File-system Routing"
                        ],
                        "resources": [
                            "Next.js Official Documentation: Dynamic Routes",
                            "Next.js Official Documentation: Data Fetching"
                        ]
                    },
                    {
                        "name": "API Routes",
                        "description": "Build serverless functions within your Next.js app using API routes.",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "API Routes",
                            "Serverless Functions",
                            "REST APIs"
                        ],
                        "prerequisites": [
                            "Completed Dynamic Routes and Data Fetching"
                        ],
                        "resources": [
                            "Next.js Official Documentation: API Routes"
                        ]
                    }
                ]
            },
            {
                "name": "Data Fetching and State Management",
                "description": "Learn different approaches to fetch and manage data within your Next.js application.",
                "estimatedTime": "15 hours",
                "subtopics": [
                    {
                        "name": "Data Fetching Strategies",
                        "description": "Explore different data fetching methods like `getStaticProps`, `getServerSideProps`, `getInitialProps` (legacy).",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "getStaticProps",
                            "getServerSideProps",
                            "Data Fetching Strategies"
                        ],
                        "prerequisites": [
                            "Completed Pages and Routing"
                        ],
                        "resources": [
                            "Next.js Official Documentation: Data Fetching"
                        ]
                    },
                    {
                        "name": "State Management with Context API",
                        "description": "Using React's Context API to manage state across your application.",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "React Context API",
                            "State Management"
                        ],
                        "prerequisites": [
                            "Basic understanding of React state management",
                            "Completed Data Fetching Strategies"
                        ],
                        "resources": [
                            "React Documentation: Context API"
                        ]
                    },
                    {
                        "name": "Third-party State Management Libraries (optional)",
                        "description": "Explore state management libraries like Redux, Zustand, or Jotai for more complex applications.",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "Redux",
                            "Zustand",
                            "Jotai"
                        ],
                        "prerequisites": [
                            "Completed State Management with Context API"
                        ],
                        "resources": [
                            "Redux Documentation",
                            "Zustand Documentation",
                            "Jotai Documentation"
                        ]
                    }
                ]
            },
            {
                "name": "Styling and UI Components",
                "description": "Learn different methods to style your components and build reusable UI components.",
                "estimatedTime": "5 hours",
                "subtopics": [
                    {
                        "name": "CSS-in-JS",
                        "description": "Using styled-jsx or other CSS-in-JS libraries.",
                        "estimatedTime": "2 hours",
                        "technologiesAndConcepts": [
                            "styled-jsx",
                            "CSS-in-JS",
                            "CSS Modules"
                        ],
                        "prerequisites": [
                            "Basic understanding of CSS"
                        ],
                        "resources": [
                            "Next.js Official Documentation: Styling",
                            "styled-jsx Documentation"
                        ]
                    },
                    {
                        "name": "Component Library (optional)",
                        "description": "Integrating a UI component library like Material UI, Ant Design, or Chakra UI.",
                        "estimatedTime": "3 hours",
                        "technologiesAndConcepts": [
                            "Material UI",
                            "Ant Design",
                            "Chakra UI"
                        ],
                        "prerequisites": [
                            "Completed CSS-in-JS"
                        ],
                        "resources": [
                            "Material UI Documentation",
                            "Ant Design Documentation",
                            "Chakra UI Documentation"
                        ]
                    }
                ]
            },
            {
                "name": "Deployment",
                "description": "Deploy your Next.js application to various platforms.",
                "estimatedTime": "5 hours",
                "subtopics": [
                    {
                        "name": "Vercel Deployment",
                        "description": "Deploying your Next.js application to Vercel.",
                        "estimatedTime": "2 hours",
                        "technologiesAndConcepts": [
                            "Vercel",
                            "Deployment"
                        ],
                        "prerequisites": [
                            "Completed a working Next.js application"
                        ],
                        "resources": [
                            "Vercel Documentation"
                        ]
                    },
                    {
                        "name": "Other Deployment Platforms (optional)",
                        "description": "Exploring alternative deployment platforms like Netlify, AWS, or Google Cloud.",
                        "estimatedTime": "3 hours",
                        "technologiesAndConcepts": [
                            "Netlify",
                            "AWS",
                            "Google Cloud"
                        ],
                        "prerequisites": [
                            "Completed Vercel Deployment"
                        ],
                        "resources": [
                            "Netlify Documentation",
                            "AWS Documentation",
                            "Google Cloud Documentation"
                        ]
                    }
                ]
            },
            {
                "name": "Advanced Concepts (Optional)",
                "description": "Exploring more advanced features of Next.js",
                "estimatedTime": "10 hours",
                "subtopics": [
                    {
                        "name": "Next.js App Router",
                        "description": "Learning the new App Router in Next.js 13 and beyond. (Not directly covered in the provided excerpt, but a crucial modern aspect).",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "App Router",
                            "React Server Components",
                            "Layout Components"
                        ],
                        "prerequisites": [
                            "Solid understanding of Next.js fundamentals"
                        ],
                        "resources": [
                            "Next.js Official Documentation: App Router"
                        ]
                    },
                    {
                        "name": "API Reference",
                        "description": "Deep dive into the detailed API reference. (Referencing: `/docs/app/api-reference/directives` from the provided excerpt)",
                        "estimatedTime": "5 hours",
                        "technologiesAndConcepts": [
                            "Next.js API",
                            "Directives",
                            "Hooks"
                        ],
                        "prerequisites": [
                            "Solid understanding of Next.js fundamentals"
                        ],
                        "resources": [
                            "Next.js Official Documentation: API Reference"
                        ]
                    }
                ]
            }
        ]
    }
}