# Personal Portfolio Website

This is a personal portfolio website built with React, Vite, TypeScript, and styled with Tailwind CSS and shadcn-ui.

## Environment Variables

Create a `.env` file in the project root (never commit real secrets):

```
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

You can copy from `.env.example`.

## Features

*   **Single-page layout:** Smooth scrolling navigation to different sections of the portfolio.
*   **Component-based architecture:** Built with reusable React components.
*   **Responsive design:** Adapts to different screen sizes for a great user experience on any device.
*   **Modern UI:** Styled with Tailwind CSS and shadcn-ui for a clean and modern look.
*   **Interactive elements:** Includes engaging UI elements like light rays and a custom cursor.

## Sections

The portfolio is divided into the following sections:

*   **Home:** A hero section to welcome visitors.
*   **About:** Information about me.
*   **Skills:** A list of my technical skills.
*   **Projects:** A showcase of my work.
*   **Services:** Services I offer.
*   **Contact:** A form to get in touch with me.

## Technologies Used

*   [React](https://reactjs.org/)
*   [Vite](https://vitejs.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [shadcn-ui](https://ui.shadcn.com/)
*   [React Router](https://reactrouter.com/)
*   [GSAP](https://greensock.com/gsap/)
*   [Framer Motion](https://www.framer.com/motion/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm (or bun) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/your_project_name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
    or if you use bun
    ```sh
    bun install
    ```

### Running the Application

Use the following command to run the development server:

```sh
npm run dev
```

or

```sh
bun dev
```

This will start the development server at `http://localhost:5173`.

## Building for Production

To create a production build, run:

```sh
npm run build
```

or

```sh
bun run build
```

This will create a `dist` folder with the optimized and minified files for deployment.

## Deployment

- Vercel: Import the repo, set `VITE_WEB3FORMS_KEY` in Project Settings → Environment Variables, and deploy. Framework preset: Vite; Output directory: `dist`.
- Netlify: New site from Git, set `VITE_WEB3FORMS_KEY` in Site settings → Environment variables. Build command: `npm run build`. Publish directory: `dist`.
- GitHub Pages: `npm run build` and publish the `dist` folder. If using SPA routing, enable a 404.html fallback.

SPA Fallback: For static hosts, ensure unknown routes serve `index.html`.