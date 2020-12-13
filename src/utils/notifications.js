const body = document.querySelector('body');

const renderNotificationToast = (
    content,
    element = body,
) => {
    const notificationTest = document.createElement('notification-toast');
    notificationTest.content = content;
    element.appendChild(notificationTest);
};

export default renderNotificationToast;
