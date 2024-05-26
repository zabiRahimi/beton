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
    public function getCementInventorys ()
    {
        $cementInventorys= CementStore::get();
        return response()->json(['cementInventorys' => $cementInventorys]);

    }

     /**
     * Receive and display sand inventory
     */
    public function getSandInventorys ()
    {
        $sandInventorys= SandStore::get();
        return response()->json(['sandInventorys' => $sandInventorys]);
    }

     /**
     * Receive and display water inventory
     */
    public function getWaterInventorys ()
    {
        $waterInventorys= WaterStore::get();
        return response()->json(['waterInventorys' => $waterInventorys]);
    }
}
