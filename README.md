# Personal Blog

Frontend system for my personal website [EbbiLogue](https://ebbilogue.com).  
Backend [here](https://github.com/camtrik/ebbilogue-backend)

Based off the [**Tailwind Nextjs Starter Blog**](https://github.com/timlrx/tailwind-nextjs-starter-blog)

This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) project which is based on the [**Tailwind Nextjs Starter Blog**](https://github.com/timlrx/tailwind-nextjs-starter-blog)

Some features and designs are inspired by [Azurtelie](https://github.com/AmosChenZixuan/Azurtelier.com). Thanks!

## Website

![](https://res.cloudinary.com/camtrik/image/upload/v1744214119/homepage_svupnl.png)

## New Features by me

- Role-based user system supported by a [Spring Security user management system](https://github.com/camtrik/auth-service-spring-security)
- Random banner images from [Claudinary]/Local
- AI Assistant Support (WIP)
  - An AI assistant that supports introducing the website creator (me) and blog content
  - Powered by Tencent Cloud’s LKE [LLM Knowledge Engine](https://cloud.tencent.com/product/lke)

## TODO:

- [x] Random banner images from Claudinary/GooglePhotos/Local
- [x] Banner preview for blogs
- [x] Japanese support
- [x] Store static resources online
- [x] New homepage design
- [x] Game Collection Page
- [ ] Useful Tools Page
- [ ] New blog list design
- [x] AI Chat Avatar Support
- [ ] New album design

## Installation

#### Prerequisite: Node and Yarn

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 18
nvm use 18

npm i --global yarn
```

```bash
yarn
```

Please note, that if you are using Windows, you may need to run:

```bash
set PWD="$(pwd)"
```

## Development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:6060](http://localhost:6060) with your browser to see the result.

Edit the layout in `app` or content in `data`. With live reloading, the pages auto-updates as you edit them.
