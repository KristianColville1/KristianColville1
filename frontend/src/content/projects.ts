import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'churchcamlive',
    name: 'ChurchCamLive',
    pitch:
      'Live-streaming and recording platform for churches — CDN-backed delivery, Kubernetes scaling and a custom scheduling engine, all built in-house.',
    category: 'client',
    status: 'active',
    stack: ['PHP', 'JavaScript', 'Linux', 'Kubernetes', 'CDN', 'S3', 'RTSP/RTMP'],
    liveUrl: 'https://churchcamlive.ie',
    image: '/images/projects/churchcamlive.jpg',
    caseStudy: {
      problem:
        'Churches needed dependable live-streaming and archiving without broadcast budgets or an on-site engineer. The platform started life inside WordPress, which made the streaming and recording operations fragile — exactly the parts that cannot be allowed to fail while a service is going out live.',
      approach:
        'I segmented every streaming and recording operation out of WordPress into infrastructure I built and control, so the parts that have to stay up no longer depend on the CMS. Ingest comes from RTSP and RTMP capable cameras, delivery runs through a CDN on top of a Kubernetes cluster that scales with demand, and finished recordings ship to S3 buckets for archiving.',
      decisions:
        'Cost and availability drove the architecture: CDN delivery keeps per-viewer bandwidth economical at scale where a naive origin-served setup would not, and Kubernetes lets capacity follow real demand rather than sitting idle. Scheduling was the other hard problem — clients need services to start and stop exactly on time, week after week, so I built a scheduling system on rrule recurrence rules to get accurate, repeating stop/start behaviour instead of approximating it with cron.',
      outcome:
        'The recording infrastructure was delivered on time and within budget, and the streaming operations now run independently of the legacy CMS. The platform is in production with churches streaming and archiving their services, and it anchors the CRM, client portal and custom player built around it.',
    },
  },
  {
    slug: 'churchcamlive-crm',
    name: 'ChurchCamLive CRM',
    pitch:
      'Bespoke CRM built from the ground up for the sales team — organisations, leads, opportunities and an audit trail of completed work.',
    category: 'client',
    status: 'active',
    stack: ['PHP', 'JavaScript', 'MySQL'],
    image: '/images/projects/churchcamlive-crm.jpg',
    caseStudy: {
      problem:
        'The sales team had no system built around how they actually sell. Off-the-shelf CRMs assume a generic pipeline and none of them understood the relationship between an organisation, the installation on site, and the work carried out for it.',
      approach:
        'I built the CRM from scratch rather than bending a third-party product to fit. It models organisations, clients, leads, opportunities and contacts as first-class records, alongside the operational side of the business — products, installations, recordings, issues and marketing — with a dashboard surfacing live client counts, overdue leads, open opportunities and open issues.',
      decisions:
        'Building bespoke meant the data model could mirror the business exactly instead of forcing staff to translate their work into someone else\'s abstractions, and it keeps customer data in systems we control. Auditing was designed in rather than added on: the activity log records what changed and when, so completed work is traceable after the fact.',
      outcome:
        'In daily use by the sales team as the single source of truth for organisations, pipeline and delivered work, with the audit trail giving the business a reliable record of activity.',
    },
  },
  {
    slug: 'churchcamlive-portal',
    name: 'ChurchCamLive Client Portal',
    pitch:
      'Self-service portal where clients run their own stream, schedules, billing and donations — with Stripe connected accounts feeding straight back into company accounting.',
    category: 'client',
    status: 'active',
    stack: ['PHP', 'WordPress', 'Composer', 'Stripe', 'Kubernetes'],
    image: '/images/projects/churchcamlive-portal.jpg',
    caseStudy: {
      problem:
        'Every client change — a schedule tweak, a password on a stream, a billing question — came back to the team as a support request. Clients had no way to manage their own system, and donation revenue had to be reconciled into company accounting by hand.',
      approach:
        'I built a customer portal where each client lands in their own space and controls their installation directly: viewing the live stream, pulling embed codes, setting password protection, managing PTZ cameras, schedules, recordings, statistics, newsletters, emails and donations. Donations run through Stripe connected accounts, which routes money to the right organisation and links the transaction back to our accounting software — closing the loop rather than leaving a reconciliation job behind.',
      decisions:
        'WordPress stays as the backend engine because it is the legacy system and replacing it wholesale was never justifiable — but every plugin and modification is custom PHP managed with Composer, so the codebase is dependency-managed and version-controlled rather than a pile of clicked-together plugins. The portal runs on Kubernetes for high availability and scales with client demand, and it shares a template base with the admin navigation so staff and clients see the right context from the same system.',
      outcome:
        'Clients self-serve the changes that used to be support tickets, and donation revenue reconciles automatically into the accounting software instead of being handled manually.',
    },
  },
  {
    slug: 'custom-hls-player',
    name: 'Custom HLS Video Player',
    pitch:
      'Purpose-built JavaScript HLS player with WebSocket-driven live updates and a nested window system that solves dynamic embed height.',
    category: 'client',
    status: 'active',
    stack: ['JavaScript', 'HLS', 'WebSockets', 'Docker', 'Load Balancing'],
    image: '/images/projects/hls-player.jpg',
    caseStudy: {
      problem:
        'Off-the-shelf players could not do what the platform needed: push changes to everyone watching in real time, and sit inside a client\'s own website at whatever width that site gives it. Embedded video that cannot adapt its height either letterboxes itself or overflows the page, and it was the most visible client-facing problem on the product.',
      approach:
        'I wrote the player in JavaScript against HLS, with WebSockets pushing state so changes apply live for every viewer at once rather than waiting for a refresh. For the sizing problem I built an inner and outer window system: the outer window owns the space the host page gives it, and the inner window derives its height from the available width — so the player adapts correctly wherever it is embedded.',
      decisions:
        'The nested window approach was chosen over simply matching the video aspect ratio because it leaves deliberate headroom for content beyond the video — password prompts on protected streams today, and forms or richer embedded content later, without redesigning the embed. HLS is the delivery format for reach and CDN economics, though the player sits close enough to the underlying transport that WebRTC can be supported with modest changes if a use case needs it.',
      outcome:
        'Running in production as the player for the platform, deployed across containers in multiple regions behind an application load balancer for high availability, and handling password-protected streams and live recording playback from a single embed.',
    },
  },
  {
    slug: 'garda-training-systems',
    name: 'Garda Training Centre Systems',
    pitch:
      'Custom kiosk-based training and recording systems for the Garda College in Templemore — designed, built and implemented in six weeks, now under a three-year maintenance contract.',
    category: 'client',
    status: 'active',
    stack: ['Linux', 'Chromium Kiosk', 'JavaScript', '4K Video', 'Touchscreen UI'],
    caseStudy: {
      problem:
        'The training centre was running on ageing infrastructure that no longer met how instructors needed to teach. Interrogation and behavioural training depends on instructors observing a live room, intervening at the right moment, and giving learners something to review afterwards — and the existing setup could not support that reliably.',
      approach:
        'I designed the replacement system across a six-week cycle covering design, build and implementation, and the AV team put the plan into action on site — stripping out the old infrastructure and replacing it with modern equipment. Each training station runs a variant of Linux locked down to behave as a kiosk: it boots straight into Chromium against a locally hosted web application, so a terminal comes up ready to run its own training room with no desktop to get lost in. Instructors work from the stations alongside learners, with touch-to-speak controls and headsets to talk into the practice interrogation rooms and correct technique in the moment, and everything routes back to a central control room.',
      decisions:
        'Video runs locally on each station at 4K with under 200ms glass to glass, because coaching someone through an interrogation is impossible if what you are watching lags behind the room. The terminals are touchscreen only — no keyboards, no microphones — which keeps the interface deliberate and removes whole categories of misuse and support burden. Learners collect their own session recordings by plugging a USB stick into the station after a session, with trainers controlling stop and start; the machines format and isolate those sticks under Linux before writing to them, so removable media coming into a secure environment cannot carry anything in with it.',
      outcome:
        'The system is in service at the training centre, delivered on the six-week schedule, and the relationship continues under a three-year contract to maintain it.',
    },
  },
  {
    slug: 'martbids-streaming',
    name: 'MartBids.ie Streaming Infrastructure',
    pitch:
      'Rebuilt live-streaming infrastructure for a livestock auction platform — sub-second latency at lower cost, with a probe-driven FFmpeg pipeline that repairs only the recordings that need it.',
    category: 'client',
    status: 'completed',
    stack: ['FFmpeg', 'Linux', 'S3', 'CDN', 'WebRTC'],
    liveUrl: 'https://martbids.ie',
    logo: '/images/logos/martbids.png',
    caseStudy: {
      problem:
        'Live auctions need sub-second latency — bidders and the ring have to stay in sync — so that was never negotiable. The existing system delivered it at roughly 300ms glass to glass, but the architecture around it was outdated, expensive to run and difficult to keep highly available as the platform grew.',
      approach:
        'I designed and built the replacement infrastructure to hold sub-second latency while optimising what sat around it, so cost and availability improved without giving up the responsiveness the auction format depends on. A separate issue surfaced during the migration: newer FFmpeg releases handle malformed input far more strictly, and recordings that accumulated too many dropped frames failed under that stricter handling.',
      decisions:
        'Rather than pin an old FFmpeg version and inherit the debt, or run a blanket repair pass over everything, I built the pipeline to probe each recording first and detect the anomaly. Only the affected recordings go through the cleaning and repair stage before being shipped to S3 — so the fix targets the small number of files that actually need it instead of adding processing cost and re-encoding risk to every recording the platform produces.',
      outcome:
        'The platform runs materially cheaper and more reliably than the system it replaced while still delivering sub-second latency, and recordings archive to S3 dependably with the repair pass engaging only where a recording is genuinely damaged.',
    },
  },
  {
    slug: 'employee-management-system',
    name: 'Employee Management System',
    pitch:
      'Django and React system for timesheets, hours and holidays that adapts its data into the company accounting software — saving accounting a full day of labour.',
    category: 'client',
    status: 'completed',
    stack: ['Python', 'Django', 'React', 'PostgreSQL'],
    liveUrl: 'https://ems.starsystems.ie',
    caseStudy: {
      problem:
        'Working hours, timesheets and holiday requests were manual, and the accounting department was re-entering that data into the company accounting software by hand every cycle — slow, and every re-keying is a chance to introduce an error.',
      approach:
        'I built a system with a Django and Python backend behind a React frontend, where employees manage their own working hours, timesheets and holidays directly. The integration is the important half: all data within the system is converted through the adapter pattern into the format AV Star Systems\' accounting software expects.',
      decisions:
        'The adapter pattern was chosen deliberately so the accounting integration lives behind a stable interface instead of being scattered through the codebase. The domain model stays clean and independent of any one accounting vendor, and the conversion layer is the only thing that has to change if that software is ever replaced.',
      outcome:
        'In production at ems.starsystems.ie, providing significant automation for the accounting department and saving them a full day of labour per cycle by removing the manual re-entry step entirely.',
    },
  },
];
