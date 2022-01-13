export const isSupportNotification = 'Notification' in window;

export type NotificationStatus = NotificationPermission | 'no_support';


export function getNotificationStatus():NotificationStatus {
  return isSupportNotification ? Notification.permission : 'no_support';
}


export function requestNotificationPermission(callback: (permission: NotificationPermission) => any){
  if (isSupportNotification) {
    Notification.requestPermission(callback).then(callback);
  }
}

export function createNotification(title: string, options?: NotificationOptions) {
    if (getNotificationStatus() === 'granted') {
      new Notification(title, options);
    }
}
