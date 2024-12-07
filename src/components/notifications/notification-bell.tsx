import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";
import { formatDate } from "~/lib/utils/format";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications, isLoading } = api.notification.getAll.useQuery();
  const { mutate: markAsRead } = api.notification.markAsRead.useMutation();
  const { mutate: markAllAsRead } = api.notification.markAllAsRead.useMutation();

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  const handleMarkAsRead = (id: string) => {
    markAsRead({ id });
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-indigo-600 hover:text-indigo-500"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="mt-2 divide-y divide-gray-200">
              {isLoading ? (
                <p className="py-2 text-sm text-gray-500">Loading...</p>
              ) : notifications?.length === 0 ? (
                <p className="py-2 text-sm text-gray-500">No notifications</p>
              ) : (
                notifications?.map((notification) => (
                  <div
                    key={notification.id}
                    className={`py-3 ${notification.read ? "opacity-75" : ""}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="ml-4 text-xs text-indigo-600 hover:text-indigo-500"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}