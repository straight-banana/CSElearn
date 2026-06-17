import { useState, useEffect, useMemo, useCallback } from "react";

// ================================================================
// CURRICULUM DATA
// ================================================================
const CURRICULUM = [
  {
    id: 'p1', phase: 1, title: 'Python Core', category: 'Foundation', totalHours: 20, color: '#818cf8',
    milestone: 'Build a CLI file organizer. Comfortable with loops, OOP, and file I/O.',
    resources: [
      { title: 'fCC Python for Beginners (Full Course)', url: 'https://youtu.be/rfscVS0vtbw', type: 'Video', duration: '~4.5h' },
    ],
    topics: [
      { id: 't1_1', title: 'Variables, data types, operators', hours: 3, note: 'Strings, ints, floats, booleans, basic operations' },
      { id: 't1_2', title: 'Control flow, loops, functions', hours: 5, note: 'if/elif/else, for/while, def, args, return values' },
      { id: 't1_3', title: 'OOP — classes, objects, inheritance', hours: 6, note: '__init__, methods, inheritance, encapsulation' },
      { id: 't1_4', title: 'File I/O, error handling, libraries', hours: 4, note: 'open(), try/except, os module, json, pip packages' },
      { id: 't1_5', title: 'Project: CLI calculator + file organizer', hours: 2, note: 'Build two tools applying everything above' },
    ]
  },
  {
    id: 'p2', phase: 2, title: 'Networking Fundamentals', category: 'Foundation', totalHours: 15, color: '#a78bfa',
    milestone: 'Explain what happens when you type a URL. Understand TCP/IP, DNS, HTTP headers for backend work.',
    resources: [
      { title: 'Hussein Nasser — Fundamentals of Networking', url: 'https://www.youtube.com/playlist?list=PLQnljOFTspQUNnO4p00ua_C5mKTfldiYT', type: 'Video', duration: '~8h' },
      { title: 'CS75 Harvard Lecture 0 (Scalability)', url: 'https://www.youtube.com/watch?v=-W9F__D3oY4', type: 'Video', duration: '~1.5h' },
      { title: 'Julia Evans — How DNS Works', url: 'https://jvns.ca/blog/2022/01/11/how-to-find-a-domain-s-authoritative-nameserver/', type: 'Article', duration: '~30min' },
      { title: 'Professor Messer Network+ (reference)', url: 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/', type: 'Video', duration: 'Reference' },
    ],
    topics: [
      { id: 't2_1', title: 'OSI model & TCP/IP stack', hours: 3, note: 'All 7 layers with real examples, TCP vs UDP' },
      { id: 't2_2', title: 'IP addressing, subnetting, DNS', hours: 3, note: 'IPv4/IPv6, how DNS resolution works end to end' },
      { id: 't2_3', title: 'HTTP/HTTPS, TLS, status codes', hours: 3, note: 'Methods, headers, cookies, TLS handshake' },
      { id: 't2_4', title: 'WebSockets, REST, proxies', hours: 3, note: 'WS vs HTTP, REST principles, load balancers' },
      { id: 't2_5', title: '"What happens when you type a URL"', hours: 3, note: 'Full end-to-end trace — deep dive' },
    ]
  },
  {
    id: 'p3', phase: 3, title: 'SDLC & Dev Tools', category: 'Foundation', totalHours: 12, color: '#c084fc',
    milestone: 'Fluent with Git branching. GitHub CI pipeline running. Able to Dockerize any project.',
    resources: [
      { title: 'The Odin Project — Git Basics', url: 'https://www.theodinproject.com/paths/foundations/courses/foundations#git-basics', type: 'Course', duration: '~4h' },
      { title: 'TechWorld with Nana — Docker Beginner', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'Video', duration: '~3h' },
      { title: 'GitHub Actions Quickstart', url: 'https://docs.github.com/en/actions/quickstart', type: 'Docs', duration: '~1h' },
    ],
    topics: [
      { id: 't3_1', title: 'Git fundamentals — commit, branch, merge', hours: 3, note: 'init, add, commit, push, pull, branch, merge' },
      { id: 't3_2', title: 'Git advanced — conflicts, rebase, PRs', hours: 3, note: 'Conflict resolution, squash, GitHub flow' },
      { id: 't3_3', title: 'Docker — containers, images, Dockerfile', hours: 3, note: 'Build/run, volumes, docker-compose basics' },
      { id: 't3_4', title: 'CI/CD — GitHub Actions pipeline', hours: 3, note: 'Write a workflow that tests and deploys on push' },
    ]
  },
  {
    id: 'p4', phase: 4, title: 'SQL Databases', category: 'Backend', totalHours: 18, color: '#f472b6',
    milestone: 'Write SQL with joins, subqueries, indexes, transactions. Explain normalization up to 3NF.',
    resources: [
      { title: 'CS50 SQL (Harvard)', url: 'https://cs50.harvard.edu/sql/', type: 'Course', duration: '~15h' },
      { title: 'SQLBolt — Interactive Exercises', url: 'https://sqlbolt.com/', type: 'Interactive', duration: 'Alongside' },
      { title: 'PostgreSQL Tutorial (reference)', url: 'https://www.postgresqltutorial.com/', type: 'Docs', duration: 'Reference' },
      { title: 'CMU 15-445 — Andy Pavlo (depth)', url: 'https://www.youtube.com/playlist?list=PLSE8ODhjZXjaKScG3l0nuOiDTef', type: 'Video', duration: 'Post-plan' },
    ],
    topics: [
      { id: 't4_1', title: 'SELECT, filtering, sorting, aggregation', hours: 4, note: 'SELECT, WHERE, ORDER BY, GROUP BY, COUNT/AVG' },
      { id: 't4_2', title: 'JOINs — inner, left, right, full outer', hours: 4, note: 'All join types with real schema examples' },
      { id: 't4_3', title: 'Schema design & normalization (1NF-3NF)', hours: 4, note: 'Primary/foreign keys, avoiding anomalies' },
      { id: 't4_4', title: 'Indexes, transactions, ACID', hours: 4, note: 'B-tree indexes, EXPLAIN, isolation levels' },
      { id: 't4_5', title: 'PostgreSQL features + practice', hours: 2, note: 'psql CLI, data types, JSON columns' },
    ]
  },
  {
    id: 'p5', phase: 5, title: 'Node.js + Express + Databases', category: 'Backend', totalHours: 35, color: '#fb923c',
    milestone: 'Deployed REST API with auth, PostgreSQL via Prisma, MongoDB for documents, full JWT auth.',
    resources: [
      { title: 'Dave Gray — Node.js Full Course', url: 'https://www.youtube.com/watch?v=f2EqECiTBL8', type: 'Video', duration: '~7h' },
      { title: 'fCC Back End Development & APIs', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', type: 'Course', duration: '~10h' },
      { title: 'MongoDB University M001', url: 'https://learn.mongodb.com/learning-paths/introduction-to-mongodb', type: 'Course', duration: '~5h' },
      { title: 'Prisma Getting Started (docs)', url: 'https://www.prisma.io/docs/getting-started', type: 'Docs', duration: 'Alongside' },
    ],
    topics: [
      { id: 't5_1', title: 'Node.js — modules, event loop, fs, HTTP', hours: 7, note: 'CommonJS/ESM, async/await, streams, HTTP server' },
      { id: 't5_2', title: 'Express — routing, middleware, error handling', hours: 7, note: 'Router, middleware chain, error middleware' },
      { id: 't5_3', title: 'REST API design principles', hours: 4, note: 'Resource naming, status codes, versioning, pagination' },
      { id: 't5_4', title: 'PostgreSQL with Prisma ORM', hours: 7, note: 'Schema.prisma, migrations, CRUD, relations' },
      { id: 't5_5', title: 'MongoDB — documents, collections, aggregation', hours: 5, note: 'Document model, CRUD, when to use NoSQL' },
      { id: 't5_6', title: 'Auth — JWT, bcrypt, sessions', hours: 5, note: 'Password hashing, JWT generation/validation' },
    ]
  },
  {
    id: 'p6', phase: 6, title: 'TypeScript', category: 'Backend', totalHours: 20, color: '#34d399',
    milestone: 'Fully rewrite your Express API in TypeScript. Typed routes, middleware, Prisma client. No any types.',
    resources: [
      { title: 'Dave Gray — TypeScript Full Course', url: 'https://www.youtube.com/watch?v=gieEQFIfgYc', type: 'Video', duration: '~8h' },
      { title: 'No BS TS — Jack Herrington', url: 'https://www.youtube.com/playlist?list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n', type: 'Video', duration: '~5h' },
      { title: 'TypeScript Handbook (official)', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'Docs', duration: 'Reference' },
      { title: 'Total TypeScript — Matt Pocock (free)', url: 'https://www.totaltypescript.com/tutorials', type: 'Interactive', duration: '~3h' },
    ],
    topics: [
      { id: 't6_1', title: 'Types, interfaces, type aliases, enums', hours: 4, note: 'Primitive types, object shapes, union/intersection' },
      { id: 't6_2', title: 'Functions, generics, utility types', hours: 5, note: 'Typed functions, generics, Partial/Pick/Omit' },
      { id: 't6_3', title: 'TypeScript + Node.js setup (tsconfig)', hours: 3, note: 'tsconfig.json, ts-node, @types packages' },
      { id: 't6_4', title: 'Typed Express routes and middleware', hours: 4, note: 'Request/Response generics, typed route params' },
      { id: 't6_5', title: 'Advanced — conditional & mapped types', hours: 4, note: 'infer, template literal types, mapped types' },
    ]
  },
  {
    id: 'p7', phase: 7, title: 'System Design — LLD', category: 'Architecture', totalHours: 20, color: '#38bdf8',
    milestone: 'Implement 6+ design patterns in TypeScript. Explain SOLID principles with concrete code examples.',
    resources: [
      { title: 'Christopher Okhravi — Design Patterns', url: 'https://www.youtube.com/playlist?list=PLrhzvIcii6GNjpARjnIMl6NskmOSKbr57', type: 'Video', duration: '~10h' },
      { title: 'Refactoring.Guru — Design Patterns', url: 'https://refactoring.guru/design-patterns', type: 'Article', duration: 'Reference' },
    ],
    topics: [
      { id: 't7_1', title: 'SOLID principles with TypeScript examples', hours: 4, note: 'SRP, OCP, LSP, ISP, DIP — before/after code' },
      { id: 't7_2', title: 'Creational — Factory, Builder, Singleton', hours: 4, note: 'When to use each, implement in TS' },
      { id: 't7_3', title: 'Structural — Repository, Facade, Decorator', hours: 4, note: 'Repository for DB access, Facade for subsystems' },
      { id: 't7_4', title: 'Behavioral — Strategy, Observer, Command', hours: 4, note: 'Event systems, interchangeable algorithms' },
      { id: 't7_5', title: 'Apply patterns to your existing API', hours: 4, note: 'Refactor task manager using Repository + Strategy' },
    ]
  },
  {
    id: 'p8', phase: 8, title: 'System Design — HLD', category: 'Architecture', totalHours: 20, color: '#22d3ee',
    milestone: 'Design Twitter/YouTube from scratch in an interview. Explain sharding, caching, queues confidently.',
    resources: [
      { title: 'Gaurav Sen — System Design Playlist', url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX', type: 'Video', duration: '~8h' },
      { title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer', type: 'Article', duration: '~5h' },
      { title: 'ByteByteGo Newsletter', url: 'https://blog.bytebytego.com/', type: 'Article', duration: 'Ongoing' },
    ],
    topics: [
      { id: 't8_1', title: 'Scalability — horizontal/vertical, load balancing', hours: 4, note: 'Scale-out vs scale-up, L4/L7 load balancers' },
      { id: 't8_2', title: 'Database scaling — sharding, replication, CAP', hours: 4, note: 'Read replicas, sharding strategies, CAP theorem' },
      { id: 't8_3', title: 'Caching — Redis, CDN, invalidation', hours: 4, note: 'Cache-aside, write-through, TTL, CDN edge' },
      { id: 't8_4', title: 'Message queues, microservices, API gateway', hours: 4, note: 'Kafka/RabbitMQ use cases, service decomposition' },
      { id: 't8_5', title: 'Design sessions: URL shortener, Twitter, YouTube', hours: 4, note: 'End-to-end HLD with requirements and tradeoffs' },
    ]
  },
  {
    id: 'p9', phase: 9, title: 'AI / ML — Intern Level', category: 'AI/ML', totalHours: 45, color: '#f97316',
    milestone: 'Train a digit classifier + sentiment model in PyTorch. Explain backprop and gradient descent clearly.',
    resources: [
      { title: '3Blue1Brown — Neural Networks Series', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', type: 'Video', duration: '~3.5h' },
      { title: 'Andrew Ng — ML Specialization (free audit)', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'Course', duration: '~30h' },
      { title: 'Fast.ai — Practical Deep Learning Part 1', url: 'https://course.fast.ai/', type: 'Course', duration: '~20h' },
      { title: 'Karpathy — Neural Networks: Zero to Hero', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ', type: 'Video', duration: '~12h' },
      { title: 'PyTorch Official Beginner Tutorials', url: 'https://pytorch.org/tutorials/beginner/basics/intro.html', type: 'Docs', duration: '~5h' },
    ],
    topics: [
      { id: 't9_1', title: 'Visual foundation — 3B1B Neural Networks', hours: 4, note: 'What a neural net is, how backprop works visually' },
      { id: 't9_2', title: 'ML concepts — cost, gradient descent, logistic regression', hours: 8, note: 'Andrew Ng Week 1-3: supervised learning, optimization' },
      { id: 't9_3', title: 'Fast.ai — practical DL, transfer learning', hours: 10, note: 'Lessons 1-4: image classifiers, training loops' },
      { id: 't9_4', title: 'Karpathy — micrograd (autograd from scratch)', hours: 6, note: 'Build backpropagation engine from scratch' },
      { id: 't9_5', title: 'Karpathy — makemore (MLP language model)', hours: 7, note: 'Bigram to MLP, embeddings, batching' },
      { id: 't9_6', title: 'PyTorch fundamentals + MNIST classifier', hours: 6, note: 'Tensors, datasets, dataloaders, training loop' },
      { id: 't9_7', title: 'Capstone: sentiment classifier on real data', hours: 4, note: 'Kaggle dataset, train, evaluate, push to GitHub' },
    ]
  },
  {
    id: 'p10', phase: 10, title: 'Large Language Models', category: 'AI/ML', totalHours: 30, color: '#a3e635',
    milestone: 'Train mini-GPT on custom text. Understand attention, tokenization, RLHF conceptually.',
    resources: [
      { title: '3Blue1Brown — Attention & Transformers', url: 'https://www.youtube.com/watch?v=wjZofJX0v4M', type: 'Video', duration: '~30min' },
      { title: "Karpathy — Let's Build GPT From Scratch", url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', type: 'Video', duration: '~2h' },
      { title: 'Stanford CS336 — Language Modeling (selected)', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOY23NIoShKxqXcH9lxrWaK', type: 'Video', duration: '5 lectures' },
    ],
    topics: [
      { id: 't10_1', title: 'Attention & transformers — visual intuition', hours: 4, note: 'Self-attention, Q/K/V, positional encoding' },
      { id: 't10_2', title: 'Tokenization — BPE, vocabulary, encoding', hours: 3, note: 'How text becomes tokens, vocab size tradeoffs' },
      { id: 't10_3', title: 'Build GPT from scratch (Karpathy code-along)', hours: 8, note: 'Bigram to transformer, type every line yourself' },
      { id: 't10_4', title: 'Scaling laws & training dynamics', hours: 4, note: 'CS336: how scale affects capability' },
      { id: 't10_5', title: 'RLHF, fine-tuning, alignment basics', hours: 4, note: 'CS336: how ChatGPT-style training works' },
      { id: 't10_6', title: 'Train mini-GPT on custom text dataset', hours: 7, note: 'Pick corpus, train, evaluate, push to GitHub' },
    ]
  },
  {
    id: 'p11', phase: 11, title: 'Cybersecurity Basics', category: 'Security', totalHours: 25, color: '#f87171',
    milestone: 'Complete 5+ TryHackMe beginner rooms. Discuss common web vulnerabilities in your own backend.',
    resources: [
      { title: 'NetworkChuck — Cybersecurity Full Course', url: 'https://www.youtube.com/watch?v=hXSFdwIOfnE', type: 'Video', duration: '~6h' },
      { title: 'TCM — Practical Ethical Hacking', url: 'https://www.youtube.com/watch?v=3FNYvj2U0HM', type: 'Video', duration: '~6h' },
      { title: 'TryHackMe (free tier)', url: 'https://tryhackme.com/paths', type: 'Interactive', duration: 'Alongside' },
    ],
    topics: [
      { id: 't11_1', title: 'Security fundamentals — CIA triad, attack types', hours: 4, note: 'Confidentiality/Integrity/Availability, malware types' },
      { id: 't11_2', title: 'Network security — firewalls, VPNs, IDS', hours: 4, note: 'Packet filtering, VPN protocols, intrusion detection' },
      { id: 't11_3', title: 'Web security — OWASP Top 10', hours: 5, note: 'SQLi, XSS, CSRF, IDOR — examples from your backend' },
      { id: 't11_4', title: 'Linux for security — Kali, CLI tools', hours: 5, note: 'Kali in VirtualBox, nmap, netcat, enumeration' },
      { id: 't11_5', title: 'TryHackMe labs — beginner path', hours: 7, note: '5+ rooms: Intro Networking, Linux Fundamentals, OWASP' },
    ]
  },
];

const TOTAL_HOURS = CURRICULUM.reduce((s, p) => s + p.totalHours, 0);

// ================================================================
// SCHEDULE GENERATION — skips done topics, splits across weeks
// ================================================================
function buildSchedule(weeklyHours, done = {}) {
  if (!weeklyHours || weeklyHours <= 0) return [];
  const weeks = [];
  let cur = [];
  let left = parseFloat(weeklyHours.toFixed(1));

  for (const phase of CURRICULUM) {
    for (const topic of phase.topics) {
      if (done[topic.id] === 'done') continue;
      let rem = topic.hours;
      while (rem > 0.001) {
        if (left <= 0.001) {
          if (cur.length > 0) weeks.push(cur);
          cur = [];
          left = parseFloat(weeklyHours.toFixed(1));
        }
        const take = parseFloat(Math.min(rem, left).toFixed(1));
        cur.push({
          phaseId: phase.id, phaseTitle: phase.title, phaseColor: phase.color,
          topicId: topic.id, topicTitle: topic.title,
          hours: take, totalTopicHours: topic.hours, note: topic.note,
        });
        rem = parseFloat((rem - take).toFixed(1));
        left = parseFloat((left - take).toFixed(1));
      }
    }
  }
  if (cur.length > 0) weeks.push(cur);
  return weeks;
}

// ================================================================
// STORAGE HELPERS
// ================================================================
const SK = { settings: 'ltrk-v2-settings', progress: 'ltrk-v2-progress' };

async function sget(k) {
  try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; }
  catch { return null; }
}
async function sset(k, v) {
  try { await window.storage.set(k, JSON.stringify(v)); } catch (e) { console.error('Storage error:', e); }
}

// ================================================================
// SETUP SCREEN
// ================================================================
function SetupScreen({ onSave }) {
  const [wd, setWd] = useState(1);
  const [we, setWe] = useState(3.5);
  const weekly = parseFloat((wd * 5 + we * 2).toFixed(1));
  const totalWeeks = Math.ceil(TOTAL_HOURS / weekly);
  const months = (totalWeeks / 4.33).toFixed(1);
  const paceMsg = weekly < 10 ? '⚠ Under 10h/week — 6 months may be tight'
    : weekly >= 15 ? '✓ Great pace — comfortably on track for 6 months'
    : '→ Achievable in ~6 months at this pace';

  return (
    <div style={{ minHeight: '100vh', background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      <div style={{ background: '#0f0f1e', border: '1px solid #1e1e35', borderRadius: '20px', padding: '44px', maxWidth: '460px', width: '100%' }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>📚</div>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '800', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Set Up Your Plan</h1>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 36px', lineHeight: 1.6 }}>
          Enter how much time per day you can study. Your full roadmap generates instantly and auto-adjusts as you make progress.
        </p>

        {[
          { label: 'WEEKDAY HOURS / DAY', val: wd, set: setWd, min: 0.5, max: 3 },
          { label: 'WEEKEND HOURS / DAY', val: we, set: setWe, min: 1, max: 8 },
        ].map(row => (
          <div key={row.label} style={{ marginBottom: '24px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '10px' }}>{row.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <input type="range" min={row.min} max={row.max} step="0.5" value={row.val}
                onChange={e => row.set(+e.target.value)}
                style={{ flex: 1, accentColor: '#818cf8', cursor: 'pointer' }} />
              <div style={{ background: '#1a1a30', borderRadius: '8px', padding: '6px 16px', color: 'white', fontWeight: '800', fontSize: '18px', minWidth: '62px', textAlign: 'center' }}>
                {row.val}h
              </div>
            </div>
          </div>
        ))}

        <div style={{ background: '#0a0a1c', border: '1px solid #1a1a30', borderRadius: '14px', padding: '20px', marginBottom: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', marginBottom: '16px' }}>
            {[{ l: 'Weekly', v: `${weekly}h` }, { l: 'Total Weeks', v: `${totalWeeks}` }, { l: 'Months', v: `~${months}` }].map((s, i) => (
              <div key={s.l} style={{ padding: '8px', borderRight: i < 2 ? '1px solid #1e1e30' : 'none' }}>
                <div style={{ color: 'white', fontSize: '22px', fontWeight: '800' }}>{s.v}</div>
                <div style={{ color: '#475569', fontSize: '11px', marginTop: '3px' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ height: '3px', background: '#1e1e30', borderRadius: '2px', marginBottom: '8px' }}>
            <div style={{ height: '100%', width: `${Math.min(100, (weekly / 20) * 100)}%`, background: 'linear-gradient(90deg,#818cf8,#a78bfa)', borderRadius: '2px', transition: 'width 0.3s' }} />
          </div>
          <div style={{ color: '#475569', fontSize: '11px', textAlign: 'center' }}>{paceMsg}</div>
        </div>

        <button onClick={() => onSave({ weekdayHours: wd, weekendHours: we })}
          style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg,#818cf8,#a78bfa)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
          Generate My Roadmap →
        </button>
      </div>
    </div>
  );
}

// ================================================================
// NAV
// ================================================================
function Nav({ view, setView, done, total }) {
  const TABS = [{ id: 'dashboard', label: 'Dashboard' }, { id: 'schedule', label: 'Schedule' }, { id: 'resources', label: 'Resources' }, { id: 'settings', label: 'Settings' }];
  return (
    <nav style={{ background: '#080810', borderBottom: '1px solid #141420', padding: '0 20px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      <span style={{ color: 'white', fontWeight: '800', fontSize: '15px', marginRight: '20px', padding: '15px 0', whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>📚 LearnTrack</span>
      {TABS.map(t => (
        <button key={t.id} onClick={() => setView(t.id)}
          style={{ background: 'none', border: 'none', padding: '15px 12px', color: view === t.id ? '#818cf8' : '#4b5563', fontSize: '13px', fontWeight: view === t.id ? '600' : '400', cursor: 'pointer', borderBottom: view === t.id ? '2px solid #818cf8' : '2px solid transparent', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
          {t.label}
        </button>
      ))}
      <div style={{ marginLeft: 'auto', background: '#0f0f1e', border: '1px solid #1e1e30', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#475569', whiteSpace: 'nowrap' }}>
        {done}/{total} topics
      </div>
    </nav>
  );
}

// ================================================================
// DASHBOARD
// ================================================================
function Dashboard({ schedule, stats, weeklyHours, progress, onToggle }) {
  const thisWeek = schedule[0] || [];
  const nextWeek = schedule[1] || [];
  const pct = stats.totalHours > 0 ? Math.round((stats.doneHours / stats.totalHours) * 100) : 0;

  const grouped = [];
  const phaseMap = new Map();
  for (const item of thisWeek) {
    if (!phaseMap.has(item.phaseId)) {
      const g = { title: item.phaseTitle, color: item.phaseColor, items: [] };
      phaseMap.set(item.phaseId, g);
      grouped.push(g);
    }
    phaseMap.get(item.phaseId).items.push(item);
  }

  const f = { fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' };

  return (
    <div style={{ ...f, padding: '28px 20px', maxWidth: '980px', margin: '0 auto' }}>
      <div style={{ marginBottom: '22px' }}>
        <div style={{ color: '#475569', fontSize: '12px', marginBottom: '4px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
          {pct === 0 ? 'Ready to begin 🚀' : pct >= 100 ? 'Plan complete! 🎉' : `${pct}% there — keep going 💪`}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '24px' }}>
        {[
          { l: 'Overall Progress', v: `${pct}%`, s: `${stats.doneHours}h of ${stats.totalHours}h`, c: '#818cf8' },
          { l: 'Topics Done', v: `${stats.doneTopics}`, s: `of ${stats.totalTopics} topics`, c: '#34d399' },
          { l: 'Weeks Left', v: `${schedule.length}`, s: schedule.length ? `~${(schedule.length / 4.33).toFixed(1)} months left` : 'All done!', c: '#fb923c' },
          { l: 'Weekly Pace', v: `${weeklyHours}h`, s: 'per week', c: '#22d3ee' },
        ].map(s => (
          <div key={s.l} style={{ background: '#0f0f1e', border: '1px solid #141420', borderRadius: '12px', padding: '18px' }}>
            <div style={{ color: '#334155', fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '8px' }}>{s.l.toUpperCase()}</div>
            <div style={{ color: s.c, fontSize: '28px', fontWeight: '800', lineHeight: 1 }}>{s.v}</div>
            <div style={{ color: '#374151', fontSize: '11px', marginTop: '5px' }}>{s.s}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 268px', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h2 style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: '700', margin: 0 }}>This Week's Checklist</h2>
            <span style={{ color: '#334155', fontSize: '12px' }}>{weeklyHours}h planned</span>
          </div>

          {thisWeek.length === 0 ? (
            <div style={{ background: '#0f0f1e', border: '1px solid #141420', borderRadius: '12px', padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎉</div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>All topics complete. Incredible work!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {grouped.map(g => (
                <div key={g.title} style={{ background: '#0f0f1e', border: '1px solid #141420', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', background: '#0a0a18', borderBottom: '1px solid #141420', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: g.color, flexShrink: 0 }} />
                    <span style={{ color: '#64748b', fontSize: '11px', fontWeight: '700', letterSpacing: '0.06em' }}>{g.title.toUpperCase()}</span>
                  </div>
                  {g.items.map((item, idx) => {
                    const done = progress[item.topicId] === 'done';
                    return (
                      <div key={`${item.topicId}-${idx}`} onClick={() => onToggle(item.topicId)}
                        style={{ padding: '13px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', borderBottom: idx < g.items.length - 1 ? '1px solid #0e0e1a' : 'none', transition: 'background 0.1s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#13132a'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '5px', border: done ? 'none' : `2px solid ${g.color}66`, background: done ? g.color : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', transition: 'all 0.15s' }}>
                          {done && <span style={{ color: 'white', fontSize: '11px', fontWeight: '700' }}>✓</span>}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: done ? '#374151' : '#e2e8f0', fontSize: '13px', fontWeight: '500', textDecoration: done ? 'line-through' : 'none', marginBottom: '2px' }}>{item.topicTitle}</div>
                          <div style={{ color: '#334155', fontSize: '11px' }}>{item.note}</div>
                        </div>
                        <div style={{ color: '#475569', fontSize: '12px', fontWeight: '600', flexShrink: 0 }}>{item.hours}h</div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div style={{ color: '#1e293b', fontSize: '11px', textAlign: 'center', padding: '8px 0' }}>
                Click any topic to mark done — the schedule auto-adjusts
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#0f0f1e', border: '1px solid #141420', borderRadius: '12px', padding: '18px' }}>
            <div style={{ color: '#334155', fontSize: '10px', fontWeight: '700', letterSpacing: '0.07em', marginBottom: '14px' }}>PHASE PROGRESS</div>
            {CURRICULUM.map(p => {
              const ph = p.topics.filter(t => progress[t.id] === 'done').reduce((s, t) => s + t.hours, 0);
              const pp = Math.round((ph / p.totalHours) * 100);
              const active = pp > 0 && pp < 100;
              return (
                <div key={p.id} style={{ marginBottom: '11px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: pp === 100 ? '#4ade80' : active ? p.color : '#1e293b', fontSize: '10px', fontWeight: '600' }}>P{p.phase} {p.title}</span>
                    <span style={{ color: '#1e293b', fontSize: '10px' }}>{pp}%</span>
                  </div>
                  <div style={{ height: '3px', background: '#0e0e1a', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${pp}%`, background: pp === 100 ? '#16a34a' : p.color, borderRadius: '2px', transition: 'width 0.4s' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {nextWeek.length > 0 && (
            <div style={{ background: '#0f0f1e', border: '1px solid #141420', borderRadius: '12px', padding: '18px' }}>
              <div style={{ color: '#334155', fontSize: '10px', fontWeight: '700', letterSpacing: '0.07em', marginBottom: '12px' }}>COMING UP NEXT WEEK</div>
              {nextWeek.slice(0, 5).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.phaseColor, flexShrink: 0 }} />
                  <span style={{ color: '#334155', fontSize: '11px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.topicTitle}</span>
                  <span style={{ color: '#1e293b', fontSize: '10px', flexShrink: 0 }}>{item.hours}h</span>
                </div>
              ))}
              {nextWeek.length > 5 && <div style={{ color: '#1e293b', fontSize: '10px', marginTop: '4px' }}>+{nextWeek.length - 5} more topics</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ================================================================
// SCHEDULE VIEW
// ================================================================
function ScheduleView({ schedule, progress, onToggle }) {
  const [expandedWeek, setExpandedWeek] = useState(0);
  const [mode, setMode] = useState('weeks');
  const [expandedPhase, setExpandedPhase] = useState({});
  const f = { fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' };

  const ModeToggle = () => (
    <div style={{ display: 'flex', gap: '3px', background: '#0f0f1e', border: '1px solid #141420', borderRadius: '8px', padding: '3px', flexShrink: 0 }}>
      {['weeks', 'phases'].map(m => (
        <button key={m} onClick={() => setMode(m)}
          style={{ padding: '5px 14px', borderRadius: '6px', border: 'none', background: mode === m ? '#818cf8' : 'transparent', color: mode === m ? 'white' : '#4b5563', fontSize: '12px', fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s' }}>
          {m}
        </button>
      ))}
    </div>
  );

  if (mode === 'phases') {
    return (
      <div style={{ ...f, padding: '28px 20px', maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', gap: '16px' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800', margin: '0 0 4px' }}>Full Roadmap</h2>
            <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>Click a phase to expand. Check topics — plan auto-adjusts.</p>
          </div>
          <ModeToggle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CURRICULUM.map(phase => {
            const doneCt = phase.topics.filter(t => progress[t.id] === 'done').length;
            const pp = Math.round((doneCt / phase.topics.length) * 100);
            const status = pp === 100 ? 'done' : pp > 0 ? 'active' : 'upcoming';
            const isExp = expandedPhase[phase.id];
            return (
              <div key={phase.id} style={{ background: '#0f0f1e', border: `1px solid ${status === 'active' ? phase.color + '44' : '#141420'}`, borderRadius: '14px', overflow: 'hidden' }}>
                <div onClick={() => setExpandedPhase(e => ({ ...e, [phase.id]: !e[phase.id] }))}
                  style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: status === 'upcoming' ? '#0e0e1a' : phase.color + '1a', border: `1px solid ${status === 'upcoming' ? '#1e1e30' : phase.color + '55'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {status === 'done'
                      ? <span style={{ color: phase.color, fontSize: '14px', fontWeight: '800' }}>✓</span>
                      : <span style={{ color: status === 'upcoming' ? '#334155' : phase.color, fontSize: '12px', fontWeight: '700' }}>{phase.phase}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                      <span style={{ color: status === 'upcoming' ? '#475569' : 'white', fontWeight: '600', fontSize: '14px' }}>{phase.title}</span>
                      <span style={{ background: '#0e0e1a', color: '#334155', fontSize: '9px', padding: '2px 7px', borderRadius: '10px', fontWeight: '700' }}>{phase.category.toUpperCase()}</span>
                      {status === 'done' && <span style={{ background: '#14532d', color: '#4ade80', fontSize: '9px', padding: '2px 7px', borderRadius: '10px', fontWeight: '700' }}>DONE</span>}
                      {status === 'active' && <span style={{ background: phase.color + '22', color: phase.color, fontSize: '9px', padding: '2px 7px', borderRadius: '10px', fontWeight: '700' }}>IN PROGRESS</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', height: '3px', background: '#0e0e1a', borderRadius: '2px' }}>
                        <div style={{ height: '100%', width: `${pp}%`, background: pp === 100 ? '#16a34a' : phase.color, borderRadius: '2px' }} />
                      </div>
                      <span style={{ color: '#334155', fontSize: '10px' }}>{doneCt}/{phase.topics.length} topics · {phase.totalHours}h total</span>
                    </div>
                  </div>
                  <span style={{ color: '#334155', fontSize: '13px', transform: isExp ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                </div>
                {isExp && (
                  <div style={{ borderTop: '1px solid #0e0e1a' }}>
                    <div style={{ padding: '12px 20px', background: '#080815', borderBottom: '1px solid #0e0e1a' }}>
                      <div style={{ color: '#1e293b', fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em', marginBottom: '4px' }}>MILESTONE</div>
                      <div style={{ color: '#64748b', fontSize: '12px' }}>🏁 {phase.milestone}</div>
                    </div>
                    {phase.topics.map((topic, i) => {
                      const done = progress[topic.id] === 'done';
                      return (
                        <div key={topic.id} onClick={() => onToggle(topic.id)}
                          style={{ padding: '12px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', borderBottom: i < phase.topics.length - 1 ? '1px solid #0a0a14' : 'none', transition: 'background 0.1s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#13132a'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <div style={{ width: '17px', height: '17px', borderRadius: '5px', border: done ? 'none' : `2px solid ${phase.color}55`, background: done ? phase.color : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                            {done && <span style={{ color: 'white', fontSize: '10px', fontWeight: '700' }}>✓</span>}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: done ? '#374151' : '#cbd5e1', fontSize: '13px', textDecoration: done ? 'line-through' : 'none', marginBottom: '2px' }}>{topic.title}</div>
                            <div style={{ color: '#334155', fontSize: '11px' }}>{topic.note}</div>
                          </div>
                          <div style={{ color: '#334155', fontSize: '11px', flexShrink: 0, fontWeight: '600' }}>{topic.hours}h</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...f, padding: '28px 20px', maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', gap: '16px' }}>
        <div>
          <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800', margin: '0 0 4px' }}>Week-by-Week Schedule</h2>
          <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>
            {schedule.length > 0 ? `${schedule.length} weeks remaining — auto-adjusts as you check off topics` : 'Nothing left in the schedule'}
          </p>
        </div>
        <ModeToggle />
      </div>

      {schedule.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#334155' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎉</div>
          <div style={{ fontSize: '14px' }}>Nothing left in the schedule. You did it!</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {schedule.map((week, wi) => {
            const isExp = expandedWeek === wi;
            const phases = [...new Map(week.map(i => [i.phaseId, i.phaseTitle])).entries()];
            const totalH = week.reduce((s, i) => s + i.hours, 0);
            return (
              <div key={wi} style={{ background: '#0f0f1e', border: wi === 0 ? '1px solid #818cf855' : '1px solid #141420', borderRadius: '12px', overflow: 'hidden' }}>
                <div onClick={() => setExpandedWeek(isExp ? -1 : wi)}
                  style={{ padding: '15px 18px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ background: wi === 0 ? '#818cf8' : '#0e0e1a', borderRadius: '7px', padding: '4px 10px', color: wi === 0 ? 'white' : '#4b5563', fontSize: '11px', fontWeight: '700', flexShrink: 0, border: wi === 0 ? 'none' : '1px solid #1e1e30' }}>
                    W{wi + 1}
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center', minWidth: 0 }}>
                    {phases.slice(0, 3).map(([, title], pi) => (
                      <span key={title} style={{ color: '#64748b', fontSize: '12px' }}>{title}{pi < Math.min(phases.length, 3) - 1 ? ',' : ''}</span>
                    ))}
                    {phases.length > 3 && <span style={{ color: '#334155', fontSize: '11px' }}>+{phases.length - 3} more</span>}
                  </div>
                  <div style={{ color: '#475569', fontSize: '12px', fontWeight: '600', flexShrink: 0 }}>{totalH.toFixed(1)}h</div>
                  <span style={{ color: '#334155', fontSize: '12px', transform: isExp ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                </div>
                {isExp && (
                  <div style={{ borderTop: '1px solid #0e0e1a' }}>
                    {week.map((item, ii) => {
                      const done = progress[item.topicId] === 'done';
                      return (
                        <div key={ii} onClick={() => onToggle(item.topicId)}
                          style={{ padding: '12px 18px', display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', borderBottom: ii < week.length - 1 ? '1px solid #0a0a14' : 'none', transition: 'background 0.1s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#13132a'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <div style={{ width: '17px', height: '17px', borderRadius: '5px', border: done ? 'none' : `2px solid ${item.phaseColor}55`, background: done ? item.phaseColor : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                            {done && <span style={{ color: 'white', fontSize: '10px', fontWeight: '700' }}>✓</span>}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.phaseColor, flexShrink: 0 }} />
                              <span style={{ color: '#475569', fontSize: '10px' }}>{item.phaseTitle}</span>
                            </div>
                            <div style={{ color: done ? '#374151' : '#cbd5e1', fontSize: '13px', textDecoration: done ? 'line-through' : 'none', marginBottom: '2px' }}>{item.topicTitle}</div>
                            <div style={{ color: '#334155', fontSize: '11px' }}>{item.note}</div>
                          </div>
                          <div style={{ color: '#334155', fontSize: '11px', flexShrink: 0, fontWeight: '600' }}>{item.hours}h</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ================================================================
// RESOURCES VIEW
// ================================================================
function ResourcesView() {
  const [activeId, setActiveId] = useState('p1');
  const phase = CURRICULUM.find(p => p.id === activeId);
  const tIcons = { Video: '▶', Course: '📚', Interactive: '🎮', Docs: '📄', Article: '📰' };
  const tColors = { Video: '#818cf8', Course: '#34d399', Interactive: '#fb923c', Docs: '#22d3ee', Article: '#a78bfa' };
  const f = { fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' };

  return (
    <div style={{ ...f, padding: '28px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>Resources</h2>
      <p style={{ color: '#475569', fontSize: '13px', marginBottom: '24px' }}>100% free. Click any card to open it in a new tab.</p>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '26px' }}>
        {CURRICULUM.map(p => (
          <button key={p.id} onClick={() => setActiveId(p.id)}
            style={{ padding: '5px 12px', borderRadius: '20px', border: `1px solid ${activeId === p.id ? 'transparent' : '#141420'}`, background: activeId === p.id ? p.color : '#0f0f1e', color: activeId === p.id ? 'white' : '#4b5563', fontSize: '11px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}>
            P{p.phase}
          </button>
        ))}
      </div>

      {phase && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: phase.color, flexShrink: 0 }} />
              <span style={{ color: 'white', fontWeight: '700', fontSize: '17px' }}>{phase.title}</span>
              <span style={{ color: '#334155', fontSize: '12px' }}>{phase.totalHours}h estimated</span>
            </div>
            <div style={{ color: '#475569', fontSize: '12px', paddingLeft: '20px' }}>🏁 {phase.milestone}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {phase.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', background: '#0f0f1e', border: '1px solid #141420', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = phase.color + '66'; e.currentTarget.style.background = '#131326'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#141420'; e.currentTarget.style.background = '#0f0f1e'; }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: (tColors[r.type] || '#818cf8') + '1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>
                  {tIcons[r.type] || '🔗'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'white', fontSize: '13px', fontWeight: '500', marginBottom: '5px' }}>{r.title}</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ background: (tColors[r.type] || '#818cf8') + '1a', color: (tColors[r.type] || '#818cf8'), fontSize: '9px', padding: '2px 7px', borderRadius: '4px', fontWeight: '700' }}>{(r.type || '').toUpperCase()}</span>
                    <span style={{ color: '#334155', fontSize: '11px' }}>{r.duration}</span>
                  </div>
                </div>
                <span style={{ color: '#334155', fontSize: '14px' }}>↗</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ================================================================
// SETTINGS VIEW
// ================================================================
function SettingsView({ settings, onSave, onReset }) {
  const [wd, setWd] = useState(settings.weekdayHours);
  const [we, setWe] = useState(settings.weekendHours);
  const [confirm, setConfirm] = useState(false);
  const changed = wd !== settings.weekdayHours || we !== settings.weekendHours;
  const newW = parseFloat((wd * 5 + we * 2).toFixed(1));
  const oldW = parseFloat((settings.weekdayHours * 5 + settings.weekendHours * 2).toFixed(1));
  const newWeeks = Math.ceil(TOTAL_HOURS / newW);
  const f = { fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' };

  return (
    <div style={{ ...f, padding: '28px 20px', maxWidth: '480px', margin: '0 auto' }}>
      <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>Settings</h2>
      <p style={{ color: '#475569', fontSize: '13px', marginBottom: '28px' }}>Adjust your hours — the schedule recalculates automatically.</p>

      <div style={{ background: '#0f0f1e', border: '1px solid #141420', borderRadius: '14px', padding: '24px', marginBottom: '14px' }}>
        <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '700', letterSpacing: '0.07em', marginBottom: '20px' }}>STUDY HOURS</div>

        {[
          { label: 'WEEKDAY HOURS / DAY', val: wd, set: setWd, min: 0.5, max: 3 },
          { label: 'WEEKEND HOURS / DAY', val: we, set: setWe, min: 1, max: 8 },
        ].map(row => (
          <div key={row.label} style={{ marginBottom: '22px' }}>
            <div style={{ color: '#475569', fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '10px' }}>{row.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="range" min={row.min} max={row.max} step="0.5" value={row.val}
                onChange={e => row.set(+e.target.value)}
                style={{ flex: 1, accentColor: '#818cf8', cursor: 'pointer' }} />
              <div style={{ background: '#0e0e1a', borderRadius: '8px', padding: '6px 14px', color: 'white', fontWeight: '800', fontSize: '17px', minWidth: '55px', textAlign: 'center', border: '1px solid #1e1e30' }}>
                {row.val}h
              </div>
            </div>
          </div>
        ))}

        <div style={{ background: '#0a0a18', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: changed ? '16px' : '0' }}>
          <div>
            <div style={{ color: '#334155', fontSize: '10px', marginBottom: '3px' }}>Weekly total</div>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '22px' }}>{newW}h / week</div>
            <div style={{ color: '#334155', fontSize: '10px', marginTop: '2px' }}>~{newWeeks} weeks · ~{(newWeeks / 4.33).toFixed(1)} months</div>
          </div>
          {changed && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#334155', fontSize: '10px', marginBottom: '3px' }}>was {oldW}h</div>
              <div style={{ color: newW > oldW ? '#4ade80' : '#f87171', fontSize: '13px', fontWeight: '700' }}>
                {newW > oldW ? '▲ Faster' : '▼ Slower'}
              </div>
            </div>
          )}
        </div>

        {changed && (
          <button onClick={() => onSave({ ...settings, weekdayHours: wd, weekendHours: we })}
            style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,#818cf8,#a78bfa)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
            Save & Recalculate Plan
          </button>
        )}
      </div>

      <div style={{ background: '#0f0f1e', border: '1px solid #2a1515', borderRadius: '14px', padding: '24px' }}>
        <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '700', letterSpacing: '0.07em', marginBottom: '4px' }}>DANGER ZONE</div>
        <div style={{ color: '#475569', fontSize: '12px', marginBottom: '16px' }}>Clear all topic progress. This cannot be undone.</div>
        {!confirm ? (
          <button onClick={() => setConfirm(true)}
            style={{ padding: '9px 18px', background: 'transparent', border: '1px solid #7f1d1d', borderRadius: '8px', color: '#f87171', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
            Reset All Progress
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => { onReset(); setConfirm(false); }}
              style={{ padding: '9px 18px', background: '#7f1d1d', border: 'none', borderRadius: '8px', color: '#fca5a5', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              Yes, Reset Everything
            </button>
            <button onClick={() => setConfirm(false)}
              style={{ padding: '9px 18px', background: '#0e0e1a', border: '1px solid #1e1e30', borderRadius: '8px', color: '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ================================================================
// MAIN APP
// ================================================================
export default function App() {
  const [view, setView] = useState('dashboard');
  const [settings, setSettings] = useState(null);
  const [progress, setProgress] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    async function init() {
      const s = await sget(SK.settings);
      const p = await sget(SK.progress);
      if (s) setSettings(s); else setShowSetup(true);
      if (p) setProgress(p);
      setLoaded(true);
    }
    init();
  }, []);

  const weeklyHours = useMemo(() => {
    if (!settings) return 0;
    return parseFloat((settings.weekdayHours * 5 + settings.weekendHours * 2).toFixed(1));
  }, [settings]);

  const schedule = useMemo(() => {
    if (!weeklyHours) return [];
    return buildSchedule(weeklyHours, progress);
  }, [weeklyHours, progress]);

  const stats = useMemo(() => {
    const all = CURRICULUM.flatMap(p => p.topics);
    return {
      totalTopics: all.length,
      doneTopics: all.filter(t => progress[t.id] === 'done').length,
      totalHours: TOTAL_HOURS,
      doneHours: CURRICULUM.reduce((s, p) => s + p.topics.filter(t => progress[t.id] === 'done').reduce((a, t) => a + t.hours, 0), 0),
    };
  }, [progress]);

  const handleToggle = useCallback(async (topicId) => {
    const newP = { ...progress, [topicId]: progress[topicId] === 'done' ? '' : 'done' };
    setProgress(newP);
    await sset(SK.progress, newP);
  }, [progress]);

  const handleSaveSettings = async (s) => {
    setSettings(s);
    await sset(SK.settings, s);
    setShowSetup(false);
  };

  const handleReset = async () => {
    setProgress({});
    await sset(SK.progress, {});
  };

  if (!loaded) return (
    <div style={{ minHeight: '100vh', background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system,sans-serif' }}>
      <div style={{ color: '#334155', fontSize: '14px' }}>Loading...</div>
    </div>
  );

  if (showSetup) return <SetupScreen onSave={handleSaveSettings} />;

  return (
    <div style={{ minHeight: '100vh', background: '#080810', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      <Nav view={view} setView={setView} done={stats.doneTopics} total={stats.totalTopics} />
      {view === 'dashboard' && <Dashboard schedule={schedule} stats={stats} weeklyHours={weeklyHours} progress={progress} onToggle={handleToggle} />}
      {view === 'schedule' && <ScheduleView schedule={schedule} progress={progress} onToggle={handleToggle} />}
      {view === 'resources' && <ResourcesView />}
      {view === 'settings' && <SettingsView settings={settings} onSave={handleSaveSettings} onReset={handleReset} />}
    </div>
  );
}
