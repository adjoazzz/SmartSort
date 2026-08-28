import { toast as sonnerToast, ExternalToast } from 'sonner';
import React from 'react';

export const dispatchAlertEvent = (message: string, severity: 'CRITICAL' | 'WARNING' | 'INFO', opts?: any) => {
  window.dispatchEvent(new CustomEvent('app-alert', { 
    detail: { message, severity, device: opts?.device || "System", type: opts?.type || "Notification", ...opts } 
  }));
};

export const toast = {
  ...sonnerToast,
  error: (msg: string | React.ReactNode, data?: ExternalToast & { device?: string, type?: string }) => {
    if (typeof msg === 'string') dispatchAlertEvent(msg, 'CRITICAL', data);
    return sonnerToast.error(msg, data);
  },
  success: (msg: string | React.ReactNode, data?: ExternalToast & { device?: string, type?: string }) => {
    if (typeof msg === 'string') dispatchAlertEvent(msg, 'INFO', data);
    return sonnerToast.success(msg, data);
  },
  warning: (msg: string | React.ReactNode, data?: ExternalToast & { device?: string, type?: string }) => {
    if (typeof msg === 'string') dispatchAlertEvent(msg, 'WARNING', data);
    return sonnerToast.warning(msg, data);
  },
  info: (msg: string | React.ReactNode, data?: ExternalToast & { device?: string, type?: string }) => {
    if (typeof msg === 'string') dispatchAlertEvent(msg, 'INFO', data);
    return sonnerToast.info(msg, data);
  }
};
