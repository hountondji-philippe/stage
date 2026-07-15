<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@memoires-plus.local')],
            [
                'password' => env('ADMIN_PASSWORD', 'changeme123'),
                'role' => 'admin',
                'etudiant_autorise_id' => null,
            ]
        );
    }
}