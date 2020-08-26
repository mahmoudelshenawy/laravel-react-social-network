<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::create([
            'name' => 'admin',
            'email' => 'admin@social-network.com',
            'password' => bcrypt('1234567'),
            'is_admin' => 1
        ]);
    }
}
