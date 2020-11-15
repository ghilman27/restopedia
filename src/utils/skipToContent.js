const changeSkipToContentHref = (urlPathname) => {
    const skipToContent = document.querySelector('#skip-to-content');
    skipToContent.setAttribute('href', `${urlPathname}#content`);
};

export default changeSkipToContentHref;
