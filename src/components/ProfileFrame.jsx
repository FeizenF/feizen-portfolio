import { profile } from '../data/profile'

export default function ProfileFrame({ className = '' }) {
  return (
    <figure className={`portrait-card ${className}`.trim()}>
      <div className="portrait-card-media">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={profile.alt}
            width="880"
            height="1100"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="portrait-fallback" aria-hidden="true">
            <span className="portrait-fallback-grid" />
            <span className="portrait-fallback-mark">{profile.monogram}</span>
            <span className="portrait-fallback-word">{profile.name}</span>
            <span className="portrait-fallback-role">
              CYBERSECURITY STUDENT
            </span>
            <span className="portrait-fallback-line" />
            <span className="portrait-fallback-caption">{profile.caption}</span>
            <span className="portrait-fallback-side">FZ / 001</span>
          </div>
        )}

        <span className="portrait-scan" aria-hidden="true" />
        <span className="portrait-corner portrait-corner--tl" aria-hidden="true" />
        <span className="portrait-corner portrait-corner--tr" aria-hidden="true" />
        <span className="portrait-corner portrait-corner--bl" aria-hidden="true" />
        <span className="portrait-corner portrait-corner--br" aria-hidden="true" />
      </div>

      <figcaption className="portrait-caption">
        <span className="label">{profile.meta}</span>
        <span className="label portrait-caption-file">{profile.caption}</span>
      </figcaption>
    </figure>
  )
}
