<?php

namespace JiushuTech\ForcePasswordChange\Api\Controller;

use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class ChangePasswordController implements RequestHandlerInterface
{
    protected SettingsRepositoryInterface $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        if ($actor->isGuest()) {
            throw new PermissionDeniedException();
        }

        $data = $request->getParsedBody();
        $newPassword = Arr::get($data, 'password');

        // 验证密码
        $validationError = $this->validatePassword($newPassword);
        if ($validationError !== null) {
            return new JsonResponse([
                'errors' => [
                    [
                        'status' => '422',
                        'code' => 'validation_error',
                        'detail' => $validationError
                    ]
                ]
            ], 422);
        }

        $actor->changePassword($newPassword);
        $actor->force_password_change = false;
        $actor->save();

        return new JsonResponse([
            'data' => [
                'type' => 'users',
                'id' => (string) $actor->id,
                'attributes' => [
                    'forcePasswordChange' => false
                ]
            ]
        ]);
    }

    protected function validatePassword(?string $password): ?string
    {
        if (empty($password)) {
            return '密码不能为空。';
        }

        $strongPasswordEnabled = (bool) $this->settings->get('jiushutech-force-password-change.strong_password_enabled', false);
        $minLength = (int) $this->settings->get('jiushutech-force-password-change.min_password_length', 8);

        // 确保最小长度至少为1
        if ($minLength < 1) {
            $minLength = 8;
        }

        // 检查最小长度
        if (strlen($password) < $minLength) {
            return "密码长度至少为 {$minLength} 个字符。";
        }

        // 如果未启用强密码，只检查最小长度
        if (!$strongPasswordEnabled) {
            return null;
        }

        // 检查大写字母
        $requireUppercase = (bool) $this->settings->get('jiushutech-force-password-change.require_uppercase', false);
        if ($requireUppercase && !preg_match('/[A-Z]/', $password)) {
            return '密码必须包含至少一个大写字母。';
        }

        // 检查小写字母
        $requireLowercase = (bool) $this->settings->get('jiushutech-force-password-change.require_lowercase', false);
        if ($requireLowercase && !preg_match('/[a-z]/', $password)) {
            return '密码必须包含至少一个小写字母。';
        }

        // 检查数字
        $requireNumbers = (bool) $this->settings->get('jiushutech-force-password-change.require_numbers', false);
        if ($requireNumbers && !preg_match('/[0-9]/', $password)) {
            return '密码必须包含至少一个数字。';
        }

        // 检查特殊字符
        $requireSpecialChars = (bool) $this->settings->get('jiushutech-force-password-change.require_special_chars', false);
        if ($requireSpecialChars && !preg_match('/[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?~`]/', $password)) {
            return '密码必须包含至少一个特殊字符。';
        }

        return null;
    }
}
