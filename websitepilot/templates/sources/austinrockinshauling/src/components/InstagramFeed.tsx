import { Instagram, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type InstagramPost = {
  id: number;
  title: string;
  url: string;
  videoSrc: string;
  poster: string;
};

const profile = {
  username: 'rocking_s_hauling',
  name: 'Austin Seals | Junk Removal, Demo & Hauling AZ',
  followers: '2,449',
  posts: '171',
  image: '/instagram/profile.jpg',
  bio: [
    'Servicing East Valley of Phoenix',
    'All of your junk removal & hauling needs',
    'Residential & Commercial',
  ],
};

const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    title: 'East Valley hauling made easy',
    url: 'https://www.instagram.com/p/DBcBorsy_iN/',
    videoSrc: '/instagram/DBcBorsy_iN.mp4',
    poster: '/instagram/DBcBorsy_iN.jpg',
  },
  {
    id: 2,
    title: 'Been busy lately',
    url: 'https://www.instagram.com/p/DWhxUd6jwtl/',
    videoSrc: '/instagram/DWhxUd6jwtl.mp4',
    poster: '/instagram/DWhxUd6jwtl.jpg',
  },
  {
    id: 5,
    title: 'Go get it',
    url: 'https://www.instagram.com/p/DUcAoy0jx4v/',
    videoSrc: '/instagram/DUcAoy0jx4v.mp4',
    poster: '/instagram/DUcAoy0jx4v.jpg',
  },
  {
    id: 6,
    title: 'Tuesday motivation',
    url: 'https://www.instagram.com/p/DUTKBQsjw1A/',
    videoSrc: '/instagram/DUTKBQsjw1A.mp4',
    poster: '/instagram/DUTKBQsjw1A.jpg',
  },
];

const InstagramFeed = () => {
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateDeviceMode = () => setIsTouchDevice(mediaQuery.matches);

    updateDeviceMode();
    mediaQuery.addEventListener('change', updateDeviceMode);

    const enableAudio = () => setHasAudioPermission(true);
    window.addEventListener('pointerdown', enableAudio, { once: true });

    return () => {
      mediaQuery.removeEventListener('change', updateDeviceMode);
      window.removeEventListener('pointerdown', enableAudio);
    };
  }, []);

  const stopAllVideos = useCallback((exceptId?: number) => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      const videoId = Number(key);

      if (!video || videoId === exceptId) return;

      video.pause();
      video.currentTime = 0;
      video.muted = true;
    });
  }, []);

  const stopVideo = useCallback((id: number) => {
    const video = videoRefs.current[id];
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.muted = true;
    setActivePostId((current) => (current === id ? null : current));
  }, []);

  const playVideo = useCallback(
    async (id: number, withSound: boolean) => {
      const video = videoRefs.current[id];
      if (!video) return;

      stopAllVideos(id);

      if (activePostId !== id) {
        video.currentTime = 0;
      }

      video.muted = !withSound;
      video.playsInline = true;
      video.loop = true;

      try {
        await video.play();
        setActivePostId(id);
      } catch {
        if (withSound) {
          try {
            video.muted = true;
            await video.play();
            setActivePostId(id);
          } catch {
            stopVideo(id);
          }
        }
      }
    },
    [activePostId, stopAllVideos, stopVideo]
  );

  const handleDesktopEnter = useCallback(
    (id: number) => {
      if (isTouchDevice) return;
      void playVideo(id, hasAudioPermission);
    },
    [hasAudioPermission, isTouchDevice, playVideo]
  );

  const handleDesktopLeave = useCallback(
    (id: number) => {
      if (isTouchDevice) return;
      stopVideo(id);
    },
    [isTouchDevice, stopVideo]
  );

  const handleMobileToggle = useCallback(
    (id: number) => {
      if (!isTouchDevice) return;
      setHasAudioPermission(true);

      const video = videoRefs.current[id];
      if (!video) return;

      // If this reel is the active (audio-on) one, mute it back to silent autoplay
      if (activePostId === id) {
        video.muted = true;
        setActivePostId(null);
        // Keep it playing muted in the background
        void video.play().catch(() => {});
        return;
      }

      // Mute any previously unmuted reel
      if (activePostId !== null) {
        const prev = videoRefs.current[activePostId];
        if (prev) {
          prev.muted = true;
          void prev.play().catch(() => {});
        }
      }

      // Unmute this reel
      video.muted = false;
      void video.play().then(() => setActivePostId(id)).catch(() => {
        video.muted = true;
        void video.play().catch(() => {});
      });
    },
    [activePostId, isTouchDevice]
  );

  // Mobile autoplay: start all reels muted on touch devices
  useEffect(() => {
    if (!isTouchDevice) return;

    const timers: number[] = [];
    instagramPosts.forEach((post) => {
      const video = videoRefs.current[post.id];
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      const t = window.setTimeout(() => {
        video.play().catch(() => {});
      }, 50);
      timers.push(t);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isTouchDevice]);

  useEffect(() => {
    return () => {
      stopAllVideos();
    };
  }, [stopAllVideos]);

  const activeTitle = useMemo(
    () => instagramPosts.find((post) => post.id === activePostId)?.title,
    [activePostId]
  );

  return (
    <section className="bg-foreground py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--background)) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary font-bold uppercase tracking-[0.25em] text-xs">Follow Us On Instagram</span>
          </div>

          <div className="bg-background/[0.03] border border-background/10 p-6 md:p-8 lg:p-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8">
              <a
                href="https://www.instagram.com/rocking_s_hauling"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
                aria-label="Open Rocking S Hauling on Instagram"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px]" style={{ background: 'var(--gradient-instagram)' }}>
                  <div className="w-full h-full rounded-full border-[3px] border-foreground overflow-hidden bg-background">
                    <img
                      src={profile.image}
                      alt="Rocking S Hauling Instagram profile"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>

              <div className="flex-1 w-full">
                <div className="flex flex-col gap-4 md:gap-5">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                      <a
                        href="https://www.instagram.com/rocking_s_hauling"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-background hover:text-background/80 transition-colors"
                      >
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{profile.username}</h2>
                        <Instagram className="w-5 h-5 text-primary" />
                      </a>
                      <p className="text-background/80 text-sm md:text-base font-medium mt-1">{profile.name}</p>
                    </div>

                    <div className="flex items-center gap-8 md:gap-10">
                      <div>
                        <p className="text-background text-xl md:text-2xl font-black leading-none">{profile.posts}</p>
                        <p className="text-background/60 text-xs md:text-sm uppercase tracking-[0.18em] mt-1">Posts</p>
                      </div>
                      <div>
                        <p className="text-background text-xl md:text-2xl font-black leading-none">{profile.followers}</p>
                        <p className="text-background/60 text-xs md:text-sm uppercase tracking-[0.18em] mt-1">Followers</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-1 text-white text-sm md:text-base leading-relaxed max-w-2xl">
                    {profile.bio.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                    <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-4 py-2 text-background/80">
                      {activePostId ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 text-primary" />}
                      <span>{isTouchDevice ? 'Tap a reel to turn audio on' : 'Hover a reel to preview'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {instagramPosts.map((post, index) => {
            const isActive = activePostId === post.id;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="group relative"
              >
                <div
                  className="relative overflow-hidden border border-background/10 bg-background/5 shadow-2xl aspect-[3/4] md:aspect-[9/16]"
                  onMouseEnter={() => handleDesktopEnter(post.id)}
                  onMouseLeave={() => handleDesktopLeave(post.id)}
                  onClick={() => handleMobileToggle(post.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleMobileToggle(post.id);
                    }
                  }}
                >
                  <video
                    ref={(element) => {
                      videoRefs.current[post.id] = element;
                    }}
                    src={post.videoSrc}
                    poster={post.poster}
                    preload="metadata"
                    playsInline
                    loop
                    muted
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${isActive ? 'scale-[1.03]' : 'scale-100 group-hover:scale-[1.02]'}`}
                    aria-label={post.title}
                  />

                  <div className={`absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-transparent transition-opacity duration-300 ${isActive ? 'opacity-70' : 'opacity-45'}`} />

                  <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between">
                    <span className="inline-flex items-center bg-background/85 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-foreground">
                      Reel
                    </span>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex h-9 w-9 items-center justify-center bg-background/85 text-foreground transition-transform duration-300 hover:scale-105"
                      aria-label={`Open ${post.title} on Instagram`}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-background text-sm font-black leading-tight">{post.title}</p>
                        <p className="text-background/65 text-[11px] uppercase tracking-[0.18em] mt-1">
                          {isTouchDevice ? (isActive ? 'Tap to mute' : 'Tap for sound') : (isActive ? 'Playing' : 'Hover to play')}
                        </p>
                      </div>

                      <div className={`shrink-0 flex h-12 w-12 items-center justify-center border border-background/20 bg-background/10 transition-all duration-300 ${isActive ? 'scale-100 opacity-100 bg-primary/30 border-primary/50' : 'scale-90 opacity-90'}`}>
                        {isActive ? (
                          <Volume2 className="w-5 h-5 text-background" />
                        ) : (
                          <VolumeX className="w-5 h-5 text-background" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
