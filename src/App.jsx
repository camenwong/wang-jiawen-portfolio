import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import { projects, siteMeta } from "./content";

function App() {
  const [activeTags, setActiveTags] = useState([]);
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const availableTags = useMemo(
    () => [...new Set(projects.flatMap((project) => project.tags))].sort((a, b) => a.localeCompare(b)),
    []
  );

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesTag = activeTags.length === 0 || activeTags.some((tag) => project.tags.includes(tag));
      const matchesQuery =
        normalized.length === 0 ||
        project.title.toLowerCase().includes(normalized) ||
        project.tags.join(" ").toLowerCase().includes(normalized) ||
        project.year.includes(normalized);

      return matchesTag && matchesQuery;
    });
  }, [activeTags, query]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleTag = (tag) => {
    setActiveTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  };

  const clearFilters = () => {
    setActiveTags([]);
    setQuery("");
  };

  return (
    <div className="app-shell">
      <button
        className="sidebar-toggle"
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-expanded={sidebarOpen}
        aria-controls="site-sidebar"
      >
        Menu
      </button>

      <aside id="site-sidebar" className={`site-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="sidebar-header">
          <p className="sidebar-kicker">Portfolio</p>
          <h1>{siteMeta.artist}</h1>
          <p>{siteMeta.subtitle}</p>
          <div className="sidebar-page-links">
            <NavLink to="/" end className={({ isActive }) => `sidebar-page-link ${isActive ? "is-active" : ""}`}>
              Overview
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `sidebar-page-link ${isActive ? "is-active" : ""}`}
            >
              About
            </NavLink>
          </div>
        </div>

        <label className="search-field">
          <span>Search projects</span>
          <input
            type="search"
            placeholder="Title, tag, year"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <section className="filter-panel">
          <div className="filter-panel-title-row">
            <h2>Filter by tag</h2>
            <button type="button" onClick={clearFilters} className="clear-filter-btn">
              Reset
            </button>
          </div>

          <div className="tag-list">
            {availableTags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`tag-chip ${active ? "is-active" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        <section className="project-menu">
          <h2>Projects ({filteredProjects.length})</h2>
          <ul>
            {filteredProjects.map((project) => (
              <li key={project.slug}>
                <NavLink
                  to={`/project/${project.slug}`}
                  className={({ isActive }) =>
                    `project-link ${project.status !== "published" ? "is-placeholder" : ""} ${
                      isActive ? "is-active" : ""
                    }`
                  }
                >
                  <span className="project-link-number">[{project.number}]</span>
                  <span className="project-link-name">{project.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <nav className="sidebar-social" aria-label="Social links">
          {siteMeta.socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="social-link">
              <span className="social-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage projects={filteredProjects} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
        </Routes>
      </main>
    </div>
  );
}

function HomePage({ projects }) {
  return (
    <>
      <section className="hero-panel">
        <div className="hero-grid">
          <p className="hero-label">About the artist</p>
          <h2>{siteMeta.heroHeadline}</h2>
          <p>{siteMeta.intro}</p>
          <div className="hero-cta-row">
            <Link to="/about" className="hero-about-link">
              Read full about
            </Link>
          </div>
        </div>
      </section>

      <section className="overview-panel">
        {projects.length === 0 ? (
          <p className="empty-state">No project matches the selected filters yet.</p>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.slug} className="project-tile">
                <Link to={`/project/${project.slug}`}>
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} loading="lazy" />
                  ) : (
                    <div className="project-placeholder" aria-hidden="true" />
                  )}

                  <div className="project-tile-meta">
                    <div className="project-tile-head">
                      <span>[{project.number}]</span>
                      <span>{project.year}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>
                    <ul>
                      {project.tags.map((tag) => (
                        <li key={`${project.slug}-${tag}`}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="about-page-panel">
      <header className="about-header">
        <p className="hero-label">About</p>
        <h2>{siteMeta.artist}</h2>
        <p>{siteMeta.subtitle}</p>
      </header>

      <div className="about-content-grid">
        <div className="about-text-block">
          {siteMeta.aboutParagraphs.map((paragraph, index) => (
            <p key={`about-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>

        <aside className="about-contact-block">
          <h3>Contact</h3>
          <ul>
            {siteMeta.socialLinks.map((item) => (
              <li key={`about-link-${item.label}`}>
                <a href={item.href} target="_blank" rel="noreferrer" className="social-link">
                  <span className="social-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function getProjectModules(project) {
  if ((project.modules ?? []).length > 0) {
    return project.modules;
  }

  return (project.versions ?? []).flatMap((version, versionIndex) => {
    const versionId = version.id ?? `${project.slug}-legacy-${versionIndex}`;
    const mappedModules = [];
    const summaryAndNotes = [version.summary, ...(version.notes ?? [])].filter(Boolean);
    const videos = version.media?.videos ?? [];
    const youtubeEmbeds = version.media?.youtube ?? [];
    const gallery = version.gallery ?? [];

    if (version.heroImage) {
      mappedModules.push({
        id: `${versionId}-image`,
        type: "image",
        src: version.heroImage,
        alt: `${project.title} image`
      });
    }

    if (summaryAndNotes.length > 0) {
      mappedModules.push({
        id: `${versionId}-text`,
        type: "text",
        paragraphs: summaryAndNotes
      });
    }

    videos.forEach((video, videoIndex) => {
      mappedModules.push({
        id: `${versionId}-video-${videoIndex}`,
        type: "video",
        src: video.src,
        caption: video.caption,
        isReel: video.isReel
      });
    });

    youtubeEmbeds.forEach((youtube, youtubeIndex) => {
      mappedModules.push({
        id: `${versionId}-youtube-${youtubeIndex}`,
        type: "youtube",
        youtubeId: youtube.youtubeId,
        caption: youtube.caption
      });
    });

    if (gallery.length > 0) {
      mappedModules.push({
        id: `${versionId}-gallery`,
        type: "gallery",
        images: gallery
      });
    }

    return mappedModules;
  });
}

function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) {
    return (
      <section className="project-page-panel">
        <h2>Project not found</h2>
        <p>The requested project does not exist.</p>
      </section>
    );
  }

  const modules = getProjectModules(project);
  const introReelModuleIndex = modules.findIndex((module) => module.type === "video" && module.isReel);
  const introReel = introReelModuleIndex >= 0 ? modules[introReelModuleIndex] : null;
  const contentModules =
    introReelModuleIndex >= 0 ? modules.filter((_, index) => index !== introReelModuleIndex) : modules;

  return (
    <article className="project-page-panel">
      <header className="project-hero">
        <div>
          <p className="project-code">[{project.number}]</p>
          <h2>{project.title}</h2>
          <p className="project-year">{project.year}</p>
        </div>

        <div className="project-meta-column">
          <ul className="project-tag-cloud">
            {project.tags.map((tag) => (
              <li key={`${project.slug}-tag-${tag}`}>{tag}</li>
            ))}
          </ul>

          <div className="project-specs">
            {project.exhibitedAt && project.exhibitedAt.length > 0 && (
              <div className="spec-group">
                <span className="spec-label">Exhibition</span>
                <ul>
                  {project.exhibitedAt.map((item) => (
                    <li key={`${project.slug}-exhibition-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.performance && project.performance.length > 0 && (
              <div className="spec-group">
                <span className="spec-label">Performance</span>
                <ul>
                  {project.performance.map((item) => (
                    <li key={`${project.slug}-performance-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className={`project-intro-grid ${introReel ? "has-reel" : ""}`}>
        <div className="project-text-block">
          {(project.about ?? []).map((paragraph, index) => (
            <p key={`${project.slug}-about-${index}`}>{paragraph}</p>
          ))}
        </div>

        {introReel ? (
          <figure className="media-card is-reel project-intro-reel">
            <video
              src={introReel.src}
              controls
              playsInline
              preload="metadata"
              autoPlay
              loop
              muted
            />
            {introReel.caption ? <figcaption>{introReel.caption}</figcaption> : null}
          </figure>
        ) : null}
      </section>

      <section className="project-modules">
        {contentModules.length === 0 ? (
          <p className="empty-state">No content has been added yet.</p>
        ) : (
          contentModules.map((module, moduleIndex) => {
            const key = module.id ?? `${project.slug}-module-${moduleIndex}`;

            if (module.type === "text") {
              return (
                <section className="project-module" key={key}>
                  <div className="project-text-block project-module-text">
                    {(module.paragraphs ?? []).map((paragraph, paragraphIndex) => (
                      <p key={`${key}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              );
            }

            if (module.type === "image" && module.src) {
              return (
                <figure className="project-module project-hero-image" key={key}>
                  <img src={module.src} alt={module.alt ?? `${project.title} image`} loading="lazy" />
                </figure>
              );
            }

            if (module.type === "video" && module.src) {
              return (
                <figure className={`media-card ${module.isReel ? "is-reel" : ""}`} key={key}>
                  <video
                    src={module.src}
                    controls
                    playsInline
                    preload="metadata"
                    autoPlay={module.isReel}
                    loop={module.isReel}
                    muted={module.isReel}
                  />
                  {module.caption ? <figcaption>{module.caption}</figcaption> : null}
                </figure>
              );
            }

            if (module.type === "youtube" && module.youtubeId) {
              return (
                <figure className="media-card" key={key}>
                  <div className="iframe-wrap">
                    <iframe
                      src={`https://www.youtube.com/embed/${module.youtubeId}`}
                      title={`${project.title} YouTube embed`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  {module.caption ? <figcaption>{module.caption}</figcaption> : null}
                </figure>
              );
            }

            if (module.type === "gallery") {
              return (
                <section className="project-module" key={key}>
                  <div className="gallery-grid">
                    {(module.images ?? []).map((image, imageIndex) => (
                      <button
                        key={`${key}-gallery-${imageIndex}`}
                        type="button"
                        className="gallery-thumb"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img src={image} alt={`${project.title} image ${imageIndex + 1}`} loading="lazy" />
                      </button>
                    ))}
                  </div>
                </section>
              );
            }

            return null;
          })
        )}
      </section>

      {selectedImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedImage(null)}>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            Close
          </button>
          <img src={selectedImage} alt="Selected image" />
        </div>
      ) : null}
    </article>
  );
}

export default App;
