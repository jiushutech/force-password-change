<?php

namespace JiushuTech\ForcePasswordChange\Api;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\User\User;

class AddUserAttributes
{
    public function __invoke(BasicUserSerializer $serializer, User $user, array $attributes): array
    {
        $actor = $serializer->getActor();

        // Only show force_password_change to the user themselves or admins
        if ($actor->id === $user->id || $actor->isAdmin()) {
            $attributes['forcePasswordChange'] = (bool) $user->force_password_change;
        }

        return $attributes;
    }
}
