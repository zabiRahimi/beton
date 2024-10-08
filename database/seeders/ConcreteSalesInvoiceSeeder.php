<?php

namespace Database\Seeders;

use App\Models\ConcreteSalesInvoice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConcreteSalesInvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ConcreteSalesInvoice:: factory(3000)->create();
    }
}
