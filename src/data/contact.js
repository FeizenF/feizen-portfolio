/**
 * Contact channels. `github` is the verified public profile for this project.
 * Add an email address, LinkedIn URL, or Instagram URL when they are ready to
 * be public; the UI and the contact form pick them up automatically.
 *
 * `email` must be a bare address (no `mailto:`).
 */
export const contact = {
  email: '',
  github: 'https://github.com/FeizenF',
  linkedin: '',
  instagram: '',
}

export const contactChannels = [
  { id: 'email', label: 'EMAIL', value: contact.email, kind: 'email', icon: 'mail' },
  { id: 'github', label: 'GITHUB', value: contact.github, kind: 'url', icon: 'github' },
  { id: 'linkedin', label: 'LINKEDIN', value: contact.linkedin, kind: 'url', icon: 'linkedin' },
  { id: 'instagram', label: 'INSTAGRAM', value: contact.instagram, kind: 'url', icon: 'instagram' },
].filter((channel) => Boolean(channel.value))
