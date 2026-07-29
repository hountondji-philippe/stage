<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admins = [
            [
                'email' => env('ADMIN_EMAIL', 'admin@memoires-plus.local'),
                'password' => env('ADMIN_PASSWORD', 'changeme123'),
            ],
            [
                'email' => env('ADMIN_EMAIL_2'),
                'password' => env('ADMIN_PASSWORD_2'),
            ],
        ];

        foreach ($admins as $admin) {
            if (empty($admin['email']) || empty($admin['password'])) {
                continue;
            }

            User::firstOrCreate(
                ['email' => $admin['email']],
                [
                    'password' => $admin['password'],
                    'role' => 'admin',
                    'etudiant_autorise_id' => null,
                ]
            );
        }
    }
}