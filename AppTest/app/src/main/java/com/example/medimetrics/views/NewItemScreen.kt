package com.example.medimetrics.views

import com.example.medimetrics.viewmodel.TourPlannerViewModel
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController

@Composable
fun NewItemScreen(
    navController: NavController,
    viewModel: TourPlannerViewModel
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Button(onClick = {
            viewModel.addItem("New Item")
            navController.popBackStack() // Navigate back to TourPlanner
        }) {
            Text("Select Item")
        }
    }
}

@Preview
@Composable
fun NewItemScreenPreview() {
    NewItemScreen(navController = rememberNavController(),
        viewModel = TourPlannerViewModel())

}
