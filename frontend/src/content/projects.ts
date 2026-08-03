import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'churchcamlive',
    name: 'ChurchCamLive.ie',
    pitch: 'Live-streaming and archiving platform for churches, built on custom Linux/WebRTC recording infrastructure.',
    category: 'client',
    stack: ['PHP', 'JavaScript', 'React', 'Linux', 'WebRTC'],
    liveUrl: 'https://churchcamlive.ie',
    caseStudy: {
      problem:
        'Churches needed a reliable way to live-stream and archive services without expensive dedicated broadcast equipment or fragile ad-hoc setups.',
      approach:
        'As lead contributor at AV Star Systems, built the client-facing application in PHP, JavaScript and React, backed by custom recording infrastructure on Linux — using WebRTC for live capture and NAS storage for archiving.',
      decisions:
        'Chose WebRTC for low-latency live capture instead of a traditional RTMP-only pipeline, and NAS-backed storage to keep archiving reliable and cost-effective for clients without needing full cloud infrastructure at every site.',
      outcome:
        'In production use by churches for live-streaming and archiving services, developed and maintained as part of ongoing client-facing AV solutions work.',
    },
  },
];
