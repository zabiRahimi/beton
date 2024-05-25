<?php

namespace App\Http\Controllers;

use App\Models\CementStore;
use App\Models\SandStore;
use App\Models\WaterStore;
use Illuminate\Http\Request;

class HomeController extends Controller
{
     /**
     * Receive and display cement inventory
     */
    public function getCementInventory ()
    {
        $cementInventory= CementStore::get();
        return response()->json(['cementInventory' => $cementInventory]);

    }

     /**
     * Receive and display sand inventory
     */
    public function getSandInventory ()
    {
        $sandInventory= SandStore::get();
        return response()->json(['sandInventory' => $sandInventory]);
    }

     /**
     * Receive and display water inventory
     */
    public function getWaterInventory ()
    {
        $waterInventory= WaterStore::get();
        return response()->json(['waterInventory' => $waterInventory]);
    }
}
