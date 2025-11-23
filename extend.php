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

    (new Extend\ApiSerializer(\Flarum\Api\Serializer\UserSerializer::class))
        ->attributes(Api\AddUserAttributes::class),

    (new Extend\Model(User::class))
        ->cast('force_password_change', 'bool'),
];
