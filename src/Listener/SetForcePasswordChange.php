<?php

namespace JiushuTech\ForcePasswordChange\Listener;

use Flarum\User\Event\Saving;

class SetForcePasswordChange
{
    public function handle(Saving $event)
    {
        $user = $event->user;
        $actor = $event->actor;
        $data = $event->data;

        // Only set force_password_change when admin creates a new user
        if (!$user->exists && $actor && $actor->isAdmin()) {
            // Check if explicitly set in data, otherwise default to true for admin-created users
            if (isset($data['attributes']['forcePasswordChange'])) {
                $user->force_password_change = (bool) $data['attributes']['forcePasswordChange'];
            } else {
                $user->force_password_change = true;
            }
        }
    }
}
