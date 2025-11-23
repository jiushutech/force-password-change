import app from 'flarum/admin/app';

app.initializers.add('jiushutech/force-password-change', () => {
    app.extensionData
        .for('jiushutech-force-password-change')
        .registerPermission(
            {
                icon: 'fas fa-key',
                label: app.translator.trans('jiushutech-force-password-change.admin.permissions.bypass_force_change'),
                permission: 'jiushutech.bypassForcePasswordChange',
            },
            'moderate'
        );
});
