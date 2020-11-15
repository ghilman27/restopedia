const renderNotificationToast = (
    content,
    element = document.querySelector('main'),
) => {
    const notificationTest = document.createElement('notification-toast');
    notificationTest.content = content;
    element.appendChild(notificationTest);
};

export default renderNotificationToast;
