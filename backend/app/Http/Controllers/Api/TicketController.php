<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    public function mesTickets(Request $request)
    {
        $tickets = $request->user()->tickets()->latest()->get();

        return response()->json(['tickets' => $tickets]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sujet' => 'required|string|max:255',
            'categorie' => 'required|in:depot,compte,bug,administratif,autre',
            'description' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Donnees invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $ticket = Ticket::create([
            'user_id' => $request->user()->id,
            'sujet' => $request->sujet,
            'categorie' => $request->categorie,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Ticket ouvert avec succes.',
            'ticket' => $ticket,
        ], 201);
    }

    public function tousAdmin(Request $request)
    {
        $query = Ticket::with('user.etudiantAutorise');

        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        }

        $tickets = $query->latest()->paginate(15);

        return response()->json($tickets);
    }

    public function repondre(Request $request, Ticket $ticket)
    {
        $validator = Validator::make($request->all(), [
            'reponse' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La reponse est obligatoire.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $ticket->update([
            'reponse' => $request->reponse,
            'statut' => 'resolu',
            'repondu_par' => $request->user()->id,
            'repondu_le' => now(),
        ]);

        return response()->json([
            'message' => 'Reponse envoyee.',
            'ticket' => $ticket,
        ]);
    }

    public function statsOuverts()
    {
        return response()->json([
            'ouverts' => Ticket::where('statut', 'ouvert')->count(),
        ]);
    }
}