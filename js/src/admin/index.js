import app from 'flarum/admin/app';

app.initializers.add('jiushutech/force-password-change', () => {
    app.extensionData
        .for('jiushutech-force-password-change')
        .registerSetting({
            setting: 'jiushutech-force-password-change.strong_password_enabled',
            type: 'boolean',
            label: '启用强密码要求',
            help: '启用后，用户必须满足以下密码要求',
        })
        .registerSetting({
            setting: 'jiushutech-force-password-change.min_password_length',
            type: 'number',
            label: '最小密码长度',
            help: '密码所需的最小字符数（默认：8）',
            min: 1,
            max: 100,
            default: 8,
        })
        .registerSetting({
            setting: 'jiushutech-force-password-change.require_uppercase',
            type: 'boolean',
            label: '需要大写字母',
        })
        .registerSetting({
            setting: 'jiushutech-force-password-change.require_lowercase',
            type: 'boolean',
            label: '需要小写字母',
        })
        .registerSetting({
            setting: 'jiushutech-force-password-change.require_numbers',
            type: 'boolean',
            label: '需要数字',
        })
        .registerSetting({
            setting: 'jiushutech-force-password-change.require_special_chars',
            type: 'boolean',
            label: '需要特殊字符',
        })
        .registerPermission(
            {
                icon: 'fas fa-key',
                label: '跳过强制密码修改',
                permission: 'jiushutech.bypassForcePasswordChange',
            },
            'moderate'
        );
});
