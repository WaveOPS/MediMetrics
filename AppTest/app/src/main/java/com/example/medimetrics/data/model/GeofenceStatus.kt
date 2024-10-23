package com.example.medimetrics.data.model


import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

object GeofenceStatus {
    private val _isInsideGeofence = MutableStateFlow(false)
    val isInsideGeofence = _isInsideGeofence.asStateFlow()

    fun updateStatus(status: Boolean) {
        _isInsideGeofence.value = status
    }
}
