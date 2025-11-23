import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class ForcePasswordChangeModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);

        this.password = Stream('');
        this.passwordConfirm = Stream('');
        this.loading = false;
    }

    static isDismissible = false;

    className() {
        return 'ForcePasswordChangeModal Modal--small';
    }

    title() {
        return app.translator.trans('jiushutech-force-password-change.forum.modal.title');
    }

    content() {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <p className="helpText">
                        {app.translator.trans('jiushutech-force-password-change.forum.modal.help')}
                    </p>
                    <div className="Form-group">
                        <input
                            className="FormControl"
                            name="password"
                            type="password"
                            placeholder={app.translator.trans('jiushutech-force-password-change.forum.modal.new_password_placeholder')}
                            bidi={this.password}
                            disabled={this.loading}
                        />
                    </div>
                    <div className="Form-group">
                        <input
                            className="FormControl"
                            name="passwordConfirm"
                            type="password"
                            placeholder={app.translator.trans('jiushutech-force-password-change.forum.modal.confirm_password_placeholder')}
                            bidi={this.passwordConfirm}
                            disabled={this.loading}
                        />
                    </div>
                    <div className="Form-group">
                        {Button.component(
                            {
                                className: 'Button Button--primary Button--block',
                                type: 'submit',
                                loading: this.loading,
                            },
                            app.translator.trans('jiushutech-force-password-change.forum.modal.submit_button')
                        )}
                    </div>
                </div>
            </div>
        );
    }

    onsubmit(e) {
        e.preventDefault();

        if (this.password() !== this.passwordConfirm()) {
            app.alerts.show(
                { type: 'error' },
                app.translator.trans('jiushutech-force-password-change.forum.modal.passwords_not_match')
            );
            return;
        }

        if (this.password().length < 8) {
            app.alerts.show(
                { type: 'error' },
                app.translator.trans('jiushutech-force-password-change.forum.modal.password_too_short')
            );
            return;
        }

        this.loading = true;

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/force-password-change',
            body: {
                password: this.password()
            }
        })
        .then(() => {
            // Update local user data
            if (app.session.user) {
                app.session.user.pushAttributes({
                    forcePasswordChange: false
                });
            }

            app.alerts.show(
                { type: 'success' },
                app.translator.trans('jiushutech-force-password-change.forum.modal.success')
            );

            this.hide();
        })
        .catch((error) => {
            this.loading = false;
            m.redraw();
            throw error;
        });
    }
}
