package com.example.medimetrics.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.medimetrics.data.model.GeofenceStatus
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

class HomeViewModel : ViewModel() {
    // Observe geofence status
    val isInsideGeofence: StateFlow<Boolean> = GeofenceStatus.isInsideGeofence
        .map { it }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(), false)
}
