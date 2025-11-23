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
        return '修改密码';
    }

    getPasswordSettings() {
        return {
            strongPasswordEnabled: app.forum.attribute('jiushutech-force-password-change.strong_password_enabled') || false,
            minLength: app.forum.attribute('jiushutech-force-password-change.min_password_length') || 8,
            requireUppercase: app.forum.attribute('jiushutech-force-password-change.require_uppercase') || false,
            requireLowercase: app.forum.attribute('jiushutech-force-password-change.require_lowercase') || false,
            requireNumbers: app.forum.attribute('jiushutech-force-password-change.require_numbers') || false,
            requireSpecialChars: app.forum.attribute('jiushutech-force-password-change.require_special_chars') || false,
        };
    }

    checkPasswordRequirement(password, requirement) {
        const settings = this.getPasswordSettings();

        switch (requirement) {
            case 'minLength':
                return password.length >= settings.minLength;
            case 'uppercase':
                return /[A-Z]/.test(password);
            case 'lowercase':
                return /[a-z]/.test(password);
            case 'numbers':
                return /[0-9]/.test(password);
            case 'specialChars':
                return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
            default:
                return false;
        }
    }

    validatePassword(password) {
        const settings = this.getPasswordSettings();

        // 检查最小长度
        if (password.length < settings.minLength) {
            return {
                valid: false,
                message: `密码长度至少为 ${settings.minLength} 个字符。`
            };
        }

        // 如果未启用强密码，只检查最小长度
        if (!settings.strongPasswordEnabled) {
            return { valid: true };
        }

        // 检查大写字母
        if (settings.requireUppercase && !/[A-Z]/.test(password)) {
            return {
                valid: false,
                message: '密码必须包含至少一个大写字母。'
            };
        }

        // 检查小写字母
        if (settings.requireLowercase && !/[a-z]/.test(password)) {
            return {
                valid: false,
                message: '密码必须包含至少一个小写字母。'
            };
        }

        // 检查数字
        if (settings.requireNumbers && !/[0-9]/.test(password)) {
            return {
                valid: false,
                message: '密码必须包含至少一个数字。'
            };
        }

        // 检查特殊字符
        if (settings.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
            return {
                valid: false,
                message: '密码必须包含至少一个特殊字符。'
            };
        }

        return { valid: true };
    }

    renderPasswordRequirements() {
        const settings = this.getPasswordSettings();
        const password = this.password();
        const requirements = [];

        // 最小长度要求（始终显示）
        requirements.push({
            text: `至少 ${settings.minLength} 个字符`,
            met: this.checkPasswordRequirement(password, 'minLength'),
            key: 'minLength'
        });

        // 只有启用强密码时才显示其他要求
        if (settings.strongPasswordEnabled) {
            if (settings.requireUppercase) {
                requirements.push({
                    text: '至少一个大写字母 (A-Z)',
                    met: this.checkPasswordRequirement(password, 'uppercase'),
                    key: 'uppercase'
                });
            }

            if (settings.requireLowercase) {
                requirements.push({
                    text: '至少一个小写字母 (a-z)',
                    met: this.checkPasswordRequirement(password, 'lowercase'),
                    key: 'lowercase'
                });
            }

            if (settings.requireNumbers) {
                requirements.push({
                    text: '至少一个数字 (0-9)',
                    met: this.checkPasswordRequirement(password, 'numbers'),
                    key: 'numbers'
                });
            }

            if (settings.requireSpecialChars) {
                requirements.push({
                    text: '至少一个特殊字符 (!@#$%^&*...)',
                    met: this.checkPasswordRequirement(password, 'specialChars'),
                    key: 'specialChars'
                });
            }
        }

        return (
            <div className="PasswordRequirements">
                <p className="PasswordRequirements-title">密码要求：</p>
                <ul className="PasswordRequirements-list">
                    {requirements.map(req => (
                        <li
                            key={req.key}
                            className={`PasswordRequirement ${req.met ? 'is-met' : 'is-unmet'}`}
                        >
                            <span className="PasswordRequirement-icon">
                                {req.met ? '✓' : '○'}
                            </span>
                            <span className="PasswordRequirement-text">
                                {req.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    content() {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <p className="helpText">
                        出于安全原因，您必须先修改密码才能继续使用。
                    </p>

                    {this.renderPasswordRequirements()}

                    <div className="Form-group">
                        <input
                            className="FormControl"
                            name="password"
                            type="password"
                            placeholder="新密码"
                            bidi={this.password}
                            disabled={this.loading}
                            oninput={() => m.redraw()}
                        />
                    </div>
                    <div className="Form-group">
                        <input
                            className="FormControl"
                            name="passwordConfirm"
                            type="password"
                            placeholder="确认密码"
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
                            '修改密码'
                        )}
                    </div>
                </div>
                <style>{`
                    .PasswordRequirements {
                        margin: 15px 0;
                        padding: 12px;
                        background: #f8f9fa;
                        border-radius: 4px;
                        border-left: 3px solid #3f51b5;
                    }

                    .PasswordRequirements-title {
                        margin: 0 0 8px 0;
                        font-weight: 600;
                        font-size: 14px;
                        color: #333;
                    }

                    .PasswordRequirements-list {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }

                    .PasswordRequirement {
                        display: flex;
                        align-items: center;
                        margin: 6px 0;
                        font-size: 13px;
                        transition: all 0.2s ease;
                    }

                    .PasswordRequirement-icon {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 20px;
                        height: 20px;
                        margin-right: 8px;
                        border-radius: 50%;
                        font-weight: bold;
                        font-size: 14px;
                        flex-shrink: 0;
                    }

                    .PasswordRequirement.is-met .PasswordRequirement-icon {
                        background: #4caf50;
                        color: white;
                    }

                    .PasswordRequirement.is-unmet .PasswordRequirement-icon {
                        background: #e0e0e0;
                        color: #999;
                    }

                    .PasswordRequirement.is-met .PasswordRequirement-text {
                        color: #4caf50;
                        font-weight: 500;
                    }

                    .PasswordRequirement.is-unmet .PasswordRequirement-text {
                        color: #666;
                    }
                `}</style>
            </div>
        );
    }

    onsubmit(e) {
        e.preventDefault();

        if (this.password() !== this.passwordConfirm()) {
            app.alerts.show(
                { type: 'error' },
                '两次输入的密码不一致。'
            );
            return;
        }

        // 使用强密码验证
        const validation = this.validatePassword(this.password());
        if (!validation.valid) {
            app.alerts.show(
                { type: 'error' },
                validation.message
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
                '密码修改成功！'
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
