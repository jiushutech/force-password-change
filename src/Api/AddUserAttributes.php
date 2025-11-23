<?php

namespace JiushuTech\ForcePasswordChange\Api;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\User\User;

class AddUserAttributes
{
    public function __invoke(BasicUserSerializer $serializer, User $user, array $attributes): array
    {
        // 添加防护：确保始终返回数组
        if (!is_array($attributes)) {
            $attributes = [];
        }

        try {
            $actor = $serializer->getActor();

            // 确保 actor 存在且不是 null
            if (!$actor) {
                return $attributes;
            }

            // 只有当用户查看自己或管理员查看时才添加属性
            if ($actor->isGuest()) {
                return $attributes;
            }

            // 检查权限
            $canView = ($actor->id === $user->id) || $actor->isAdmin();
            if (!$canView) {
                return $attributes;
            }

            // 安全地获取 force_password_change 值
            $forcePasswordChange = false;

            // 尝试多种方法获取值
            if (property_exists($user, 'force_password_change')) {
                $forcePasswordChange = (bool) $user->force_password_change;
            } elseif (isset($user->force_password_change)) {
                $forcePasswordChange = (bool) $user->force_password_change;
            } elseif (method_exists($user, 'getAttribute')) {
                $value = $user->getAttribute('force_password_change');
                if ($value !== null) {
                    $forcePasswordChange = (bool) $value;
                }
            }

            $attributes['forcePasswordChange'] = $forcePasswordChange;

        } catch (\Throwable $e) {
            // 完全捕获所有错误，包括 Error 和 Exception
            // 不做任何操作，确保不影响序列化过程
        }

        return $attributes;
    }
}
