package com.example.medimetrics


import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast
import com.example.medimetrics.data.model.GeofenceStatus
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingEvent

class GeofenceBroadcastReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val event = GeofencingEvent.fromIntent(intent)

        if (event == null) {
            Toast.makeText(context, "Geofence event is null.", Toast.LENGTH_SHORT).show()
            return
        }

        if (event.hasError()) {
            Toast.makeText(context, "Geofence error occurred.", Toast.LENGTH_SHORT).show()
            return
        }

        when (event.geofenceTransition) {
            Geofence.GEOFENCE_TRANSITION_ENTER -> {
                Toast.makeText(context, "Entered the location.", Toast.LENGTH_SHORT).show()
                GeofenceStatus.updateStatus(true)
            }
            Geofence.GEOFENCE_TRANSITION_EXIT -> {
                Toast.makeText(context, "Exited the location.", Toast.LENGTH_SHORT).show()
                GeofenceStatus.updateStatus(false)
            }
        }
    }
}

