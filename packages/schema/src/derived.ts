import type { Tool } from './tool.ts';

/**
 * True when most companies would need to approve the tool: a bot joins customer calls,
 * or there is no browser or mobile way to use it (a desktop install only).
 */
export function needsItApproval(tool: Pick<Tool, 'form'>): boolean {
  return tool.form.includes('meeting-bot') || !tool.form.some((f) => f === 'web' || f === 'mobile');
}
