<?php

namespace Database\Seeders;

use App\Models\Truck;
use Database\Factories\TruckFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TruckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        

        Truck::factory(300)
            ->state(function (array $attributes) {
                $factory = new TruckFactory();
                $factory->configure();
                return [];
            })
            ->create();
    }
}

// Truck::factory(1)
        // ->create();

        // Truck::factory()
        //     ->afterMaking(function (Truck $truck) {
        //         $truckFactory = new TruckFactory();
        //         $truckFactory->configure();
        //     })
        //     ->create();
