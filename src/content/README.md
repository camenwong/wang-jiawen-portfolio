# Content Editing Guide

This folder is the single source of truth for site content.

## Files

- `site.js`: artist info, homepage hero text, about text, social links
- `projects/`: one file per project
- `projects/index.js`: exports all project files in display order

## Edit global text

Update `site.js`:

- `heroHeadline` and `intro` -> homepage hero section
- `aboutParagraphs` -> about page text
- `socialLinks` -> sidebar and about contact links (`label`, `href`)

## Edit existing project

Open the matching file in `projects/` and edit:

- `title`, `year`, `shortDescription`, `tags`
- `about` (project-level intro paragraphs)
- `exhibitedAt` and `performance` (optional lists shown under tags)
- `modules` (ordered content blocks on the project page)

Supported `modules` types:

- `text`: `{ type: "text", paragraphs: ["..."] }`
- `image`: `{ type: "image", src: "/media/...", alt: "..." }`
- `video`: `{ type: "video", src: "/media/...", caption: "...", isReel: true }`
- `video` posters: add `poster: "/media/..."` to show a thumbnail on iOS when autoplay is blocked
- `video` autoplay: reels attempt autoplay on mobile (muted + playsInline), but device settings can still block it
- `youtube`: `{ type: "youtube", youtubeId: "...", caption: "..." }`
- `gallery`: `{ type: "gallery", images: ["/media/...", ...] }`

Notes:

- Reel videos with `isReel: true` autoplay, loop, and start muted.
- The first reel module is shown next to the main `about` text on desktop.

## Add a new project

1. Create a new file in `projects/`, for example `new-project.js`.
2. Export one default project object.
3. Import and add it to the array in `projects/index.js`.

Template:

```js
const newProject = {
  slug: "new-project",
  number: "007",
  title: "New Project",
  year: "2026",
  status: "published",
  tags: ["Installation"],
  shortDescription: "One-line project description.",
  coverImage: "/media/new-project/cover.jpg", // also supports .gif, .mp4
  exhibitedAt: ["Exhibition name, 2026"],
  performance: ["Performance name, 2026"],
  about: ["Project intro paragraph."],
  modules: [
    {
      id: "new-project-reel",
      type: "video",
      src: "/media/new-project/reel.mp4",
      caption: "Project reel",
      isReel: true
    },
    {
      id: "new-project-text-01",
      type: "text",
      paragraphs: ["Notes paragraph one.", "Notes paragraph two."]
    },
    {
      id: "new-project-gallery-01",
      type: "gallery",
      images: ["/media/new-project/01.jpg", "/media/new-project/02.jpg"] // gifs supported
    }
  ]
};

export default newProject;
```

## Media placement

Put media files in:

`public/media/<project-slug>/...`

Then reference them with absolute public paths like:

`/media/<project-slug>/file-name.ext`
