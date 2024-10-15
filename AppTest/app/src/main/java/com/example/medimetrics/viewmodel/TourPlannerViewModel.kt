package com.example.medimetrics.viewmodel

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.lifecycle.ViewModel

class TourPlannerViewModel: ViewModel() {
    // State list to hold items added to the tour planner
    private val _items = mutableStateListOf<String>()
    val items: SnapshotStateList<String> get() = _items

    // Function to add a new item to the list
    fun addItem(item: String) {
        _items.add(item)
    }
}