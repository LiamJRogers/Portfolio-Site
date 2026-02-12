import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChevronRight from "@mui/icons-material/ChevronRight";

const ALBUM_ID = 1094908663;

const DiscVariants = {
  in: { x: "0%", opacity: 0.9 },
  hover: { x: "25%", opacity: 1 },
  out: { x: "80%", opacity: 1 },
};

const CoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
};

export default function VinylPlayer({
  setInvert,
}: {
  setInvert: (invert: boolean) => void;
}) {
  const [isOut, setIsOut] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [artwork, setArtwork] = useState<string | null>(null);
  const [trackName, setTrackName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [trackUrl, setTrackUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch(`https://itunes.apple.com/lookup?id=${ALBUM_ID}&entity=song`)
      .then((res) => res.json())
      .then((data) => {
        const album = data.results && data.results[0];
        const track =
          data.results &&
          data.results.find(
            (item: any) => item.wrapperType === "track" && item.previewUrl,
          );
        if (album) {
          const artworkUrl = album.artworkUrl100.replace("100x100", "600x600");
          setArtwork(artworkUrl);
          setArtistName(album.artistName);
        }
        if (track) {
          setTrackName(track.trackName);
          setPreviewUrl(track.previewUrl);
          setTrackUrl(track.trackViewUrl || null);
        }
      });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [previewUrl]);

  let discState: "in" | "hover" | "out" = "in";
  if (isOut) discState = "out";
  else if (isHovered) discState = "hover";

  const handleDiscIn = () => {
    setIsOut(false);
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleDiscClick = () => {
    if (isOut) {
      handleDiscIn();
    }
  };

  const handleArtworkClick = () => {
    setIsOut((prev) => !prev);
    if (isOut) {
      handleDiscIn();
    }
  };

  const handlePlayStopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current && previewUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xs md:max-w-80">
      <div className="relative w-full aspect-square">
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 m-auto rounded-full z-0 w-10/12 h-10/12"
            style={{
              background:
                "radial-gradient(circle at center, #0a0a0a 0%, #000000 80%)",
              boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.5)",
              cursor: isOut ? "pointer" : "default",
            }}
            variants={DiscVariants}
            initial="in"
            animate={discState}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            onClick={handleDiscClick}
            onMouseEnter={() => setInvert(true)}
            onMouseLeave={() => setInvert(false)}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full"
              style={{
                background:
                  "repeating-radial-gradient(circle at center, #333 0, #333 1px, transparent 1px, transparent 4px)",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-gray-400 rounded-full flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.15 }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition cursor-pointer"
                style={{ outline: "none", border: "none" }}
                tabIndex={0}
                aria-label={isPlaying ? "Stop" : "Play"}
                onClick={handlePlayStopClick}
              >
                {isPlaying ? (
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-gray-800"
                  >
                    <rect x="5" y="5" width="10" height="10" rx="2" />
                  </svg>
                ) : (
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-gray-800"
                  >
                    <polygon points="6,4 16,10 6,16" />
                  </svg>
                )}
              </motion.button>
              <motion.div
                className="absolute w-full h-full"
                animate={{ rotate: isOut || isHovered ? 360 : 0 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                style={{ zIndex: -1 }}
              />
            </div>
            {previewUrl && <audio ref={audioRef} src={previewUrl} />}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="relative w-full h-full rounded shadow-xl z-10 overflow-hidden cursor-pointer"
          variants={CoverVariants}
          initial="initial"
          whileHover="hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleArtworkClick}
        >
          <img
            src={artwork ?? undefined}
            alt={trackName}
            className="object-cover w-full h-full"
            draggable={false}
          />
          <AnimatePresence>
            {(isHovered || isOut) && (
              <motion.span
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-all"
                animate={{ rotate: isOut ? 180 : 0, opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <ChevronRight fontSize="large" className="text-gray-800" />
              </motion.span>
            )}
          </AnimatePresence>
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 rounded px-2 py-1 text-xs text-gray-800">
            <div>{trackName}</div>
            <div className="text-gray-500">{artistName}</div>
          </div>
        </motion.div>
      </div>
      <span
        className="text-xs text-gray-500 mt-4 text-center w-full"
        style={{ fontFamily: "'Nothing You Could Do', cursive" }}
      >
        Music preview and artwork courtesy of{" "}
        <a
          href={trackUrl || "https://music.apple.com/"}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Apple Music
        </a>
        .
      </span>
    </div>
  );
}
