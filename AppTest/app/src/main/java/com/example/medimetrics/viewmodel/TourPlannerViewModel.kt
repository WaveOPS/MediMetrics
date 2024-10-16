package com.example.medimetrics.viewmodel

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.medimetrics.data.model.Doctor
import com.example.medimetrics.data.network.ApiClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class TourPlannerViewModel: ViewModel() {
    // State list to hold items added to the tour planner
//    private val _items = mutableStateListOf<String>()
//    val items: SnapshotStateList<String> get() = _items

    // Function to add a new item to the list
//    fun addItem(item: String) {
//        _items.add(item)
//    }

    private val _doctorList = MutableStateFlow<List<Doctor>>(emptyList())
    val doctorList = _doctorList.asStateFlow()

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

    private val _items = MutableStateFlow<List<String>>(emptyList())
    val items = _items.asStateFlow()

    fun addItem(item: String) {
        _items.value = _items.value + item
    }
}