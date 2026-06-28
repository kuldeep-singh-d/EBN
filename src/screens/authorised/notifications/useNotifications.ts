import useStyles from './styles';
import { useState } from 'react';
import { HeaderMenuItem } from '@components/container/authorised';
import { NotificationItem, NotificationsData } from './types';

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    sender: 'Prashant Shah',
    message: 'Sent you a referral',
    timeAgo: '',
    unread: false,
  },
  {
    id: '2',
    sender: 'Mahesh Barot',
    message: 'Recorded a One-to-One with you',
    timeAgo: '4w ago',
    unread: true,
  },
  {
    id: '3',
    sender: 'Prashant Shah',
    message: 'Sent you a referral',
    timeAgo: '5w ago',
    unread: false,
  },
  {
    id: '4',
    sender: 'Jigish Shah',
    message: 'Sent you a referral',
    timeAgo: '6w ago',
    unread: true,
  },
  {
    id: '5',
    sender: 'Jigish Shah',
    message: 'Sent you a referral',
    timeAgo: '6w ago',
    unread: true,
  },
  {
    id: '6',
    sender: 'Jigish Shah',
    message: 'Sent you a referral',
    timeAgo: '6w ago',
    unread: true,
  },
  {
    id: '7',
    sender: 'Jigish Shah',
    message: 'Recorded a One-to-One with you',
    timeAgo: '6w ago',
    unread: true,
  },
  {
    id: '8',
    sender: 'JAGRUTI PANCHAL',
    message: 'Sent you a referral',
    timeAgo: '6w ago',
    unread: false,
  },
  {
    id: '9',
    sender: 'VATSAL THACKER',
    message: 'Sent you a referral',
    timeAgo: '7w ago',
    unread: false,
  },
  {
    id: '10',
    sender: 'Marisha Acharya',
    message: 'Recently joined your chapter',
    timeAgo: '7w ago',
    unread: true,
  },
  {
    id: '11',
    sender: 'Mr Rakshit Ambaliya',
    message: 'Referral status has been updated',
    timeAgo: '9w ago',
    unread: false,
  },
  {
    id: '12',
    sender: 'Priyanka Parikh',
    message: 'Recently joined your chapter',
    timeAgo: '9w ago',
    unread: true,
  },
  {
    id: '13',
    sender: 'VIVEK PARIKH',
    message: 'Sent you a referral',
    timeAgo: '10w ago',
    unread: true,
  },
];

const MENU_ITEMS: HeaderMenuItem[] = [
  { id: 'markAllAsRead', label: 'Mark all as read' },
  { id: 'clearAll', label: 'Clear All' },
];

const useNotifications = () => {
  const styles = useStyles();
  const [screenData, setScreenData] = useState<NotificationsData>({
    items: NOTIFICATIONS,
  });

  const handleMarkAllAsRead = () => {
    setScreenData(current => ({
      items: current.items.map(item => ({ ...item, unread: false })),
    }));
  };

  const handleClearAll = () => {
    setScreenData({ items: [] });
  };

  const handleMenuAction = (item: HeaderMenuItem) => {
    if (item.id === 'markAllAsRead') {
      handleMarkAllAsRead();
      return;
    }

    if (item.id === 'clearAll') {
      handleClearAll();
    }
  };

  return {
    styles,
    states: {
      screenData,
    },
    handlers: {
      setScreenData,
      handleMenuAction,
    },
    constants: {
      menuItems: MENU_ITEMS,
    },
  };
};

export default useNotifications;
