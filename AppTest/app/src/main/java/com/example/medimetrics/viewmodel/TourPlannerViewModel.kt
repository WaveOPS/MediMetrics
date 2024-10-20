package com.example.medimetrics.viewmodel

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.medimetrics.data.model.Doctor
import com.example.medimetrics.data.network.ApiClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class TourPlannerViewModel : ViewModel() {

    // List of all doctors fetched from API
    private val _doctorList = MutableStateFlow<List<Doctor>>(emptyList())
    val doctorList: StateFlow<List<Doctor>> = _doctorList

    // List of selected doctors for the tour planner
    private val _selectedDoctors = MutableStateFlow<List<Doctor>>(emptyList())
    val selectedDoctors: StateFlow<List<Doctor>> = _selectedDoctors

    // Fetch all doctors from the API
    fun fetchDoctors() {
        viewModelScope.launch {
            try {
                val response = ApiClient.apiService.getDoctors()
                if (response.isSuccessful) {
                    _doctorList.value = response.body() ?: emptyList()
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    // Add a doctor to the selected list for the tour planner
    fun addDoctorToTour(doctor: Doctor) {
        if (!_selectedDoctors.value.contains(doctor)) {
            _selectedDoctors.value = _selectedDoctors.value + doctor
        }
    }

    // Remove a doctor from the selected list (if needed)
    fun removeDoctorFromTour(doctor: Doctor) {
        _selectedDoctors.value = _selectedDoctors.value - doctor
    }
}