"use client";

import { useState, useMemo } from "react";
import { Brain, ListVideo, Play } from "lucide-react";
import { useStudyStore } from "@/lib/store";
import { computeWeaknessStats } from "@/lib/analytics";
import { WEAKNESS_PRIORITIES } from "@/lib/domains";
import {
  ALL_VIDEOS,
  PLAYLIST_ID,
  getVideosForTags,
  type MesserVideo,
} from "@/data/videos";
import type { WeaknessTag } from "@/lib/types";

type Tab = "recommended" | "all";

// ─── Video Card ──────────────────────────────────────────────────────────────
function VideoCard({
  video,
  isSelected,
  onSelect,
}: {
  video: MesserVideo;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex gap-3 p-3 rounded-xl text-left transition-all ${
        isSelected
          ? "bg-purple-900/60 ring-1 ring-purple-500"
          : "bg-gray-800/60 hover:bg-gray-700/60"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-28 rounded-lg overflow-hidden bg-gray-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
          alt=""
          className="w-full h-full object-cover"
          style={{ aspectRatio: "16/9" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full p-1.5 ${
              isSelected ? "bg-purple-500" : "bg-black/60"
            }`}
          >
            <Play size={14} className="text-white" fill="white" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-0.5">
        <p
          className={`text-sm font-semibold leading-snug line-clamp-2 ${
            isSelected ? "text-purple-200" : "text-gray-100"
          }`}
        >
          {video.title}
        </p>
        <p className="mt-1 text-xs text-gray-400 truncate">{video.section}</p>
        <p className="mt-0.5 text-xs text-gray-500">{video.duration}</p>
      </div>
    </button>
  );
}

// ─── Recommended Tab ─────────────────────────────────────────────────────────
function RecommendedTab({
  videos,
  hasQuizData,
  usesRecentSessions,
  selected,
  onSelect,
}: {
  videos: MesserVideo[];
  hasQuizData: boolean;
  usesRecentSessions: boolean;
  selected: MesserVideo | null;
  onSelect: (v: MesserVideo) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Brain size={13} className="text-purple-400" />
        <span>
          {usesRecentSessions
            ? "Based on your latest 2 quiz weak spots"
            : hasQuizData
            ? "Based on your quiz weak spots"
            : "Top priority topics — take quizzes to personalise"}
        </span>
      </div>
      {videos.map((v) => (
        <VideoCard
          key={v.id}
          video={v}
          isSelected={selected?.id === v.id}
          onSelect={() => onSelect(v)}
        />
      ))}
    </div>
  );
}

// ─── All Videos Tab ───────────────────────────────────────────────────────────
function AllVideosTab({
  groups,
  selected,
  onSelect,
}: {
  groups: Map<string, MesserVideo[]>;
  selected: MesserVideo | null;
  onSelect: (v: MesserVideo) => void;
}) {
  return (
    <div className="space-y-5">
      {Array.from(groups.entries()).map(([section, videos]) => (
        <div key={section}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2 px-1">
            {section}
          </h3>
          <div className="space-y-2">
            {videos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                isSelected={selected?.id === v.id}
                onSelect={() => onSelect(v)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VideosPage() {
  const { questionStats, sessions } = useStudyStore();
  const [activeTab, setActiveTab] = useState<Tab>("recommended");
  const [selectedVideo, setSelectedVideo] = useState<MesserVideo | null>(null);

  const hasQuizData = Object.keys(questionStats).length > 0;
  const recentWeakTags = useMemo(() => {
    const recentSessions = sessions
      .filter((s) => s.weaknessResults && Object.keys(s.weaknessResults).length > 0)
      .sort((a, b) => b.finishedAt - a.finishedAt)
      .slice(0, 2);

    if (recentSessions.length === 0) return [];

    const byTag = new Map<WeaknessTag, { attempted: number; correct: number }>();

    for (const session of recentSessions) {
      for (const [tag, result] of Object.entries(session.weaknessResults ?? {})) {
        const weaknessTag = tag as WeaknessTag;
        const existing = byTag.get(weaknessTag) ?? { attempted: 0, correct: 0 };
        byTag.set(weaknessTag, {
          attempted: existing.attempted + result.total,
          correct: existing.correct + result.correct,
        });
      }
    }

    return Array.from(byTag.entries())
      .map(([tag, v]) => ({
        tag,
        attempted: v.attempted,
        accuracyPct: v.attempted === 0 ? 0 : Math.round((v.correct / v.attempted) * 100),
      }))
      .filter((s) => s.attempted > 0 && s.accuracyPct < 80)
      .sort((a, b) => a.accuracyPct - b.accuracyPct)
      .map((s) => s.tag);
  }, [sessions]);

  // Compute recommended videos based on weak areas
  const recommendedVideos = useMemo(() => {
    if (recentWeakTags.length > 0) {
      return getVideosForTags(recentWeakTags).slice(0, 15);
    }

    const stats = computeWeaknessStats(questionStats);

    // Tags where the user is actually struggling (attempted & < 80% accuracy)
    const weakTags = stats
      .filter((s) => s.attempted > 0 && s.accuracyPct < 80)
      .map((s) => s.tag);

    // If no quiz history yet, fall back to highest-priority tags
    if (weakTags.length === 0) {
      const defaultTags = Object.entries(WEAKNESS_PRIORITIES)
        .sort((a, b) => b[1].priority - a[1].priority)
        .slice(0, 10)
        .map(([tag]) => tag as WeaknessTag);
      return getVideosForTags(defaultTags).slice(0, 12);
    }

    return getVideosForTags(weakTags).slice(0, 15);
  }, [questionStats, recentWeakTags]);

  // Group all videos by section for the "All Videos" tab
  const videosBySection = useMemo(() => {
    const grouped = new Map<string, MesserVideo[]>();
    for (const video of ALL_VIDEOS) {
      const list = grouped.get(video.section) ?? [];
      list.push(video);
      grouped.set(video.section, list);
    }
    return grouped;
  }, []);

  function handleSelect(video: MesserVideo) {
    setSelectedVideo((prev) => (prev?.id === video.id ? null : video));
  }

  // The player src: selected video or the full playlist
  const playerSrc = selectedVideo
    ? `https://www.youtube-nocookie.com/embed/${selectedVideo.id}?autoplay=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0`;

  const playerTitle = selectedVideo
    ? selectedVideo.title
    : "Professor Messer A+ Course";

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      {/* ── Sticky player ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-gray-950">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            key={playerSrc}
            className="absolute inset-0 w-full h-full"
            src={playerSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={playerTitle}
          />
        </div>

        {selectedVideo && (
          <div className="px-4 py-2 bg-gray-900 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {selectedVideo.title}
              </p>
              <p className="text-xs text-gray-400">{selectedVideo.section}</p>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="flex-shrink-0 text-xs text-gray-500 hover:text-gray-300 mt-0.5"
            >
              Back to playlist
            </button>
          </div>
        )}

        {/* ── Tab bar ──────────────────────────────────────────────────────── */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("recommended")}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "recommended"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Brain size={15} />
            Recommended
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "all"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <ListVideo size={15} />
            All Videos
          </button>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="p-4">
        {activeTab === "recommended" ? (
          <RecommendedTab
            videos={recommendedVideos}
            hasQuizData={hasQuizData}
            usesRecentSessions={recentWeakTags.length > 0}
            selected={selectedVideo}
            onSelect={handleSelect}
          />
        ) : (
          <AllVideosTab
            groups={videosBySection}
            selected={selectedVideo}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
}
