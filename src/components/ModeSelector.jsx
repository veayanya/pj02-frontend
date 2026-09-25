export default function ModeSelector({ groups, activeMode, onSelect }) {
  return (
    <div className="mode-selector">
      {groups.map((group) => (
        <div key={group.label} className="mode-group">
          <p className="mode-group-label">{group.label}</p>
          <div className="mode-chip-row">
            {group.options.map((opt) => {
              const active = activeMode === opt.mode;
              return (
                <button
                  key={opt.mode}
                  onClick={() => onSelect(opt.mode)}
                  aria-pressed={active}
                  className={`mode-chip${active ? " mode-chip-active" : ""}`}
                >
                  {opt.icon} {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
