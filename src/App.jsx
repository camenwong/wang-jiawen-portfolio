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

  return (
    <article className="project-page-panel">
      <header className="project-hero">
        <div>
          <p className="project-code">[{project.number}]</p>
          <h2>{project.title}</h2>
          <p className="project-year">{project.year}</p>
        </div>

        <ul className="project-tag-cloud">
          {project.tags.map((tag) => (
            <li key={`${project.slug}-tag-${tag}`}>{tag}</li>
          ))}
        </ul>
      </header>

      <section className="project-text-block">
        {(project.about ?? []).map((paragraph, index) => (
          <p key={`${project.slug}-about-${index}`}>{paragraph}</p>
        ))}
      </section>

      <section className="project-versions">

        {(project.versions ?? []).length === 0 ? (
          <p className="empty-state">No content has been added yet.</p>
        ) : (
          (project.versions ?? []).map((version, versionIndex) => {
            const versionNumber = String(versionIndex + 1).padStart(2, "0");
            const videos = version.media?.videos ?? [];
            const youtubeEmbeds = version.media?.youtube ?? [];
            const gallery = version.gallery ?? [];
            const hasMedia = videos.length > 0 || youtubeEmbeds.length > 0;

            return (
              <section className="version-panel" key={version.id ?? `${project.slug}-${versionIndex}`}>
                <header className="version-header">
                  <p className="version-code">[{versionNumber}]</p>
                  <h4>{version.title}</h4>
                  {version.year ? <p className="version-year">{version.year}</p> : null}
                </header>

                {version.summary ? <p className="version-summary">{version.summary}</p> : null}

                {version.heroImage ? (
                  <figure className="project-hero-image">
                    <img src={version.heroImage} alt={`${project.title} ${version.title} hero`} loading="lazy" />
                  </figure>
                ) : null}

                {(version.notes ?? []).length > 0 ? (
                  <div className="project-text-block">
                    {(version.notes ?? []).map((paragraph, noteIndex) => (
                      <p key={`${version.id ?? versionIndex}-note-${noteIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {hasMedia ? (
                  <div className="project-media-stack">
                    {videos.map((video, videoIndex) => (
                      <figure
                        className={`media-card ${video.isReel ? "is-reel" : ""}`}
                        key={`${version.id ?? versionIndex}-video-${videoIndex}`}
                      >
                        <video src={video.src} controls playsInline preload="metadata" />
                        {video.caption ? <figcaption>{video.caption}</figcaption> : null}
                      </figure>
                    ))}

                    {youtubeEmbeds.map((item, youtubeIndex) => (
                      <figure className="media-card" key={`${version.id ?? versionIndex}-youtube-${youtubeIndex}`}>
                        <div className="iframe-wrap">
                          <iframe
                            src={`https://www.youtube.com/embed/${item.youtubeId}`}
                            title={`${project.title} ${version.title} YouTube embed`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                        {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                      </figure>
                    ))}
                  </div>
                ) : null}

                <section className="gallery-panel">
                  {gallery.length > 0 ? (
                    <div className="gallery-grid">
                      {gallery.map((image, imageIndex) => (
                        <button
                          key={`${version.id ?? versionIndex}-gallery-${imageIndex}`}
                          type="button"
                          className="gallery-thumb"
                          onClick={() => setSelectedImage(image)}
                        >
                          <img
                            src={image}
                            alt={`${project.title} ${version.title} image ${imageIndex + 1}`}
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-state">Image set will be added soon.</p>
                  )}
                </section>
              </section>
            );
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
