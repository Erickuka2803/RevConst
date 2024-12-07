export const NOTIFICATION_TYPES = {
  SUBMISSION_STATUS: 'SUBMISSION_STATUS',
  COMMENT: 'COMMENT',
  SYSTEM: 'SYSTEM',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];