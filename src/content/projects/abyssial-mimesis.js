const abyssialMimesis = {
  slug: "abyssial-mimesis",
  number: "001",
  title: "Abyssial Mimesis",
  year: "2025",
  status: "published",
  tags: ["Installation", "Audiovisual", "Performance"],
  shortDescription:
    "An audiovisual environment that blends ritual movement, synthetic memory, and embodied signal feedback.",
  coverImage: "/media/abyssial/hero-01.png",
  about: [
    "Abyssial Mimesis stages a porous boundary between body and machine, where gesture becomes score and feedback becomes narrative.",
    "The piece layers projection, moving image, and rhythmic structures to create an unstable atmosphere of memory and myth.",
    "This web archive mirrors the former Cargo structure while adding cleaner navigation and better mobile behavior."
  ],
  versions: [
    {
      id: "abyssial-v1",
      title: "Core Stage Form",
      year: "2025",
      summary: "Initial web documentation pass with full reel and first gallery set.",
      heroImage: "/media/abyssial/hero-02.png",
      notes: [
        "This phase focuses on body-machine interplay through projected image and responsive sound.",
        "It establishes the first visual language used in the live installation."
      ],
      media: {
        videos: [{ src: "/media/abyssial/reel.mp4", caption: "Project reel", isReel: true }],
        youtube: [{ youtubeId: "M7lc1UVf-VE", caption: "YouTube documentation" }]
      },
      gallery: [
        "/media/abyssial/gallery-01.png",
        "/media/abyssial/gallery-02.png",
        "/media/abyssial/gallery-03.jpg"
      ]
    },
    {
      id: "abyssial-v2",
      title: "Expanded Spatial Composition",
      year: "2025",
      summary: "Second pass with altered pacing and denser environmental visuals.",
      notes: [
        "The second setup explores slower transitions and layered movement fields.",
        "Audience circulation and sightline choreography become part of the score."
      ],
      media: {
        videos: [],
        youtube: []
      },
      gallery: [
        "/media/abyssial/gallery-04.jpg",
        "/media/abyssial/gallery-05.jpg",
        "/media/abyssial/gallery-06.png"
      ]
    }
  ]
};

export default abyssialMimesis;
