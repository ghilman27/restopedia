const decideGreeting = () => {
    const today = new Date();
    const currentHour = today.getHours();

    if (currentHour >= 16 && currentHour < 20) {
        return 'Good Evening';
    }
    if (currentHour >= 4 && currentHour < 11) {
        return 'Good Morning';
    }
    if (currentHour >= 11 && currentHour < 16) {
        return 'Good Afternoon';
    }
    return 'Good Night';
};

export default decideGreeting;
