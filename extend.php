<?php

namespace JiushuTech\ForcePasswordChange;

use Flarum\Extend;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\User;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->post('/force-password-change', 'jiushutech.forcePasswordChange', Api\Controller\ChangePasswordController::class),

    (new Extend\Event())
        ->listen(UserSaving::class, Listener\SetForcePasswordChange::class),

    (new Extend\ApiSerializer(\Flarum\Api\Serializer\CurrentUserSerializer::class))
        ->attributes(Api\AddUserAttributes::class),

    (new Extend\Model(User::class))
        ->cast('force_password_change', 'bool'),

    (new Extend\Settings())
        ->serializeToForum('jiushutech-force-password-change.strong_password_enabled', 'jiushutech-force-password-change.strong_password_enabled', 'boolval')
        ->serializeToForum('jiushutech-force-password-change.min_password_length', 'jiushutech-force-password-change.min_password_length', 'intval')
        ->serializeToForum('jiushutech-force-password-change.require_uppercase', 'jiushutech-force-password-change.require_uppercase', 'boolval')
        ->serializeToForum('jiushutech-force-password-change.require_lowercase', 'jiushutech-force-password-change.require_lowercase', 'boolval')
        ->serializeToForum('jiushutech-force-password-change.require_numbers', 'jiushutech-force-password-change.require_numbers', 'boolval')
        ->serializeToForum('jiushutech-force-password-change.require_special_chars', 'jiushutech-force-password-change.require_special_chars', 'boolval'),
];
