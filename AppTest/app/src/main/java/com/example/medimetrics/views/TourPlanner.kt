package com.example.test

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FabPosition
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.medimetrics.components.TodayCallsCard
import com.example.medimetrics.data.model.Doctor
import com.example.medimetrics.ui.theme.MediMetricsTheme
import com.example.medimetrics.viewmodel.TourPlannerViewModel
import com.example.test.components.BottomNavBar


@Composable
fun TourPlanner(
    navController: NavController,
    viewModel: TourPlannerViewModel,
    empId: Int
) {
    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = { navController.navigate("doctorList") },
                containerColor = Color(0xFFF05454),
                shape = RoundedCornerShape(26.dp),
                modifier = Modifier
                    .padding(top = 16.dp, start = 16.dp, end = 16.dp, bottom = 70.dp)
                    .size(75.dp)
            ) {
                Icon(
                    Icons.Default.Add,
                    contentDescription = "Add Item",
                    tint = Color.White,
                    modifier = Modifier.size(25.dp)
                )
            }
        },
        floatingActionButtonPosition = FabPosition.End, // Align FAB to bottom-right
        bottomBar = { BottomNavBar() } // Place Bottom Navigation
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp)
        ) {
            TodayCallsCard()
            Spacer(modifier = Modifier.height(16.dp))

            // Row to align the capsule button to the right
            Row(
                modifier = Modifier
                    .fillMaxWidth(), // Padding from the right edge
                horizontalArrangement = Arrangement.Start // Align to right
            ) {

                Text(
                    text = "Today's Visits",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .align(Alignment.CenterVertically)
                        .padding(8.dp),
                    textAlign = TextAlign.Start
                )

                Spacer(modifier = Modifier.weight(1f)) // Spacer to push the button to the right

                // Capsule Submit Button
                Button(
                    onClick = {
                        viewModel.submitTourPlan(employeeId = 4)
                    },
                    shape = RoundedCornerShape(50), // Capsule shape
                    colors = ButtonDefaults.buttonColors(Color(0xFF4CAF50)), // Green color
                    modifier = Modifier
                        .height(36.dp) // Small button height
//                        .padding(horizontal = 8.dp)
                ) {
                    Text(
                        text = "Submit",
                        color = Color.White,
                        fontSize = 14.sp // Smaller text
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // LazyColumn to display list of items
            val selectedDoctors by viewModel.selectedDoctors.collectAsState()

            Column(
                modifier = Modifier
                    .fillMaxSize()
            ) {
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(selectedDoctors) { doctor ->
                        DoctorCard(doctor = doctor) {
                            viewModel.removeDoctorFromTour(doctor = doctor)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun DoctorCard(doctor: Doctor, onRemoveClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        elevation = CardDefaults.cardElevation(8.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                Text(text = doctor.dr_name, style = MaterialTheme.typography.titleLarge)
                Text(text = "Specialty: ${doctor.dr_specialization}")
                Text(text = "Area: ${doctor.dr_area}")
            }

            Icon(
                imageVector = Icons.Default.Delete,
                contentDescription = "Remove Doctor",
                tint = Color.Red,
                modifier = Modifier
                    .size(24.dp)
                    .clickable { onRemoveClick() } // Trigger removal on click
            )
        }
    }
}





@Preview(showBackground = true)
@Composable
fun DoctorAppPreview() {
    MediMetricsTheme {
//        TodayCallsCard()
//        BottomNavBar()
        TourPlanner(
            navController = rememberNavController(),
            viewModel = TourPlannerViewModel(),
            empId = 0
            )
    }


}

