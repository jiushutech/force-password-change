<?php

namespace JiushuTech\ForcePasswordChange\Api\Controller;

use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class ChangePasswordController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        if ($actor->isGuest()) {
            throw new PermissionDeniedException();
        }

        $data = $request->getParsedBody();
        $newPassword = Arr::get($data, 'password');

        if (empty($newPassword) || strlen($newPassword) < 8) {
            return new JsonResponse([
                'errors' => [
                    [
                        'status' => '422',
                        'code' => 'validation_error',
                        'detail' => 'Password must be at least 8 characters long.'
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
}
