import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ForcePasswordChangeModal from './components/ForcePasswordChangeModal';

app.initializers.add('jiushutech/force-password-change', () => {
    extend(app, 'mount', function () {
        // Check after the app is fully mounted
        setTimeout(() => {
            checkForcePasswordChange();
        }, 100);
    });

    // Also check when session changes
    if (app.session && app.session.user) {
        checkForcePasswordChange();
    }
});

function checkForcePasswordChange() {
    const user = app.session?.user;

    if (user && user.attribute('forcePasswordChange')) {
        app.modal.show(ForcePasswordChangeModal, {
            user: user
        });
    }
}
