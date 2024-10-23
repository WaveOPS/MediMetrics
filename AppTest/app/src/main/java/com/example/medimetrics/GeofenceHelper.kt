package com.example.medimetrics



import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingClient
import com.google.android.gms.location.GeofencingRequest
import com.google.android.gms.location.LocationServices
import com.example.medimetrics.GeofenceBroadcastReceiver

class GeofenceHelper(
    private val context: Context,
    private val geofenceClient: GeofencingClient
) {
    @SuppressLint("MissingPermission")
    fun createGeofence(geoId: String, latitude: Double, longitude: Double, radius: Float) {
        val geofence = Geofence.Builder()
            .setRequestId(geoId)
            .setCircularRegion(latitude, longitude, radius)
            .setExpirationDuration(Geofence.NEVER_EXPIRE)
            .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER or Geofence.GEOFENCE_TRANSITION_EXIT)
            .build()

        val request = GeofencingRequest.Builder()
            .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
            .addGeofence(geofence)
            .build()

        val intent = Intent(context, GeofenceBroadcastReceiver::class.java)
        val pendingIntent = PendingIntent.getBroadcast(
            context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
        )

        geofenceClient.addGeofences(request, pendingIntent)
            .addOnSuccessListener {
                Log.d("Geofence", "Geofence added successfully.")
            }
            .addOnFailureListener { e ->
                Log.e("Geofence", "Failed to add geofence: ${e.message}")
            }
    }
}
