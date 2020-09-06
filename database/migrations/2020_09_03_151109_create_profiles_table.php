<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('age')->nullable();
            $table->integer('contact_number')->nullable();
            $table->string('study')->nullable();
            $table->string('graduation_year')->nullable();
            $table->string('years_of_experience')->nullable();
            $table->string('current_job');
            $table->string('previous_job');
            $table->string('avatar')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('linkedin')->nullable();
            $table->text('experience_language')->nullable();
            $table->text('experience_technology')->nullable();
            $table->text('portfolio')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
