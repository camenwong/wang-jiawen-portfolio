const abyssialMimesis = {
  slug: "abyssial-mimesis",
  number: "001",
  title: "Abyssial Mimesis",
  year: "2025",
  status: "published",
  tags: ["Installation", "Audiovisual", "Performance", "Generative"],
  shortDescription:
    "A generative immersive audiovisual installation exploring deep-sea imaginary probabilities through the interplay of digital subconscious.",
  coverImage: "/media/abyssial/hero-01.png",
  exhibitedAt: [
    "Medienhaus UdK Berlin, 2025",
    "UdK Award Nomination Exhibition, 2025"
  ],
  performance: [
    "neuMERZ presents, Monopol Berlin, 2025"
  ],
  about: [
    "In Abyssial Mimesis, the uncharted territories of the digital subconscious are brought to life through the lens of speculative biology. Deep-sea creatures often evoke a sense of mystery and the unknown. They are reminders of the vastness and complexity of the world beyond our immediateperception. This immersive audiovisual installation imagines the probability of digital lifeforms from the collective unconscious. Using generative algorithms and AI-driven image creation, it visualizes hypothetical entities, drawing striking parallels between the hidden depths of the ocean and the unexamined recesses of our shared digital psyche.",
  ],
  modules: [
    {
      id: "abyssial-reel",
      type: "video",
      src: "/media/abyssial/reel.mp4",
      caption: "Project reel",
      isReel: true
    },
    {
      id: "abyssial-text-01",
      type: "text",
      paragraphs: [
        "The installation unfolds in two interconnected parts",
        "1. In the first part of the installation, points and lines—raw data as genetic material—collide and mutate, creating unstable geometries. These digital organisms evolve in real-time within an artificial intelligence model, their forms trying to resemble deep-sea metamorphosis. The work utilizes a Stable Diffusion model, treating it like found footage—repurposing existing datasets to examine how media culture constructs visual expectations and conditions perception.",
        "This is the unwrapping—the raw, chaotic becoming of life.",
        "2. The second phase shifts to a contemplative space, presenting these inhabitants of the digital deep as specimens, labeled and displayed in an archive. To reinforce this system, the work incorporates a modified version of FathomNet’s marine taxonomy, a dataset used to classify real deep-sea life, now repurposed to label AI-generated entities with no biological origin. This subtle distortion highlights the limits of classification, questioning how scientific methods shape our perception of reality. This is the wrapping—a attempt to grasp the infinite within human categories. The archive is not a display of truth, but a mirror of our hunger to name the unnameable",
        "The project draws from Gotthard Günther’s polycontexturality and Vilem Flusser’s theory of technical images, exploring the ways in which digital tools shape our perception of the world. Mimesis (Greek for imitation) traditionally refers to art’s ability to mirror reality. Here, it is reimagined: AI does not imitate nature but mimics the act of creation itself, generating speculative entities from collective data—cultural, digital, and biological. Like the deep sea—a realm resistant to human observation—these forms reflect not reality, but the hidden patterns and biases of the systems that create them. The work asks: What does it mean to COPY when there is no original, only endless feedback loops between data and imagination?",
      ]
    },
    {
      id: "abyssial-image-01",
      type: "image",
      src: "/media/abyssial/hero-02.png",
      alt: "Abyssial Mimesis documentation still"
    },
    {
      id: "abyssial-gallery-01",
      type: "gallery",
      images: [
        "/media/abyssial/gallery-01.png",
        "/media/abyssial/gallery-02.png",
        "/media/abyssial/gallery-03.jpg",
        "/media/abyssial/gallery-04.jpg",
        "/media/abyssial/gallery-05.jpg",
        "/media/abyssial/gallery-06.png"
      ]
    },
    {
      id: "abyssial-youtube-01",
      type: "youtube",
      youtubeId: "gvURBEEuNos",
      caption: "YouTube documentation"
    },
  ]
};

export default abyssialMimesis;
