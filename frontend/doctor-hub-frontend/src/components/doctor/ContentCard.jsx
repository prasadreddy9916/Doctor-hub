import React, { useState } from 'react';
import '../../styles/components/content-card.css';

export default function ContentCard({ content }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const isLocked = !content.is_accessible; // backend should send this

  return (
    <div className={`content-card-wrapper ${isLocked ? 'locked-card' : ''}`}>

      {/* MEDIA */}
      <div className="media-container">

        {/* TYPE BADGE */}
        <span className="type-badge">{content.type}</span>

        {/* 🔒 LOCKED STATE */}
        {isLocked ? (
          <>
            {content.type === 'image' && content.file_url ? (
              <img
                src={content.file_url}
                alt={content.title}
                className="blurred-image"
              />
            ) : (
              <div className="locked-video-placeholder">
                <div className="lock-icon">🔒</div>
                <div className="locked-text">Locked</div>
              </div>
            )}
          </>
        ) : (

          /* 🔓 UNLOCKED STATE */
          <>
            {/* 🖼 IMAGE */}
            {content.type === 'image' && content.file_url && (
              <img
                src={content.file_url}
                alt={content.title}
                className="content-image"
              />
            )}

            {/* 🎬 VIDEO */}
            {content.type === 'video' && content.file_url && (
              <div className="video-player-wrapper">

                {!isPlaying ? (
                  <div
                    className="video-overlay"
                    onClick={() => setIsPlaying(true)}
                  >
                    <span className="play-btn-large">▶</span>
                  </div>
                ) : null}

                <video
                  src={content.file_url}
                  className="video-element"
                  controls={isPlaying}
                />
              </div>
            )}

            {/* 🎤 SEMINAR */}
            {content.type === 'seminar' && content.file_url && (
              <div className="video-player-wrapper">
                <div
                  className="video-overlay"
                  onClick={() => window.open(content.file_url, "_blank")}
                >
                  <span className="play-btn-large">🎤</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* TEXT */}
      <div className={`text-container ${isLocked ? 'blurred-text' : ''}`}>
        <h4 className="content-title">{content.title}</h4>
        <p className="content-desc">{content.description}</p>
      </div>
    </div>
  );
}