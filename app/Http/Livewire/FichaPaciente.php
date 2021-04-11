<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\Paciente;
use App\Models\FichaMedica;
use Illuminate\Support\Facades\DB;

class FichaPaciente extends Component
{
    public $nombre, $apellidos, $domicilio, $nacimiento, $edad;
    public $telefono, $escolaridad, $ocupacion, $estado_civil, $religion, $adicciones, $vive_con;

    protected $rules = [
        'nombre' => 'required|min:5|max:30',
        'apellidos' => 'required|max:60',
        'domicilio' => 'required',
        'nacimiento' => 'required|min:10|max:11',
        'edad' => 'required',
        'telefono' => 'min:10|max:10',

        'escolaridad' => 'required',
        'ocupacion' => 'required',
        'estado_civil' => 'required',
        'religion' => 'required|max:90',
        'adicciones' => 'required',
        'vive_con' => 'required'
    ];

    public function submit()
    {
        $date = date("Y-m-d H:i:s");

        $validarDatos = $this->validate();
        DB::table('pacientes')->insert([
            'nombre' => $validarDatos['nombre'],
            'apellidos' => $validarDatos['apellidos'],
            'edad' => $validarDatos['edad'],
            'domicilio' => $validarDatos['domicilio'],
            'fecha_nacimiento' => $validarDatos['nacimiento'],
            'telefono_correo' => $validarDatos['telefono'],
            'status' => 'A',
            'created_at' => $date
        ]);
        $paciente_id = DB::getPdo()->lastInsertId();

        DB::table('ficha_medica')->insert([
            'escolaridad' => $validarDatos['escolaridad'],
            'ocupacion' => $validarDatos['ocupacion'],
            'estado_civil' => $validarDatos['estado_civil'],
            'religion' => $validarDatos['religion'],
            'adicciones' => $validarDatos['adicciones'],
            'vive_con' => $validarDatos['vive_con'],
            'paciente_id' => $paciente_id,
            'created_at' => $date
        ]);
    }
    public function render()
    {
        return view('livewire.ficha-paciente');
    }
}
