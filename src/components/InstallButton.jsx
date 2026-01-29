import PropTypes from 'prop-types';
import React from 'react'

const InstallButton = ({ className, children }) => {
    const [deferredPrompt, setDeferredPrompt] = React.useState(null);
    React.useEffect(() => {
        function onBeforeInstall(e) {
            e.preventDefault();
            setDeferredPrompt(e);
        }
        window.addEventListener('beforeinstallprompt', onBeforeInstall);
        return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        try {
            const choice = await deferredPrompt.userChoice;
            if (choice && choice.outcome === 'accepted') {
                setDeferredPrompt(null);
            }
        } catch (err) {
            console.log('install error', err);
        }
    };

    // if (!deferredPrompt) return null;

    return (
        <button onClick={handleInstall} className={className}>
            {children || 'Install App'}
        </button>
    );
};

export default InstallButton;

InstallButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
}
