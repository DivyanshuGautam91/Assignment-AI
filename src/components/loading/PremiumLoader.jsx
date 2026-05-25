import { useState, useEffect } from 'react';
import { Sparkles, Terminal, Shield } from 'lucide-react';

export default function PremiumLoader() {
  const [progress, setProgress] = useState(0);
  const [activeMessageIdx, setActiveMessageIdx] = useState(0);
  const [logs, setLogs] = useState([]);

  const messages = [
    "Analyzing your AI stack…",
    "Reviewing subscription overlap…",
    "Detecting optimization opportunities…",
    "Calculating potential savings…"
  ];

  const rawLogs = [
    { threshold: 5, text: "[INFO] Initializing Sift Cost Intelligence Engine v2.0.4..." },
    { threshold: 12, text: "[INFO] Establish read-only interface with workspace seating..." },
    { threshold: 22, text: "[INFO] Fetching billing schedules & licensing footprints..." },
    { threshold: 35, text: "[SCAN] Flagged: ChatGPT Team overkill check active..." },
    { threshold: 45, text: "[SCAN] Flagged: Redundant Claude & ChatGPT Pro accounts found." },
    { threshold: 58, text: "[SCAN] Flagged: GitHub Copilot licenses run duplicate to Cursor IDE." },
    { threshold: 70, text: "[ANALYZING] Parsing Anthropic API playground tokens & cached prompts..." },
    { threshold: 82, text: "[COMPUTING] Running rule-based cost consolidated engine..." },
    { threshold: 92, text: "[SUCCESS] Optimization matrices fully compiled." },
    { threshold: 98, text: "[SUCCESS] Creating persistent recovery dashboard report..." }
  ];

  useEffect(() => {
    // Progress increment timer
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Smooth progression speeds
        const increment = Math.random() * 8 + 2;
        return Math.min(100, prev + increment);
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  // Update status messages based on progress
  useEffect(() => {
    if (progress < 25) {
      setActiveMessageIdx(0);
    } else if (progress < 55) {
      setActiveMessageIdx(1);
    } else if (progress < 80) {
      setActiveMessageIdx(2);
    } else {
      setActiveMessageIdx(3);
    }

    // Add log lines dynamically as progress advances
    const activeLogs = rawLogs.filter(log => progress >= log.threshold);
    if (activeLogs.length !== logs.length) {
      setLogs(activeLogs.map(l => l.text));
    }
  }, [progress]);

  return (
    <div className="premium-loader-screen">
      {/* Background radial glowing gradients */}
      <div className="loader-mesh-glow"></div>

      <div className="loader-card-container">
        {/* Top Header */}
        <div className="loader-header-sec">
          <div className="pulse-shield">
            <Shield size={22} className="accent-text-icon" />
          </div>
          <span className="loader-title-tag">Sift AI Intelligence Auditor</span>
        </div>

        {/* Dynamic Glowing Progress Circle/Gauge */}
        <div className="loader-visual-progress">
          <svg className="progress-svg" viewBox="0 0 100 100">
            <circle className="progress-circle-bg" cx="50" cy="50" r="44" />
            <circle
              className="progress-circle-active"
              cx="50"
              cy="50"
              r="44"
              style={{
                strokeDasharray: 276.4,
                strokeDashoffset: 276.4 - (276.4 * progress) / 100
              }}
            />
          </svg>
          <div className="progress-center-text">
            <span className="progress-percentage font-mono">{Math.round(progress)}%</span>
            <span className="progress-label">AUDITED</span>
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="loader-status-container">
          <div className="loader-sparkle-row">
            <Sparkles size={16} className="sparkle-icon animate-pulse-glow" />
            <h3 className="loader-current-message">{messages[activeMessageIdx]}</h3>
          </div>
          <p className="loader-subtext">Isolating billing inefficiencies across your subscriptions</p>
        </div>

        {/* Terminal Logs Simulation Frame */}
        <div className="loader-terminal-frame">
          <div className="terminal-header-bar">
            <div className="terminal-circles">
              <span className="term-dot close"></span>
              <span className="term-dot minimize"></span>
              <span className="term-dot maximize"></span>
            </div>
            <div className="terminal-title">
              <Terminal size={11} />
              <span className="font-mono">audit_scanner.sh</span>
            </div>
          </div>
          <div className="terminal-body font-mono">
            {logs.map((log, idx) => (
              <div key={idx} className="terminal-log-line">
                <span className="term-arrow">&gt;</span>
                <span className="term-text">{log}</span>
              </div>
            ))}
            {progress < 100 && (
              <div className="terminal-cursor-line">
                <span className="term-arrow">&gt;</span>
                <span className="term-cursor">_</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
