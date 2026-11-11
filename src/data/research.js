/**
 * Research tracks. These are current study directions, stated as open
 * questions. Nothing here claims a finding, publication, or completed result.
 */
export const research = {
  index: '06',
  marker: 'RESEARCH / STUDY TRACKS',
  titleLead: 'QUESTIONS',
  titleAccent: 'UNDER INVESTIGATION.',
  intro:
    'Current study directions, not published findings. Each track is a question I am working through with notes, lab work, and small experiments until the answer holds up.',
  tracks: [
    {
      id: 'forensics',
      domain: 'DIGITAL FORENSICS',
      title: 'WHAT SURVIVES A DELETION?',
      question:
        'How much of a file\u2019s history remains in metadata, slack space, and system artefacts after the visible copy is gone?',
      method: 'Metadata inspection / file carving / timeline reconstruction',
      status: 'ONGOING',
    },
    {
      id: 'appsec',
      domain: 'APPLICATION SECURITY',
      title: 'WHERE DO TRUST BOUNDARIES LEAK?',
      question:
        'Which assumptions in an application survive contact with untrusted input, and which fail quietly?',
      method: 'Input review / authentication flows / dependency inspection',
      status: 'ONGOING',
    },
    {
      id: 'architecture',
      domain: 'SYSTEM ARCHITECTURE',
      title: 'HOW DOES A SYSTEM FAIL?',
      question:
        'What breaks first when a system is pushed: the interface, the data layer, or the assumptions between them?',
      method: 'Structure mapping / load reasoning / failure-path analysis',
      status: 'ONGOING',
    },
    {
      id: 'network',
      domain: 'NETWORK SECURITY',
      title: 'WHAT DOES NORMAL LOOK LIKE?',
      question:
        'How do you establish a baseline solid enough that an anomaly becomes visible without guesswork?',
      method: 'Traffic inspection / protocol behaviour / log review',
      status: 'ONGOING',
    },
  ],
  note: 'Status: ongoing study. No claim of completed research or published results.',
}
