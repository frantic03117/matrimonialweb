import PropTypes from 'prop-types';
import React from 'react'

const InstallButton = ({ className, children }) => {
    const [deferredPrompt, setDeferredPrompt] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    React.useEffect(() => {
        function onBeforeInstall(e) {
            e.preventDefault();
            setDeferredPrompt(e);
        }
        window.addEventListener('beforeinstallprompt', onBeforeInstall);
        return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
    }, []);

    const handleInstall = async () => {
        // iOS Safari: show manual instructions
        if (isIOS && isSafari && !deferredPrompt) {
            setShowModal(true);
            return;
        }

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

    return (
        <>
            <button onClick={handleInstall} className={className}>
                {children || 'Install App'}
            </button>

            {/* iOS Safari Instructions Modal */}
            {showModal && (
                <div className="fixed z-[999999] inset-0 bg-black/50 flex items-center justify-center  p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h2 className="text-lg font-bold text-primary mb-4">Add to Home Screen</h2>
                        <p className="text-sm text-gray-700 mb-4">
                            On iOS, follow these steps to add Surajmal Matrimony to your home screen:
                        </p>
                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 mb-6">
                            <li>Tap the <strong>Share</strong> button at the bottom of Safari</li>
                            <li>Scroll down and tap <strong>Add to Home Screen</strong></li>
                            <li>Name it <strong>Matrimony</strong> (or your preferred name)</li>
                            <li>Tap <strong>Add</strong> in the top right</li>
                        </ol>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-primary text-white py-2 rounded font-medium"
                        >
                            Got It
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default InstallButton;

InstallButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
}
