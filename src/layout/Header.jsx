import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useUser } from '../pages/Account/UserContext'
import { UserOutlined } from '@ant-design/icons';
import { CgMenuRight } from 'react-icons/cg';
import { isMobile } from 'react-device-detect';
import React from 'react';
const Header = () => {
    const { user } = useUser();
    const [open, setOpen] = React.useState(false);
    const [deferredPrompt, setDeferredPrompt] = React.useState(null);
    const [showInstall, setShowInstall] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    React.useEffect(() => {
        function onBeforeInstall(e) {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        }
        window.addEventListener('beforeinstallprompt', onBeforeInstall);
        return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
    }, []);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    const handleAddShortcut = async () => {
        // iOS Safari: show manual instructions
        if (isIOS && isSafari) {
            setShowModal(true);
            return;
        }

        if (deferredPrompt) {
            deferredPrompt.prompt();
            try {
                const choice = await deferredPrompt.userChoice;
                if (choice && choice.outcome === 'accepted') {
                    setDeferredPrompt(null);
                    setShowInstall(false);
                }
            } catch (err) {
                console.log(err)
            }
            return;
        }

        // Fallback: create a downloadable shortcut file for desktop platforms
        const url = window.location.href;
        const isWindows = navigator.userAgent.includes('Windows');
        const filename = isWindows ? 'MatrimonialWeb.url' : 'MatrimonialWeb.webloc';
        let content;
        if (isWindows) {
            content = `[InternetShortcut]\r\nURL=${url}\r\n`;
        } else {
            content = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0"><dict><key>URL</key><string>${url}</string></dict></plist>`;
        }
        const blob = new Blob([content], { type: 'application/octet-stream' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);

        if (!isWindows) {
            // On mobile (iOS) or mac, adding to home screen often requires manual steps
            // Show a short instruction so users know what to do next.
            alert('If you are on iOS or macOS, move the downloaded file to your Desktop or follow your platform instructions to add the site to your home screen. On iOS: open Safari → Share → Add to Home Screen.');
        }
    };
    const location = useLocation();
    React.useEffect(() => {
        setOpen(false);
    }, [location.pathname, isMobile])
    const weblinks = () => (
        <>

            <li>
                <Link to={'/'} >Home</Link>
            </li>
            <li>
                <Link to={'/about'} >About</Link>
            </li>
            {
                user && (
                    <>
                        <li>
                            <Link to={'/users'} >Profiles</Link>
                        </li>
                    </>
                )
            }

            <li>
                <Link to={'/faqs'} >Faqs</Link>
            </li>
            <li>
                <Link to={'/contact'} >Contact</Link>
            </li>
        </>
    )
    return (
        <>
            <section className='bg-yellow-100/20 relative'>
                <div className="container relative">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="flex justify-between items-center">
                                <Link to={'/'} className="w-16 py-3 inline-block">
                                    <img src={logo} className='w-full' alt="" />
                                </Link>

                                <ul className="lg:inline-flex hidden gap-5 relative start-28 navlinks mx-auto">
                                    {weblinks()}
                                </ul>

                                <ul className="inline-flex items-center ms-auto gap-5">
                                    <li>
                                        {
                                            user ? (<>
                                                <Link to={'/user/dashboard'} className="lg:bg-primary lg:text-white px-3 py-2 rounded  text-sm  font-light uppercase btn overflow-hidden relative block">
                                                    <span className="inline-block lg:bg-white text-primary leading-8 text-center rounded-full size-8 mr-2">
                                                        <UserOutlined />
                                                    </span>
                                                    <span className=''>
                                                        {user?.name} {user?.last_name}
                                                    </span>
                                                </Link>
                                            </>) : (<>
                                                <Link to={'/login'} className="lg:bg-primary lg:text-white text-primary px-3 py-2 rounded  lg:text-sm text-xl  font-light uppercase btn overflow-hidden relative block">
                                                    <span className='lg:inline hidden'>Account</span>
                                                    <span className='lg:hidden inline'>
                                                        <UserOutlined />
                                                    </span>
                                                </Link>
                                            </>)
                                        }

                                    </li>
                                    <li>
                                        <button onClick={handleAddShortcut} className="lg:bg-white/10 text-primary px-3 py-2 rounded text-sm font-light uppercase btn overflow-hidden relative block">
                                            {deferredPrompt || showInstall ? 'Install App' : 'Add Shortcut'}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleOpen()} className='text-primary lg:hidden block text-xl'>
                                            <CgMenuRight />
                                        </button>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
                {
                    open && (
                        <>
                            <div className="relative top-0 w-full bg-primary p-5">
                                <ul className='*:text-white navlinkmobile'>
                                    {weblinks()}
                                </ul>
                            </div>

                        </>
                    )
                }

                {/* iOS Safari Instructions Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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

            </section>

        </>
    )
}

export default Header
