export function PhoneGarden() {
  return (
    <div
      aria-label="Illustrative HeadGarden app preview"
      className="phone-garden"
      role="img"
    >
      <div aria-hidden="true" className="phone-garden__contour phone-garden__contour--outer" />
      <div aria-hidden="true" className="phone-garden__contour phone-garden__contour--inner" />
      <div className="phone-garden__device">
        <div aria-hidden="true" className="phone-garden__speaker" />
        <div className="phone-garden__screen">
          <div className="phone-garden__topline">
            <span>Today</span>
            <span aria-hidden="true" className="phone-garden__seed-dot" />
          </div>
          <p className="phone-garden__hello">A little space for now.</p>
          <div className="phone-garden__practice">
            <span className="phone-garden__practice-label">A small reset</span>
            <strong>Two-minute reset</strong>
            <span className="phone-garden__duration">2 min · guided</span>
            <span aria-hidden="true" className="phone-garden__play">▶</span>
          </div>
          <div className="phone-garden__program">
            <span className="phone-garden__program-count">02 / 05</span>
            <div>
              <span>Evening program</span>
              <strong>A quieter evening</strong>
            </div>
          </div>
          <div className="phone-garden__reflection">
            <span aria-hidden="true" className="phone-garden__orb" />
            <span>What would feel supportive next?</span>
          </div>
          <div aria-hidden="true" className="phone-garden__nav">
            <span className="phone-garden__nav-active" />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <span className="phone-garden__caption">An app-authored preview</span>
    </div>
  );
}
