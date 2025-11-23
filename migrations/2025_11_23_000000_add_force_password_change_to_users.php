<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        // 检查字段是否已存在，避免重复添加
        if (!$schema->hasColumn('users', 'force_password_change')) {
            $schema->table('users', function (Blueprint $table) {
                $table->boolean('force_password_change')
                    ->default(false)
                    ->after('password')
                    ->comment('是否强制用户修改密码');
            });
        }
    },
    'down' => function (Builder $schema) {
        // 删除字段
        if ($schema->hasColumn('users', 'force_password_change')) {
            $schema->table('users', function (Blueprint $table) {
                $table->dropColumn('force_password_change');
            });
        }
    }
];
