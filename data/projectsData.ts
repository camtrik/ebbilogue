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
    title: 'Personal Website: Ebbilogue (WIP)',
    description: `A Next.js, Tailwind CSS project which is based on Next App directory with React Server Component and uses Contentlayer to manage markdown content. 
      Based on the tailwind-nextjs-starter-blog.`,
    imgSrc: '/static/images/projects/homepage.png',
    href: 'https://github.com/camtrik/ebbilogue',
  },
  {
    title: 'PSN & Steam APIs in Golang (WIP)',
    description: `A Golang project that provides APIs for PSN and Steam. It allows users to fetch data from PSN and Steam.`,
    imgSrc: '/static/images/projects/ginblog.png',
    href: 'https://res.cloudinary.com/camtrik/image/upload/v1738572135/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2025-02-03_164150_caqufb.png',
  },
]

export default projectsData
