<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('users', 'force_password_change')) {
            $schema->table('users', function (Blueprint $table) {
                $table->boolean('force_password_change')->default(false)->after('password');
            });
        }
    },
    'down' => function (Builder $schema) {
        if ($schema->hasColumn('users', 'force_password_change')) {
            $schema->table('users', function (Blueprint $table) {
                $table->dropColumn('force_password_change');
            });
        }
    }
];
