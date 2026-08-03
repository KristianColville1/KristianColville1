/**
 * Whether a link navigates away to another site.
 *
 * In-page anchors stay put, and `mailto:`/`tel:` hand off to the OS — opening
 * any of them in a new tab leaves the user with a stray blank window.
 */
export function isExternalLink(href: string): boolean {
  return !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:');
}
