import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, Flame, GitPullRequest, GitCommit, Activity, ExternalLink } from 'lucide-react';

/* ─────────────────────────────────────────────
   Stat Cell – used in both cards
   ───────────────────────────────────────────── */
const StatCell = ({ label, value, icon, accent }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  }}>
    <span style={{
      fontSize: '0.7rem',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--text-secondary)',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }}>
      {icon && React.cloneElement(icon, { size: 11, style: { opacity: 0.7 } })}
      {label}
    </span>
    <strong style={{
      fontSize: '1.2rem',
      fontWeight: '700',
      color: accent || 'var(--text-primary)',
      fontFamily: 'var(--font-heading)',
      lineHeight: 1,
    }}>
      {value}
    </strong>
  </div>
);

/* ─────────────────────────────────────────────
   Difficulty Chip
   ───────────────────────────────────────────── */
const DiffChip = ({ label, count, color, bg, border }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '12px',
    background: bg,
    border: `1px solid ${border}`,
    flex: 1,
    minWidth: 0,
  }}>
    <span style={{
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: color,
      flexShrink: 0,
      boxShadow: `0 0 6px ${color}`,
    }} />
    <span style={{
      fontSize: '0.78rem',
      fontWeight: '600',
      color: color,
      flexShrink: 0,
    }}>
      {label}
    </span>
    <span style={{
      fontSize: '0.95rem',
      fontWeight: '800',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-heading)',
      marginLeft: 'auto',
    }}>
      {count}
    </span>
  </div>
);

/* ─────────────────────────────────────────────
   Contribution color scale
   ───────────────────────────────────────────── */
const getContributionColor = (level) => {
  switch (level) {
    case 0: return 'rgba(255,255,255,0.03)';
    case 1: return 'rgba(16,185,129,0.18)';
    case 2: return 'rgba(16,185,129,0.40)';
    case 3: return 'rgba(16,185,129,0.68)';
    case 4: return 'rgba(16,185,129,0.96)';
    default: return 'rgba(255,255,255,0.03)';
  }
};

/* ─────────────────────────────────────────────
   Card wrapper animation variant
   ───────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────────────────────────────────────
   Loading skeleton shimmer
   ───────────────────────────────────────────── */
const LoadingOverlay = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: 'rgba(10,10,12,0.88)',
    backdropFilter: 'blur(6px)',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    zIndex: 10,
  }}>
    <div style={{
      width: '36px', height: '36px', borderRadius: '50%',
      border: '3px solid var(--glass-border)',
      borderTopColor: 'var(--accent-primary)',
      animation: 'spin 0.8s linear infinite',
    }} />
    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
      Fetching live stats…
    </span>
  </div>
);

/* ═════════════════════════════════════════════
   Main Component
   ═════════════════════════════════════════════ */
const CodingStats = () => {
  const [stats, setStats] = useState({
    leetcode: {
      totalSolved: 306,
      easy:   { solved: 188, total: 956,  color: '#10b981' },
      medium: { solved: 114, total: 2088, color: '#f59e0b' },
      hard:   { solved: 4,   total: 955,  color: '#ef4444' },
      ranking: '467,428',
      acceptance: '58.7%',
      activeStreak: 47,
    },
    github: {
      username: 'Antony136',
      totalCommits: '840+',
      publicRepos: 24,
      pullRequests: 42,
      contributionsThisYear: 624,
    },
  });

  const [loading, setLoading]           = useState(true);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [hoveredSquare, setHoveredSquare] = useState(null);

  /* ── seed grid for initial render ── */
  const getInitialGrid = (year) => {
    const seed = [0,1,0,2,0,3,1,0,2,4,1,0,3,2,0,1,2,0,4,1,3,0,1,2,0,1,3,4,0,2,1,0];
    return Array.from({ length: 365 }, (_, i) => ({
      level: seed[i % seed.length],
      count: seed[i % seed.length] > 0 ? seed[i % seed.length] * 2 - 1 : 0,
      date: `${year}-${String(Math.floor(i/30)+1).padStart(2,'0')}-${String((i%30)+1).padStart(2,'0')}`,
    }));
  };

  const [allContributions, setAllContributions] = useState(
    () => [...getInitialGrid('2025'), ...getInitialGrid('2026')]
  );

  /* ── data fetching (unchanged logic) ── */
  useEffect(() => {
    const fetchStats = async () => {
      const BACKEND_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000/api/stats'
        : 'https://portfolio-o6p3.onrender.com/api/stats';

      try {
        const res  = await fetch(BACKEND_URL);
        const data = await res.json();
        if (data.success) {
          setStats(prev => ({
            leetcode: {
              ...prev.leetcode, ...data.leetcode,
              easy:   { ...prev.leetcode.easy,   ...data.leetcode?.easy   },
              medium: { ...prev.leetcode.medium, ...data.leetcode?.medium },
              hard:   { ...prev.leetcode.hard,   ...data.leetcode?.hard   },
            },
            github: { ...prev.github, ...data.github },
          }));
          if (data.github?.contributionGrid?.length > 0)
            setAllContributions(data.github.contributionGrid);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend stats fetch failed, using direct fallbacks…', err.message);
      }

      /* ── browser-side fallbacks ── */
      try {
        const [ghProfileRes, ghReposRes] = await Promise.all([
          fetch('https://api.github.com/users/Antony136'),
          fetch('https://api.github.com/users/Antony136/repos?per_page=100'),
        ]);

        let githubData = {
          publicRepos: 24, totalCommits: '840+', pullRequests: 42, contributionsThisYear: 624,
        };

        if (ghProfileRes.ok && ghReposRes.ok) {
          const profile = await ghProfileRes.json();
          const repos   = await ghReposRes.json();
          githubData.publicRepos = profile.public_repos;
        }

        try {
          const prsRes = await fetch('https://api.github.com/search/issues?q=author:Antony136+type:pr');
          if (prsRes.ok) githubData.pullRequests = (await prsRes.json()).total_count;
        } catch (e) { /* silent */ }

        try {
          const cRes = await fetch('https://github-contributions-api.jogruber.de/v4/Antony136');
          if (cRes.ok) {
            const cd = await cRes.json();
            if (cd.total) {
              const total = Object.values(cd.total).reduce((a, c) => a + c, 0);
              githubData.totalCommits = `${total}`;
              const yr = new Date().getFullYear();
              githubData.contributionsThisYear = cd.total[yr] || cd.total[yr-1] || 0;
            }
            if (cd.contributions) {
              setAllContributions(
                cd.contributions
                  .filter(d => d.date.startsWith('2025') || d.date.startsWith('2026'))
                  .map(d => ({ count: d.count, level: d.level, date: d.date }))
              );
            }
          }
        } catch (e) { /* silent */ }

        let leetcodeData = {};
        try {
          const [lcSolvedRes, lcProfileRes, lcCalendarRes] = await Promise.all([
            fetch('https://alfa-leetcode-api.onrender.com/Antony_136/solved'),
            fetch('https://alfa-leetcode-api.onrender.com/Antony_136'),
            fetch('https://alfa-leetcode-api.onrender.com/Antony_136/calendar'),
          ]);

          if (lcSolvedRes.ok && lcProfileRes.ok) {
            const lcSolved   = await lcSolvedRes.json();
            const lcProfile  = await lcProfileRes.json();

            let acceptanceRate = '58.7%';
            if (lcSolved.acSubmissionNum && lcSolved.totalSubmissionNum) {
              const acCount  = lcSolved.acSubmissionNum.find(s => s.difficulty === 'All')?.submissions || 0;
              const subCount = lcSolved.totalSubmissionNum.find(s => s.difficulty === 'All')?.submissions || 0;
              if (subCount > 0) acceptanceRate = `${((acCount / subCount) * 100).toFixed(1)}%`;
            }

            // Pull live streak from calendar endpoint
            let activeStreak = 47;
            if (lcCalendarRes.ok) {
              const lcCal = await lcCalendarRes.json();
              if (lcCal.streak !== undefined) activeStreak = lcCal.streak;
            }

            leetcodeData = {
              totalSolved: lcSolved.solvedProblem,
              easy:        { solved: lcSolved.easySolved,   total: 956  },
              medium:      { solved: lcSolved.mediumSolved, total: 2088 },
              hard:        { solved: lcSolved.hardSolved,   total: 955  },
              ranking:     lcProfile.ranking?.toLocaleString() || '467,428',
              acceptance:  acceptanceRate,
              activeStreak,
            };
          }
        } catch (e) { /* silent */ }

        setStats(prev => ({
          leetcode: {
            ...prev.leetcode, ...leetcodeData,
            easy:   { ...prev.leetcode.easy,   ...leetcodeData.easy   },
            medium: { ...prev.leetcode.medium, ...leetcodeData.medium },
            hard:   { ...prev.leetcode.hard,   ...leetcodeData.hard   },
          },
          github: { ...prev.github, ...githubData },
        }));
      } catch (err) {
        console.error('All stats requests failed, using defaults.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  /* ── derived values ── */
  const contributionGrid  = allContributions.filter(d => d.date.startsWith(selectedYear));
  const gridColumns       = Math.ceil(contributionGrid.length / 7) || 53;
  const yearContributions = contributionGrid.reduce((a, c) => a + c.count, 0);

  const longestStreakVal = (() => {
    let longest = 0, current = 0;
    for (const d of allContributions) {
      if (d.count > 0) { current++; if (current > longest) longest = current; }
      else current = 0;
    }
    return longest > 0 ? longest : 58;
  })();

  /* ═══ RENDER ═══ */
  return (
    <>
      {/* Spin keyframe injected once */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .cs-card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .cs-card-hover:hover { transform: translateY(-6px); }
      `}</style>

      <section id="coding-stats">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '16px' }}>
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto',
            fontSize: '1.05rem',
            lineHeight: '1.7',
          }}>
            Live statistics from my LeetCode journey and GitHub activity, showcasing
            consistent problem solving and open-source contributions.
          </p>
        </motion.div>

        {/* ── Two-Card Grid ── */}
        <div className="grid grid-2" style={{ gap: '32px', alignItems: 'stretch' }}>

          {/* ════════════════════════════════════
              LEETCODE CARD
              ════════════════════════════════════ */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card cs-card-hover"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '24px',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
            }}
            whileHover={{
              borderColor: 'rgba(245,158,11,0.35)',
              boxShadow: '0 20px 40px -12px rgba(245,158,11,0.12)',
            }}
          >
            {loading && <LoadingOverlay />}

            {/* Subtle top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: '36px', right: '36px', height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)',
              borderRadius: '0 0 4px 4px',
            }} />

            {/* ── Card Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f59e0b',
              }}>
                <Code2 size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  LeetCode
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>@Antony_136</span>
              </div>
            </div>

            {/* ── Hero Metric: Problems Solved ── */}
            <div style={{ marginBottom: '32px' }}>
              <span style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-secondary)',
                fontWeight: '700',
              }}>
                Problems Solved
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
                <span style={{
                  fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                  fontWeight: '800',
                  lineHeight: 1,
                  fontFamily: 'var(--font-heading)',
                  background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--accent-secondary))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stats.leetcode.totalSolved}
                </span>
              </div>
            </div>

            {/* ── Secondary Stats Row ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              padding: '24px 0',
              borderTop: '1px solid var(--glass-border)',
              marginBottom: '28px',
            }}>
              <StatCell
                label="Global Rank"
                value={`#${stats.leetcode.ranking}`}
                accent="#a855f7"
              />
              <StatCell
                label="Streak"
                value={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Flame size={15} color="#ef4444" />
                    {stats.leetcode.activeStreak}d
                  </span>
                }
                accent="#ef4444"
              />
              <StatCell
                label="Acceptance"
                value={stats.leetcode.acceptance}
                accent="#10b981"
              />
            </div>

            {/* ── Difficulty Chips ── */}
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '32px',
            }}>
              <DiffChip
                label="Easy"
                count={stats.leetcode.easy.solved}
                color="#10b981"
                bg="rgba(16,185,129,0.05)"
                border="rgba(16,185,129,0.15)"
              />
              <DiffChip
                label="Medium"
                count={stats.leetcode.medium.solved}
                color="#f59e0b"
                bg="rgba(245,158,11,0.05)"
                border="rgba(245,158,11,0.15)"
              />
              <DiffChip
                label="Hard"
                count={stats.leetcode.hard.solved}
                color="#ef4444"
                bg="rgba(239,68,68,0.05)"
                border="rgba(239,68,68,0.15)"
              />
            </div>

            {/* ── Footer CTA ── */}
            <div style={{ marginTop: 'auto' }}>
              <motion.a
                href="https://leetcode.com/u/Antony_136/"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  color: '#f59e0b',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                whileHover="hov"
              >
                View Profile
                <motion.span variants={{ hov: { x: 4 } }} transition={{ type: 'spring', stiffness: 500, damping: 12 }}>
                  →
                </motion.span>
              </motion.a>
            </div>
          </motion.div>

          {/* ════════════════════════════════════
              GITHUB CARD
              ════════════════════════════════════ */}
          <motion.div
            custom={0.12}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card cs-card-hover"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '24px',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
            }}
            whileHover={{
              borderColor: 'rgba(99,102,241,0.35)',
              boxShadow: '0 20px 40px -12px rgba(99,102,241,0.12)',
            }}
          >
            {loading && <LoadingOverlay />}

            {/* Subtle top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: '36px', right: '36px', height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
              borderRadius: '0 0 4px 4px',
            }} />

            {/* ── Card Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-primary)',
              }}>
                <Github size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  GitHub
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>@Antony136</span>
              </div>
            </div>

            {/* ── Contribution Heatmap ── */}
            <div style={{ marginBottom: '28px' }}>
              {/* Heatmap title row + year toggle */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '14px',
              }}>
                <div>
                  <span style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-secondary)',
                    fontWeight: '700',
                    display: 'block',
                  }}>
                    Contribution Stream
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '3px', display: 'block' }}>
                    {yearContributions.toLocaleString()} contributions in {selectedYear}
                  </span>
                </div>

                {/* Year Toggle */}
                <div style={{
                  display: 'flex',
                  gap: '3px',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '3px',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                }}>
                  {['2025', '2026'].map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      style={{
                        padding: '4px 14px',
                        background: selectedYear === year
                          ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                          : 'transparent',
                        border: 'none',
                        color: selectedYear === year ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '5px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heatmap */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                  gridTemplateRows: 'repeat(7, 1fr)',
                  gap: '3px',
                  background: 'rgba(255,255,255,0.015)',
                  padding: '10px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  overflowX: 'auto',
                }}>
                  {contributionGrid.map((day, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.35 }}
                      onMouseEnter={() => setHoveredSquare(day)}
                      onMouseLeave={() => setHoveredSquare(null)}
                      style={{
                        aspectRatio: '1',
                        borderRadius: '2.5px',
                        backgroundColor: getContributionColor(day.level),
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                    />
                  ))}
                </div>

                {/* Tooltip */}
                {hoveredSquare && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-44px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    zIndex: 20,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}>
                    <strong>
                      {hoveredSquare.count === 0
                        ? 'No contributions'
                        : `${hoveredSquare.count} contribution${hoveredSquare.count > 1 ? 's' : ''}`}
                    </strong>{' '}
                    on {new Date(hoveredSquare.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>

              {/* Legend */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '5px',
                marginTop: '10px',
                fontSize: '0.68rem',
                color: 'var(--text-secondary)',
              }}>
                <span>Less</span>
                {[0,1,2,3,4].map(l => (
                  <div key={l} style={{
                    width: '9px', height: '9px', borderRadius: '2px',
                    background: getContributionColor(l),
                    border: l === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }} />
                ))}
                <span>More</span>
              </div>
            </div>

            {/* ── GitHub Metrics ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '12px',
              padding: '24px 0',
              borderTop: '1px solid var(--glass-border)',
              marginBottom: '28px',
            }}>
              <StatCell
                label="Commits"
                value={stats.github.totalCommits}
                icon={<GitCommit />}
                accent="var(--accent-primary)"
              />
              <StatCell
                label="Repos"
                value={stats.github.publicRepos}
                icon={<Activity />}
              />
              <StatCell
                label="PRs"
                value={stats.github.pullRequests}
                icon={<GitPullRequest />}
                accent="#10b981"
              />
              <StatCell
                label="Streak"
                value={`${longestStreakVal}d`}
                icon={<Flame />}
                accent="#ef4444"
              />
            </div>

            {/* ── Footer CTA ── */}
            <div style={{ marginTop: 'auto' }}>
              <motion.a
                href="https://github.com/Antony136"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'var(--accent-primary)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                whileHover="hov"
              >
                Explore GitHub
                <motion.span variants={{ hov: { x: 4 } }} transition={{ type: 'spring', stiffness: 500, damping: 12 }}>
                  →
                </motion.span>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default CodingStats;
