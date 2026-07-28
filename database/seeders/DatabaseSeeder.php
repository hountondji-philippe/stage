<?php

namespace Database\Seeders;

// use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DemoEtudiantsSeeder::class,
            // Ajoute ici les autres seeders que tu avais, ex: AdminSeeder::class,
        ]);
    }
}