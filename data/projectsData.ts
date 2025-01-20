interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Unity/Metal Viewer for 4D Gaussian Splatting',
    description: `A viewer system implemented on both Unity and Metal for 4D Gaussian Splatting, which is a method for reconstruct dynamic scenes in the real life. 
            This project was completed during my internship at Curiosity Inc, where I focused on developing AI solutions for VR/AR applications.`,
    imgSrc: '/static/images/projects/4dgs_cover.png',
    href: '/blog/notes/unity-metal-viewer-for-4dgs',
  },
  {
    title: 'ProjectErio',
    description: `Homework project during the C++ internship at Bandai Namco Studio Inc. A simple Mario-style game made by C++ 17 using SFML`,
    imgSrc: '/static/images/projects/erio.png',
    href: 'https://github.com/camtrik/ProjectErio',
  },
  {
    title: 'Personal Website',
    description: `A Next.js, Tailwind CSS project which is based on Next App directory with React Server Component and uses Contentlayer to manage markdown content. 
      Based on the tailwind-nextjs-starter-blog.`,
    imgSrc: '/static/images/projects/homepage.png',
    href: '/',
  },
  {
    title: 'LLMUnions (WIP)',
    description: `a chat application that integrates multiple Large Language Models (LLMs) including ChatGPT, Claude, and Gemini. Made by Vue3 and Express.`,
    imgSrc: '/static/images/projects/llmunions.png',
    href: 'https://github.com/camtrik/LLMs-Unions',
  },
  {
    title: 'Gin Blog Management Sysmte (WIP)',
    description: `A Gin based blog management system. The system might become the backend management system for my personal website.`,
    imgSrc: '/static/images/projects/ginblog.png',
    href: 'https://github.com/camtrik/gin-blog',
  },
]

export default projectsData
