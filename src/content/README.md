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
- `versions` (each version/phase of that project)

Each version supports its own:

- `title`, `year`, `summary`
- `notes` (paragraph array)
- `heroImage`
- `media.videos` (`[{ src, caption }]`)
- `media.youtube` (`[{ youtubeId, caption }]`)
- `gallery` (image path array)

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
  coverImage: "/media/new-project/cover.jpg",
  about: ["Project intro paragraph."],
  versions: [
    {
      id: "new-project-v1",
      title: "Working Title",
      year: "2026",
      summary: "Short summary for this version.",
      notes: ["Notes paragraph one.", "Notes paragraph two."],
      heroImage: "/media/new-project/hero.jpg",
      media: {
        videos: [{ src: "/media/new-project/reel.mp4", caption: "Project reel" }],
        youtube: [{ youtubeId: "M7lc1UVf-VE", caption: "Documentation" }]
      },
      gallery: ["/media/new-project/01.jpg", "/media/new-project/02.jpg"]
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
