<?php

namespace JiushuTech\ForcePasswordChange\Listener;

use Flarum\User\Event\Saving;

class SetForcePasswordChange
{
    public function __invoke(Saving $event)
    {
        try {
            $user = $event->user;
            $actor = $event->actor;
            $data = $event->data;

            // 只在创建新用户时才执行
            if (!$user->exists) {
                // 确保 actor 存在且是管理员
                if ($actor && $actor->isAdmin()) {
                    // 检查是否在数据中明确设置了值
                    if (isset($data['attributes']['forcePasswordChange'])) {
                        $user->force_password_change = (bool) $data['attributes']['forcePasswordChange'];
                    } else {
                        // 默认为 true（管理员创建的用户需要修改密码）
                        $user->force_password_change = true;
                    }
                }
            }
        } catch (\Throwable $e) {
            // 静默失败，不影响用户保存过程
        }
    }
}
