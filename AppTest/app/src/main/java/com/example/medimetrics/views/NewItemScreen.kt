package com.example.medimetrics.views

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.medimetrics.data.model.Doctor
import com.example.medimetrics.viewmodel.TourPlannerViewModel

@Composable
fun NewItemScreen(
    navController: NavController,
    viewModel: TourPlannerViewModel
) {
    val doctorList by viewModel.doctorList.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.fetchDoctors()
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(doctorList) { doctor ->
            DoctorItem(doctor) {
                viewModel.addItem("${doctor.dr_name} - ${doctor.dr_area}")
                navController.popBackStack()
            }
        }
    }
}

@Composable
fun DoctorItem(doctor: Doctor, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(8.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = doctor.dr_name, fontWeight = FontWeight.Bold, fontSize = 18.sp)
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = doctor.dr_specialization, fontSize = 14.sp)
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = doctor.dr_area, fontSize = 12.sp)
        }
    }
}

@Preview
@Composable
fun NewItemScreenPreview() {
    NewItemScreen(navController = rememberNavController(),
        viewModel = TourPlannerViewModel())

}
